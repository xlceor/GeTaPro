//app/api/update-seccion/route.ts


import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export async function POST(req: Request) {
  const { userId, projectId, chapter, section, text } = await req.json();
  
  
  const { data: userData, error: userError } = await supabase
  .from('users')
  .select('projects_id')
  .eq('id', userId)
  .single();

if (userError || !userData) {
  throw new Error('Usuario no encontrado o error al obtener datos');
}

  // Obtener el proyecto directamente
  const { data: targetProject, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();
  
  if (projectError || !targetProject) {
    throw new Error('Proyecto no encontrado');
  }
  
  // Validar existencia del capítulo y sección
  if (!targetProject[chapter] || !targetProject[chapter][section]) {
    throw new Error(`Capítulo "${chapter}" o sección "${section}" no encontrados`);
  }
  
  // Asignar nuevo texto
  targetProject[chapter][section].text = text;
  
  // Guardar capítulo actualizado
  const { error: updateError } = await supabase
    .from('projects')
    .update({ [chapter]: targetProject[chapter] })
    .eq('id', projectId);
  
  if (updateError) throw updateError;
  
  return NextResponse.json({ message: 'Sección actualizada correctamente' });
}