import Link from "next/link";

export default async function UserProfile({ params }: any) {
  const { id } = await params;
  return (
    <main className="min-h-screen px-6 py-16 sm:px-16">
      <div className="max-w-xl">
        <h1 className="font-display text-4xl tracking-tight">User profile</h1>
        <p className="mt-2 text-muted">Details for this account.</p>

        <div className="mt-10 border-t border-line pt-6">
          <p className="text-sm text-muted">User ID</p>
          <p className="mt-1 break-all">{id}</p>
        </div>

        <Link href="/profile" className="btn btn-quiet mt-10">
          Back to profile
        </Link>
      </div>
    </main>
  );
}
