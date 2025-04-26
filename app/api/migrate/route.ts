import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 🧠 Tipos refinados
type RichTextContent = {
  type: string;
  content?: RichTextContent[];
  attrs?: Record<string, JSON>;
  marks?: { type: string }[];
  text?: string;
};

type Section = {
  name: string;
  text: RichTextContent | string; // Para aceptar texto plano antes de migrar
  extraFiles?: string[]; // Puede ser undefined en proyectos antiguos
};

type Chapter = Record<string, Section>;

type Project = {
  id: string;
  name: string;
  description: string;
  files: string[];
  created_at: string;
  progress: number;
  chapter1: Chapter;
  chapter2: Chapter;
  chapter3: Chapter;
  chapter4: Chapter;
};

// 🧪 Migración segura
function migrateProjects(projects: Project[]): Project[] {
  return projects.map((project) => {
    const migrateChapter = (chapter: Chapter): Chapter => {
      const migrated: Chapter = {};
      for (const key in chapter) {
        const section = chapter[key];
        migrated[key] = {
          name: section.name,
          text: typeof section.text === 'string'
            ? {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: section.text }]
                  }
                ]
              }
            : section.text,
          extraFiles: section.extraFiles || []
        };
      }
      return migrated;
    };

    return {
      ...project,
      chapter1: migrateChapter(project.chapter1),
      chapter2: migrateChapter(project.chapter2),
      chapter3: migrateChapter(project.chapter3),
      chapter4: migrateChapter(project.chapter4)
    };
  });
}

// 🛰️ Ruta POST para migrar
export async function POST(req: Request) {
  const { userId } = await req.json();

  const { data: userData } = await supabase
    .from('users')
    .select('projects')
    .eq('id', userId)
    .single();

  if (!userData?.projects) {
    return new Response(JSON.stringify({ error: 'Proyectos no encontrados' }), { status: 404 });
  }

  const migratedProjects = migrateProjects(userData.projects);

  await supabase
    .from('users')
    .update({ projects: migratedProjects })
    .eq('id', userId);

  return new Response(JSON.stringify({ message: 'Proyectos migrados correctamente' }), { status: 200 });
}