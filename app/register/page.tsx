import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthCard title="Create Account">
        <RegisterForm />
      </AuthCard>
    </main>
  );
}