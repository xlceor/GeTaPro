import { NextApiRequest, NextApiResponse } from 'next';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Crear un cliente de Supabase para servidor
  const supabase = createPagesServerClient({ req, res });

  // Obtener la sesión de NextAuth
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Si no hay sesión activa, retornar un error
  if (!session) {
    return res.status(401).json({ error: 'No se encontró una sesión activa' });
  }

  // Si la sesión es válida, enviar el JWT a través de la respuesta
  return res.status(200).json({ token: session.access_token });
}