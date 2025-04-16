import { auth } from '@/app/dashboard/users/auth';
import postgres from 'postgres';
import ProfilePageClient from '@/app/dashboard/profile/clientpage';

// ✅ Importamos el tipo de usuario
export interface User {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  time: string;
  created_at?: string;
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    return <p>No estás autenticado.</p>;
  }

  const user = await sql<User[]>`
    SELECT id, name, email, bio, time
    FROM users
    WHERE email = ${session.user.email}
  `;

  return <ProfilePageClient user={user[0]} />;
}
