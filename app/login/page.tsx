// app/login/page.tsx
'use client';


import { useLogged } from '@/app/hooks/useLogged';
import { Session } from 'next-auth';
import Image from 'next/image';

import { signIn } from 'next-auth/react'


export default function LoginPage({ session }: { session: Session | null }) {
  const { user, handleSignOut } = useLogged(session);
  return (
    <div className="flex justify-center items-center h-screen">
{!user ? (
        <button
          className="bg-blue-500 text-white p-4 rounded-lg"
          onClick={() => signIn('google')} // Botón de inicio de sesión
        >
          Iniciar sesión con Google
        </button>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">Bienvenido, {user.name}!</h1>
          <Image
          src={user.photoUrl} 
          alt={user.name} 
          className="rounded-full mb-4" 
          width={100} 
          height={100} />
          <button
            className="bg-red-500 text-white p-4 rounded-lg"
            onClick={handleSignOut} // Botón de cerrar sesión
          >
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}