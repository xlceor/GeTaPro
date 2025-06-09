// app/api/create-user/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { name, email, username, rol, photo_url } = await req.json();

  // Check if the user already exists by email or username
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .or(`email.eq.${email},username.eq.${username}`)
    .single();

  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 200 });
  }

  const { error } = await supabase.from('users').insert([
    {
      name,
      email,
      username,
      rol,
      photo_url,
      proyect_id: null,
    }
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}