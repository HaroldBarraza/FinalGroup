'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  time: string;
  created_at?: string;
}

export default function ProfilePageClient({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    signOut({ callbackUrl: '/dashboard/login' });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/update-profile', {
      method: 'POST',
      body: JSON.stringify({ name, bio }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setMessage(data.message);
    setIsEditing(false);
  };

  return (
    <main className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Perfil</h1>

      {!isEditing ? (
        <div className="space-y-4">
          <p><strong>Nombre:</strong> {name}</p>
          <p><strong>Biografía:</strong> {bio || 'Sin biografía'}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Editar perfil
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block font-medium">Nombre:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Biografía:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={() => {
                setName(user.name);
                setBio(user.bio || '');
                setIsEditing(false);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </div>

          {message && <p className="text-green-600">{message}</p>}
        </form>
      )}

      <div className="pt-4 space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Fecha de creación:</strong> {new Date(user.time).toLocaleDateString()}</p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded mt-6"
      >
        Cerrar sesión
      </button>
    </main>
  );
}
