"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginSchema } from "@/lib/validations";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid email or password");
      return;
    }

    alert("Login Successful");
    window.location.href = "/dashboard";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        {...register("email")}
      />

      {errors.email && (
        <p className="text-red-500 text-sm">
          {errors.email.message}
        </p>
      )}

      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      {errors.password && (
        <p className="text-red-500 text-sm">
          {errors.password.message}
        </p>
      )}

      <Button type="submit">
        Login
      </Button>
    </form>
  );
}