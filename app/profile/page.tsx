"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastLogin?: string | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Profile
          </h1>

          <ThemeToggle />
        </div>

        <div className="rounded-xl border p-6 shadow-md dark:border-gray-700">
          <h2 className="mb-4 text-xl font-semibold">
            Account Information
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>User ID:</strong> {user.id}
            </p>

            <p>
              <strong>Joined:</strong>{" "}
              {new Date(
                user.createdAt
              ).toLocaleString()}
            </p>

            <p>
              <strong>Last Login:</strong>{" "}
              {user.lastLogin
                ? new Date(
                    user.lastLogin
                  ).toLocaleString()
                : "Never"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}