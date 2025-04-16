'use server';

import { signOut } from '@/app/dashboard/users/auth';

export async function logout() {
  await signOut({ redirectTo: '/' });
}