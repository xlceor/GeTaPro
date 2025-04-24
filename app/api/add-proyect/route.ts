import { addProjectToUser, createMockProject } from '@/app/lib/db';
import { NextResponse } from "next/server";
import { getCurrentUser } from '@/app/lib/auth/getCurrentUser';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new Response(JSON.stringify({ error: 'Usuario no autenticado' }), { status: 401 });
    }

    const newProject = createMockProject();
    await addProjectToUser(user.id, newProject);

    return NextResponse.json("ok");
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener datos' }), { status: 500 });
  }
}