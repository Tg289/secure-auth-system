"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { registerSchema } from "@/lib/validations";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Registration Failed");
        return;
      }

      alert("Registration Successful");

      reset();

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="text"
        placeholder="Full Name"
        {...register("name")}
      />

      {errors.name && (
        <p className="text-red-500 text-sm">
          {errors.name.message}
        </p>
      )}

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
        Create Account
      </Button>
    </form>
  );
}