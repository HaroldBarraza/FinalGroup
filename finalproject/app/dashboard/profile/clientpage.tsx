'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import '@//app/dashboard/profile/profile.css'

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
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="perfil-title">Profile</h1>

          {!isEditing ? (
            <div className="perfil-gap">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Bio:</strong> {bio || 'No bio available'}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="perfil-button blue"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="perfil-gap">
              <div className="perfil-group">
                <label className="perfil-label">Name:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="perfil-input"
                />
              </div>
          
              <div className="perfil-group">
                <label className="perfil-label">Bio:</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="perfil-textarea"
                />
              </div>
          
              <div className="flex gap-4">
                <button type="submit" className="perfil-button green">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setName(user.name);
                    setBio(user.bio || '');
                    setIsEditing(false);
                  }}
                  className="perfil-button gray"
                >
                  Cancel
                </button>
              </div>
                
              {message && <p className="perfil-message-success">{message}</p>}
            </form>
          )}
          
          <div className="pt-4 perfil-gap">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Created At:</strong> {new Date(user.time).toLocaleDateString()}</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="perfil-button red mt-6"
          >
            Log Out
          </button>

    </div>
  );
}
