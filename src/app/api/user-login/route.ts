import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(`${baseUrl}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: {
        email: body.email,
        password: body.password,
      },
    }),
  });

  const data = await response.json();
  console.log(data);
  if (!data.token) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set('auth-token', data.token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
