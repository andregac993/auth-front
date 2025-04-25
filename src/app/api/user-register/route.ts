'use server';

import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const response = await fetch('http://localhost:3080/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log('>>>', json);
  return NextResponse.json(json);
}
