'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

type LoggedUser = {
  id: string;
  name: string;
  photoUrl: string;
};

export function useLogged() {
  const { data: session } = useSession();
  const [user, setUser] = useState<LoggedUser | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      if (session?.user) {
        const currentUser = session.user;
        const id = currentUser.id;
        const name = currentUser.name ?? 'Nombre no disponible';
        const photoUrl = currentUser.image || '';

        setUser({ id, name, photoUrl });

        const res = await fetch('/api/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, name, photoUrl })
        });

        const { data, error } = await res.json();

        if (data && !error) {
          console.log('🆕 Usuario registrado en la base de datos.');
        }
      }
    };

    checkUser();
  }, [session]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return { user, handleSignOut };
}