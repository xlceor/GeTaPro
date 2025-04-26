//app/api/update-seccion/route.ts


import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type RichTextContent = {
    type: string;
    content?: RichTextContent[];
    attrs?: Record<string, JSON>;
    marks?: { type: string }[];
    text?: string;
  };

type Section = {
    name: string;
    text: RichTextContent;
    extraFiles: string[]; // Aquí se pueden agregar archivos específicos por sección
  };

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

export async function POST(req: Request) {
  try {
    const { userId, projectId, chapter, section, text } = await req.json();

    // Obtener los proyectos del usuario
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('projects')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      throw new Error('Usuario no encontrado o error al obtener datos');
    }

    // Buscar el proyecto en cuestión
    const projects = userData.projects;
    const projectIndex = projects.findIndex((p: Project) => p.id === projectId);

    if (projectIndex === -1) {
      throw new Error('Proyecto no encontrado');
    }
    

    // Actualizar el contenido de la sección
    const targetProject = projects[projectIndex];

    console.log("Estructura de capítulos disponibles:", Object.keys(targetProject)); // Esto debería listar las claves de los capítulos

        console.log("chapter:", chapter, "section:", section); // Verifica si los valores son los esperados
        console.log("Capítulo 'chapter1':", targetProject.chapter1);
        console.log("Capítulo 'chapter2':", targetProject.chapter2);

        if (!targetProject[chapter] || !targetProject[chapter][section]) {
            throw new Error(`Capítulo "${chapter}" o sección "${section}" no encontrados`);
          }
          
          targetProject[chapter][section].text = text;

    // Guardar el nuevo arreglo de proyectos actualizado
    const { error: updateError } = await supabase
      .from('users')
      .update({ projects })
      .eq('id', userId);

    if (updateError) throw updateError;

    return NextResponse.json({ message: 'Sección actualizada correctamente' });

  } catch (error) {
    console.error('Error actualizando sección:', error);
    return NextResponse.json({ error: 'Error actualizando sección' }, { status: 500 });
  }
}