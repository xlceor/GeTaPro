'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function LoginPage() {
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (user) {
      fetch('/api/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      }).then(() => {
        window.location.href = '/dashboard';
      });
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-10 w-full max-w-md text-center transition-all duration-500">
        {!user ? (
          <>
            <h1 className="text-3xl font-bold mb-6">Bienvenido a Conia</h1>
            <p className="text-sm text-gray-500 mb-8">Tu asistente inteligente para proyectos escolares</p>
            <button
              className="bg-violet-600 hover:bg-violet-700 transition-all text-white font-semibold py-3 px-6 rounded-lg w-full shadow-sm hover:shadow-md"
              onClick={() => signIn('google')}
            >
              Iniciar sesión con Google
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-2">Hola, {user.name}!</h1>
            {user.image && (
              <Image
                src={user.image}
                alt={user.name || 'Usuario'}
                className="rounded-full mx-auto mb-4 border-4 border-violet-200"
                width={100}
                height={100}
              />
            )}
            <p className="mb-6 text-gray-500">Listo para continuar donde lo dejaste</p>
            <button
              className="bg-red-500 hover:bg-red-600 transition-all text-white font-semibold py-3 px-6 rounded-lg w-full shadow-sm hover:shadow-md"
              onClick={() => signOut()}
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}