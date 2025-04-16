'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { registerUser  } from '@/app/lib/actions';
import { startTransition } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/dashboard/users/register.css'

interface ActionState {
  success: boolean;
  message: string;
}

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [actionState, formAction] = useActionState<ActionState | undefined, FormData>(registerUser , undefined);
  const router = useRouter();

  const errorMessage = actionState?.success === false ? actionState.message : undefined;
  const successMessage = actionState?.success === true ? actionState.message : undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      formAction(formData);  
    });
  };

  if (actionState?.success) {
    router.push('/dashboard/login');
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      <button type="submit">Register</button>

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </form>
  );
}
