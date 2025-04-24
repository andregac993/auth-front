import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Bem-vindo à Auth App</h1>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Criar conta
        </Link>
      </div>
    </main>
  );
}
