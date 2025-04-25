import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Tipado para el proyecto individual
type Section = { name: string; text: string };
console.log("En la base de datooooos")

interface Project {
    id: string;
    name: string;
    description: string;
    files: string[];
    created_at: string;
    progress: number;
    chapter1: Record<string, Section>;
    chapter2: Record<string, Section>;
    chapter3: Record<string, Section>;
    chapter4: Record<string, Section>;
  }

// Tipado para el usuario con proyectos
interface UserData {
  projects: Project[];
}

// Inicializar Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { userId, projectId }: { userId: string; projectId: string } = await req.json();
    console.log("Datos recibidos: " + userId + ", " +  projectId)

    if (!userId || !projectId) {
      return NextResponse.json({ error: 'Missing userId or projectId' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('users')
      .select('projects')
      .eq('id', userId)
      .single<UserData>();

    if (error || !data) {
      return NextResponse.json(
        { error: `Error fetching user: ${error?.message || 'No data returned'}` },
        { status: 500 }
      );
    }

    const project = data.projects.find((p: Project) => p.id === projectId);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}