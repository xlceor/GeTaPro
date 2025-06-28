import { addProjectToUser } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inicializar Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { userId, name, description, role, members } = await req.json();

    // Validaciones iniciales
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Usuario no autenticado' }), { status: 401 });
    }

    if (role === "alumno") {
      return NextResponse.json({ error: 'Rol no autorizado para crear proyectos' }, { status: 400 });
    }

    if (!Array.isArray(members) || members.length < 2) {
      return new Response(JSON.stringify({ error: 'Debe tener al menos 2 miembros' }), { status: 400 });
    }

    if (!name?.trim() || !description?.trim()) {
      return new Response(JSON.stringify({ error: 'Nombre y descripción son requeridos' }), { status: 400 });
    }

    // Verificar si el usuario creador ya tiene proyectos
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('projects_id')
      .eq('id', userId)
      .single();

    if (userError) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Verificar que los miembros no tengan ya proyectos
    for (const memberId of members) {
      const { data: memberData, error: memberError } = await supabase
        .from('users')
        .select('projects_id')
        .eq('id', memberId)
        .single();

      if (memberError || !memberData) {
        return NextResponse.json({ error: `Miembro ${memberId} no encontrado` }, { status: 404 });
      }

      if (Array.isArray(memberData.projects_id) && memberData.projects_id.length > 0) {
        return NextResponse.json({
          error: `El miembro ${memberId} ya pertenece a otro proyecto`
        }, { status: 400 });
      }
    }

    // Crear el proyecto
    const newProject = await addProjectToUser(userId, name, description, members, role);

    if (!newProject?.id) {
      return NextResponse.json({ error: 'No se pudo crear el proyecto' }, { status: 500 });
    }

    // Añadir el proyecto al usuario creador
    await supabase
      .from('users')
      .update({
        projects_id: [...(userData.projects_id || []), newProject.id]
      })
      .eq('id', userId);

    // Añadir el proyecto a cada miembro
    for (const memberId of members) {
      const { data: memberData } = await supabase
        .from('users')
        .select('projects_id')
        .eq('id', memberId)
        .single();

      await supabase
        .from('users')
        .update({
          projects_id: [...(memberData?.projects_id || []), newProject.id]
        })
        .eq('id', memberId);
    }

    return NextResponse.json({ status: 'ok', project: newProject });

  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    return new Response(JSON.stringify({ error: 'Error al crear el proyecto' }), { status: 500 });
  }
}