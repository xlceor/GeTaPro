import { supabase } from '@/app/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '@/app/lib/types';

export const config = {
  api: {
    bodyParser: false // Necesario para FormData
  }
};

import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import { NextResponse } from 'next/server';
import { IncomingMessage } from 'http';

export async function POST(req: Request) {
  const form = new formidable.IncomingForm();
  const nodeReq = Object.assign({}, req, {
    headers: Object.fromEntries(req.headers),
    method: req.method,
    url: req.url
  }) as unknown as IncomingMessage;

  let fields: Fields, files: Files;
  try {
    [fields, files] = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) return reject(err);
        resolve([fields, files]);
      });
    });
  } catch (err) {
    console.error("Error al parsear el formulario:", err);
    return NextResponse.json({ error: "Fallo al analizar el formulario" }, { status: 500 });
  }

  const file = Array.isArray(files.file) ? files.file[0] : files.file;
  const projectId = Array.isArray(fields.projectId) ? fields.projectId[0] : fields.projectId;
  const sectionPath = Array.isArray(fields.section) ? fields.section[0] : fields.section;

  if (!file || !projectId) return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });

  const fileBuffer = fs.readFileSync(file.filepath);
  const filename = `${uuidv4()}_${file.originalFilename}`;

  const { data, error } = await supabase.storage
    .from('project-files')
    .upload(filename, fileBuffer, {
      contentType: file.mimetype ?? 'application/octet-stream', // Valor por defecto si null
    });
  if(data) console.log('ok')
  if (error) return NextResponse.json({ error: 'Error al subir archivo a Storage' }, { status: 500 });

  const fileUrl = `https://${process.env.NEXT_PUBLIC_SUPABASE_URL!.replace('https://', '')}/storage/v1/object/public/project-files/${filename}`;

  const userId = req.headers.get('user-id') || '';

  const { data: user, error: fetchError } = await supabase
    .from('users')
    .select('projects')
    .eq('id', userId)
    .single();

  if (fetchError || !user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

  const projects = user.projects;
  const projectIndex = projects.findIndex((p: Project) => p.id === projectId);
  if (projectIndex === -1) return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 });

  const fileMeta = {
    filename: file.originalFilename,
    url: fileUrl,
    type: file.mimetype,
    uploaded_at: new Date().toISOString()
  };

  if (sectionPath) {
    // Si se quiere guardar en una sección específica del capítulo
    const pathParts = sectionPath.split('.');
    let current = projects[projectIndex];
    for (const part of pathParts) {
      current = current[part];
    }
    current.extraFiles.push(fileMeta);
  } else {
    // Si es un archivo general del proyecto
    projects[projectIndex].files.push(fileMeta);
  }

  const { error: updateError } = await supabase
    .from('users')
    .update({ projects })
    .eq('id', userId);

  if (updateError) return NextResponse.json({ error: 'No se pudo actualizar el proyecto' }, { status: 500 });

  return NextResponse.json({ success: true, file: fileMeta }, { status: 200 });
}