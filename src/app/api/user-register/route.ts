'use server';
import { NextResponse, NextRequest } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

export async function POST(req: NextRequest) {
  const data = await req.json();

  const response = await fetch(`${baseUrl}api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return NextResponse.json(json);
}
