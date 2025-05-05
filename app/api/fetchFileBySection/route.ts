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
  
      const { projectId, chapter, section } = await req.json();
  
      if (!projectId || !chapter || !section) {
        return new Response(JSON.stringify({ error: 'Datos inválidos: projectId, chapter y section requeridos' }), { status: 400 });
      }
  
      const { data: project, error } = await supabase
        .from("projects")
        .select(`${chapter}.${section}.extraFiles`)
        .eq("id", projectId)
        .eq("user_id", user.id)
        .single();
  
      if (error || !project) {
        throw new Error('Proyecto no encontrado o error al obtener sección');
      }
  
      // ¡Magia! Ahora tenemos los archivos de esa sección.
      const files = project[chapter][section].extraFiles || [];
  
      return NextResponse.json({ files });
    } catch (error) {
      console.error('Error al obtener archivos de la sección:', error);
      return new Response(JSON.stringify({ error: 'Error interno al obtener archivos' }), { status: 500 });
    }
  }