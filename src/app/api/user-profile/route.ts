import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export async function GET() {
  const token = (await cookies()).get('auth-token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const response = await fetch(`${baseUrl}api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.status);
  if (response.status === 401) {
    const res = NextResponse.json({ error: 'Token expirado' }, { status: 401 });
    res.cookies.delete('auth-token');
  }

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
