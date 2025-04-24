
import chapters from './chapters.json';

export async function GET() {
  try {
    // Enviar directamente el contenido del archivo chapters.json al cliente
    return new Response(JSON.stringify(chapters), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener datos' }), { status: 500 });
  }
}