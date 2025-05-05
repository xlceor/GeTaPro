import { NextResponse } from "next/server";
import { getCurrentUser } from '@/app/lib/auth/getCurrentUser';
import {Project} from '@/app/lib/types'
import { supabase } from "@/app/lib/supabaseClient";

console.log(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
// Asegúrese de tener estas variables configuradas

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new Response(JSON.stringify({ error: 'Usuario no autenticado' }), { status: 401 });
    }

    const { projectId } = await req.json();

    console.log("projectId recibido:", projectId);

    if (!projectId) {
      return new Response(JSON.stringify({ error: 'Datos inválidos: projectId requerido' }), { status: 400 });
    }

    // Obtener proyecto actual
        const { data: userData, error } = await supabase
          .from("users")
          .select("projects")
          .eq("id", user.id)
          .single();

        if (error || !userData?.projects) {
          throw new Error("No se encontró el usuario o sus proyectos");
        }

        // Buscar el proyecto dentro del campo JSONB
        const currentProject = userData.projects.find((p:Project) => p.id === projectId);

        if (!currentProject) {
          throw new Error("No se encontró el proyecto dentro del campo 'projects'");
        }

        return NextResponse.json({
          status: "Archivos extraídos correctamente",
          files: currentProject.files,
        });
  } catch (error) {
    console.error('Error al añadir archivos:', error);
    return new Response(JSON.stringify({ error: 'Error al añadir archivos' }), { status: 500 });
  }
}