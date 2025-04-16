import { auth } from '@/app/dashboard/users/auth';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ message: 'No autorizado.' }), { status: 401 });
  }

  const { name, bio } = await req.json();

  try {
    await sql`
      UPDATE users
      SET name = ${name}, bio = ${bio}
      WHERE email = ${session.user.email}
    `;
    return new Response(JSON.stringify({ message: 'Perfil actualizado correctamente.' }));
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    return new Response(JSON.stringify({ message: 'Error al actualizar.' }), { status: 500 });
  }
}
