interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-black px-4 py-3 text-white transition hover:opacity-90"
    >
      {children}
    </button>
  );
}