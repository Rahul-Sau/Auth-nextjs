import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center px-6 sm:px-16">
      <div className="max-w-xl">
        <h1 className="font-display text-5xl tracking-tight">
          You're signed in.
        </h1>
        <p className="mt-4 text-muted">
          Your account is verified and your session is active.
        </p>
        <Link href="/profile" className="btn btn-primary mt-8">
          Open profile
        </Link>
      </div>
    </main>
  );
}
