'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';

type LoggedUser = {
  id: string;
  name: string;
  photoUrl: string;
};

export function useLogged(initialSession: Session | null) {
  const [user, setUser] = useState<LoggedUser | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      if (initialSession?.user) {
        const currentUser = initialSession.user;
        const id = currentUser.id;
        const name = currentUser.name ?? 'Nombre no disponible';
        const photoUrl = currentUser.image || '';

        setUser({ id, name, photoUrl });

        const { data, error } = await fetch('/api/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, name, photoUrl })
        }).then((res) => res.json());

        if (data && !error) {
          console.log('🆕 Usuario registrado en la base de datos.');
        }
      }
    };

    checkUser();
  }, [initialSession]);

  const handleSignOut = async () => {
    const { signOut } = await import('next-auth/react');
    await signOut({ callbackUrl: '/' });
  };

  return { user, handleSignOut };
}