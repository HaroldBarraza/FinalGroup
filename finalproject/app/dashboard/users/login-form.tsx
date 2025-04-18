'use client';

import { useActionState, useEffect } from 'react';
import { authenticate } from '@/app/lib/actions';
import { startTransition } from 'react';
import '@/app/dashboard/users/loginform.css'

interface ActionState {
  success: boolean;
  message: string;
}

export default function LoginForm() {
  const [actionState, formAction] = useActionState<ActionState | undefined, FormData>(authenticate, undefined);
  
  const errorMessage = actionState?.success === false ? actionState.message : undefined;
  const successMessage = actionState?.success === true ? actionState.message : undefined;
  useEffect(() => {
    if (actionState?.success && actionState.message) {
      window.location.href = actionState.message;
    }
  }, [actionState]);

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
      
      <button type="submit">Login</button>
      
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </form>
  );
}
