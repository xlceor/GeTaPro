// app/api/add-proyect/route.ts

import { createProject } from '@/app/lib/db';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/lib/auth/getCurrentUser';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return new Response(JSON.stringify({ error: 'Usuario no autenticado' }), { status: 401 });
    }

    const { name, description } = await req.json();

    if (!name?.trim() || !description?.trim()) {
      return new Response(JSON.stringify({ error: 'Nombre y descripción son requeridos' }), { status: 400 });
    }

    // Usamos la función `createProject` para crear el proyecto
    const newProject = await createProject(user.id, name, description);
    console.log(newProject)

    return NextResponse.json({ status: 'ok', project: newProject });
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    return new Response(JSON.stringify({ error: 'Error al crear el proyecto' }), { status: 500 });
  }
}