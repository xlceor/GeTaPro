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
    const { userId }: { userId: string } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // Obtener la lista de IDs de proyectos del usuario
    const { data, error } = await supabase
      .from('users')
      .select('projects_id')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: `Error fetching user: ${error?.message || 'No data returned'}` },
        { status: 500 }
      );
    }

    const projectIds = data.projects_id;

    if (!projectIds || projectIds.length === 0) {
      return NextResponse.json({ message: 'No projects assigned to user' }, { status: 200 });
    }

    // Buscar todos los proyectos cuyos ID estén en la lista
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .in('id', projectIds);

    if (projectsError) {
      return NextResponse.json({ error: projectsError.message }, { status: 500 });
    }

    if (!projects || projects.length === 0) {
      return NextResponse.json({ message: 'No projects found' }, { status: 200 });
    }

    return NextResponse.json({ projects });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}