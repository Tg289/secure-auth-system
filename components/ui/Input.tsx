interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border p-3 outline-none focus:ring-2"
    />
  );
}