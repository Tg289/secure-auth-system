import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <AuthCard title="Welcome Back">
        <LoginForm />
      </AuthCard>
    </main>
  );
}