import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          throw new Error(
            "Missing email or password"
          );
        }

        const user =
          await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid =
          await bcrypt.compare(
            credentials.password,
            user.password
          );

        if (!isValid) {
          throw new Error(
            "Invalid password"
          );
        }

        // UPDATE LAST LOGIN
        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            lastLogin: new Date(),
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({
      token,
      user,
    }) {
      if (user) {
        (token as any).id =
          (user as any).id;
      }

      return token;
    },

    async session({
      session,
      token,
    }) {
      if (session.user) {
        (session.user as any).id =
          (token as any).id;
      }

      return session;
    },
  },

  secret:
    process.env.NEXTAUTH_SECRET,
};