'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function LoginPage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex justify-center items-center h-screen">
      {!user ? (
        <button
          className="bg-blue-500 text-white p-4 rounded-lg"
          onClick={() => signIn('google')}
        >
          Iniciar sesión con Google
        </button>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">Bienvenido, {user.name}!</h1>
          {user.image && (
            <Image
              src={user.image}
              alt={user.name || 'Usuario'}
              className="rounded-full mb-4"
              width={100}
              height={100}
            />
          )}
          <button
            className="bg-red-500 text-white p-4 rounded-lg"
            onClick={() => signOut()}
          >
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}