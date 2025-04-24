import { connectToDb } from '@/app/lib/db';

export async function GET() {
  const client = await connectToDb();

  const result = await client.query(`

  `);

  return Response.json({ message: 'Base de datos lista, Señor', result });
}