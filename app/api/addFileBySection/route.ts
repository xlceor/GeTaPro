import { NextResponse } from "next/server";
import { getCurrentUser } from '@/app/lib/auth/getCurrentUser';
import { createClient } from '@supabase/supabase-js';

// Asegúrese de tener estas variables configuradas
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new Response(JSON.stringify({ error: 'Usuario no autenticado' }), { status: 401 });
    }

    const { projectId, chapter, section, fileUrls } = await req.json();

    if (!projectId || !chapter || !section || !fileUrls || !Array.isArray(fileUrls)) {
      return new Response(JSON.stringify({ error: 'Datos inválidos: projectId y fileUrls requeridos' }), { status: 400 });
    }

    // Obtener proyecto actual
    const { data: currentProject, error } = await supabase
    .from("projects")
    .select(`${chapter}.${section}.extraFiles`)
    .eq("id", projectId)
    .eq("user_id", user.id)
    .single();

  if (error || !currentProject) {
    throw new Error('Proyecto no encontrado o error al obtener sección');
  }

    const updatedFiles = [...(currentProject[chapter][section].extraFiles || []), ...fileUrls];

    // Actualizar archivos
    const fieldPath = `${chapter}.${section}.extraFiles`;

    const { error: updateError } = await supabase
      .from("projects")
      .update({ [fieldPath]: updatedFiles })
      .eq("id", projectId)
      .eq("user_id", user.id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return NextResponse.json({ status: "Archivos añadidos correctamente", files: updatedFiles });
  } catch (error) {
    console.error('Error al añadir archivos:', error);
    return new Response(JSON.stringify({ error: 'Error al añadir archivos' }), { status: 500 });
  }
}