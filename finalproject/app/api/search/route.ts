import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const ceramic = await sql`
      SELECT id, name, image, 'ceramic' AS category FROM ceramic WHERE name ILIKE ${'%' + query + '%'}
    `;
    const clothing = await sql`
      SELECT id, name, imagen, 'clothing' AS category FROM clothing WHERE name ILIKE ${'%' + query + '%'}
    `;
    const jewelry = await sql`
      SELECT id, name, imagen, 'jewelry' AS category FROM jewelry WHERE name ILIKE ${'%' + query + '%'}
    `;

    const results = [...ceramic, ...clothing, ...jewelry];

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
