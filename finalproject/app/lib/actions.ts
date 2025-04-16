'use server';

import { signIn } from '@/app/dashboard/users/auth';
import { AuthError } from 'next-auth';
import { Client } from 'pg';
import { hash } from 'bcrypt';

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

    return { success: true, message: 'Inicio de sesión exitoso.' };
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
export async function registerUser (
    prevState: AuthResult | undefined,
    formData: FormData,
  ): Promise<AuthResult> {
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
  
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  
    try {
      await client.connect(); 
  
      const existingUser  = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser .rows.length > 0) {
        return { success: false, message: 'El correo electrónico ya está en uso.' };
      }
  

      const hashedPassword = await hash(password, 10);
  
      await client.query('INSERT INTO users (email, name, password) VALUES ($1, $2, $3)', [email, name, hashedPassword]);
  
      return { success: true, message: 'Registro exitoso. Redirigiendo a la página de inicio de sesión...' };
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      return { success: false, message: 'Error al crear cuenta.' };
    } finally {
      await client.end();
    }
  }
