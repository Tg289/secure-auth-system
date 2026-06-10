export default function ProfileCard() {
  return (
    <div className="rounded-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">
        Profile
      </h2>

      <div className="space-y-2">
        <p>Name: Demo User</p>
        <p>Email: demo@example.com</p>
      </div>
    </div>
  );
}