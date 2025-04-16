'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { startTransition } from 'react';

interface ActionState {
  success: boolean;
  message: string;
}

export default function LoginForm() {
  const [actionState, formAction] = useActionState<ActionState | undefined, FormData>(authenticate, undefined);
  
  const errorMessage = actionState?.success === false ? actionState.message : undefined;
  const successMessage = actionState?.success === true ? actionState.message : undefined;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          name="email"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          minLength={6}
        />
      </div>
      
      <button type="submit">Iniciar sesión</button>
      
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </form>
  );
}
