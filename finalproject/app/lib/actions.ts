'use server';

import { signIn } from '@/app/dashboard/users/auth';
import { AuthError } from 'next-auth';
import postgres from 'postgres';
import { hash } from 'bcryptjs';

interface AuthResult {
  success: boolean;
  message: string;
}

export async function authenticate(
  prevState: AuthResult | undefined,
  formData: FormData,
): Promise<AuthResult> {
  try {
    const result = await signIn('credentials', {
      redirect: false,
      ...Object.fromEntries(formData),
    });

    if (result?.error) {
      return { success: false, message: result.error };
    }

    return { success: true, message: '/dashboard/profile' };;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: 'Credenciales inválidas.' };
        default:
          return { success: false, message: 'Algo salió mal.' };
      }
    }
    throw error;
  }
}

export async function registerUser(
  prevState: AuthResult | undefined,
  formData: FormData,
): Promise<AuthResult> {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;

  // Configuración de la conexión PostgreSQL
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    // Verificar si el usuario ya existe
    const existingUsers = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUsers.length > 0) {
      return { success: false, message: 'El correo electrónico ya está en uso.' };
    }

    // Hashear la contraseña
    const hashedPassword = await hash(password, 10);

    // Crear nuevo usuario
    await sql`
      INSERT INTO users (email, name, password) 
      VALUES (${email}, ${name}, ${hashedPassword})
    `;

    return { 
      success: true, 
      message: 'Registro exitoso. Redirigiendo a la página de inicio de sesión...' 
    };
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return { success: false, message: 'Error al crear cuenta.' };
  } finally {
    // Cerrar la conexión
    await sql.end();
  }
}