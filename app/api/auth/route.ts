// app/api/auth/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  console.log("🔐 Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("🔐 Supabase KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single(); // solo queremos uno


  if (error) {
    return NextResponse.json({ message: 'Error al consultar Supabase', e: error.message }, { status: 500 });
  }
  console.log("dataAuth  --", data);
  if (data && password === 'admin') {
    return NextResponse.json({ message: 'Login exitoso', user: data }, { status: 200 });
  }

  return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
}