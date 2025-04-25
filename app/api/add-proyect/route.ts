//app/api/add-proyect/route.ts

import { addProjectToUser } from '@/app/lib/db';
import { NextResponse } from "next/server";
import { getCurrentUser } from '@/app/lib/auth/getCurrentUser';
import { v4 as uuidv4 } from 'uuid';

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

    const newProject = {
      id: uuidv4(),
      name,
      description,
      files: [],
      created_at: new Date().toISOString(),
      chapter1: {},
      chapter2: {},
      chapter3: {},
      chapter4: {},
      progress: 0 // 🧩 Esta es la pieza perdida del rompecabezas
    };

    await addProjectToUser(user.id, newProject);

    return NextResponse.json({ status: 'ok', project: newProject });
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    return new Response(JSON.stringify({ error: 'Error al crear el proyecto' }), { status: 500 });
  }
}