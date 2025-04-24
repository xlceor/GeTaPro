// app/api/create-user/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! 
);

export async function POST(req: Request) {
  const { id, name, photoUrl } = await req.json();

  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('id', id)
    .single();

  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 200 });
  }

  const { error } = await supabase.from('users').insert({
    id,
    name,
    photoUrl,
    projects: [] // Puede adaptar esto a su modelo de datos
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}