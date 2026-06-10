interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  children,
}: AuthCardProps) {
  return (
    <div
      className="
        w-full
        max-w-md
        rounded-2xl
        border
        bg-white
        p-8
        shadow-lg
        dark:bg-gray-900
        dark:border-gray-700
        dark:text-white
      "
    >
      <h1 className="mb-6 text-center text-3xl font-bold">
        {title}
      </h1>

      {children}
    </div>
  );
}