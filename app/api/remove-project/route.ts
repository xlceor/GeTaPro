import { removeProjectFromUser } from '@/app/lib/db';
import { NextResponse } from 'next/server';


export async function DELETE(req: Request) {
  try {

    const { projectId, userId } = await req.json();

    if (!projectId) {
      return new Response(JSON.stringify({ error: 'ID del proyecto requerido' }), { status: 400 });
    }

    const updatedProjects = await removeProjectFromUser(userId, projectId);

    return NextResponse.json({ status: 'ok', projects: updatedProjects });
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar el proyecto' }), { status: 500 });
  }
}