import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('❌ Error fetching users:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  if (!data || data.length === 0) {
    console.warn('⚠️ Tabla users vacía o sin permisos para leer');
    return new Response(JSON.stringify({ message: 'No hay usuarios disponibles o acceso denegado' }), { status: 204 });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}