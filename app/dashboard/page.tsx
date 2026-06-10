import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import LogoutButton from "@/components/auth/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div>Unauthorized</div>;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black dark:text-white p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <ThemeToggle />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              User Profile
            </h2>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">
                  Name:
                </span>{" "}
                {user?.name}
              </p>

              <p>
                <span className="font-semibold">
                  Email:
                </span>{" "}
                {user?.email}
              </p>

              <p>
                <span className="font-semibold">
                  User ID:
                </span>{" "}
                {user?.id}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border bg-white dark:bg-zinc-900 dark:border-zinc-700 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Account Details
            </h2>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">
                  Joined:
                </span>{" "}
                {user?.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleString()
                  : "-"}
              </p>

              <p>
                <span className="font-semibold">
                  Last Login:
                </span>{" "}
                {user?.lastLogin
                  ? new Date(
                      user.lastLogin
                    ).toLocaleString()
                  : "Never"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}