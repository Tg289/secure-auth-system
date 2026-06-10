import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ratelimit } from "@/lib/rate-limit";
import { generateResetToken } from "@/lib/reset-token";
import { sendResetEmail } from "@/lib/email";

export async function POST(
  req: Request
) {
  const ip =
    req.headers.get(
      "x-forwarded-for"
    ) || "unknown";

  const { email } =
    await req.json();

  const { success } =
    await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        error:
          "Too many requests. Try later.",
      },
      {
        status: 429,
      }
    );
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (!user) {
    return NextResponse.json({
      message:
        "If email exists, reset sent",
    });
  }

  const { token, hash } =
    generateResetToken();

  const expiry = new Date(
    Date.now() + 15 * 60 * 1000
  );

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      resetTokenHash: hash,
      resetTokenExpiry: expiry,
    },
  });

  const resetLink =
    `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}&email=${email}`;

  await sendResetEmail(
    email,
    resetLink
  );

  return NextResponse.json({
    message:
      "If email exists, reset sent",
  });
}