import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Tipado para el proyecto individual
// Tipado para el usuario con proyectos

// Inicializar Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId, role }: { userId: string; role: string } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId or projectId' }, { status: 400 });
    }

    if (role != "asesor"){
        return NextResponse.json({ error: 'No tiene permisos para acceder a este proyecto' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error || !data) {
      return NextResponse.json(
        { error: `Error fetching user: ${error?.message || 'No data returned'}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ users: data }, { status: 200 });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}