import { connectToDb } from '@/app/lib/db';

export async function GET() {
  try {
    const client = await connectToDb();
    const data = await client.query(`
SELECT * FROM invoices
        `)

    // Enviar directamente el contenido del archivo chapters.json al cliente
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener datos' }), { status: 500 });
  }
}