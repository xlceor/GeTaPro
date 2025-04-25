import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Tipado para el proyecto individual
type Section = { name: string; text: string };

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
    const { userId }: { userId: string;} = await req.json();

    if (!userId) {
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

    if (!data.projects || data.projects.length === 0) {
        return NextResponse.json({ error: 'No projects found' }, { status: 404 });
      }
      
      return NextResponse.json({ projects: data.projects });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}