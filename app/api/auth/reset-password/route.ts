import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(
  req: Request
) {
  const {
    email,
    token,
    newPassword,
  } = await req.json();

  const user =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (
    !user ||
    !user.resetTokenHash ||
    !user.resetTokenExpiry
  ) {
    return NextResponse.json(
      {
        error: "Invalid request",
      },
      {
        status: 400,
      }
    );
  }

  if (
    user.resetTokenExpiry <
    new Date()
  ) {
    return NextResponse.json(
      {
        error: "Token expired",
      },
      {
        status: 400,
      }
    );
  }

  const hash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  if (
    hash !== user.resetTokenHash
  ) {
    return NextResponse.json(
      {
        error: "Invalid token",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      12
    );

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password:
        hashedPassword,
      resetTokenHash: null,
      resetTokenExpiry: null,
    },
  });

  return NextResponse.json({
    message:
      "Password reset successful",
  });
}