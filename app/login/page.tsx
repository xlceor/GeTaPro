'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks/useLogged'; // Su hook personalizado
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, logout } = useUser();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });
  
      const data = await res.json();
      console.log("dataLogin  --  ",data)

      console.log('Respuesta de API:', data);
  
      if (res.ok) {
        login({
          name: data.user.name ?? 'Usuario',
          username: form.username,
          photoId: data.user.photo_url || 'https://api.dicebear.com/7.x/bottts/png?seed=' + form.username,
          id: data.user.id,
          role:data.user.rol,
          project_id: data.user.proyect_id,
        });
        console.log(data)
      } else {
        setError(data.message || 'Fallo en la autenticación');
        console.error(data.e)
      }
    } catch (err) {
      setError('Error de red o del servidor');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-10 w-full max-w-md text-center transition-all duration-500">
        {!user ? (
          <>
            <h1 className="text-3xl font-bold mb-6">Bienvenido a GeTaPro</h1>
            <p className="text-sm text-gray-500 mb-8">Tu asistente inteligente para proyectos escolares</p>

            <input
              type="text"
              placeholder="Nombre de usuario"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              className="bg-violet-600 hover:bg-violet-700 transition-all text-white font-semibold py-3 px-6 rounded-lg w-full shadow-sm hover:shadow-md"
              onClick={handleLogin}
            >
              Iniciar sesión
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-2">Hola, {user.name}!</h1>
            <Image
              src={user.photoId}
              alt={user.name}
              className="rounded-full mx-auto mb-4 border-4 border-violet-200"
              width={100}
              height={100}
            />
            <p className="mb-6 text-gray-500">Listo para continuar donde lo dejaste</p>
            <button
              className="bg-red-500 hover:bg-red-600 transition-all text-white font-semibold py-3 px-6 rounded-lg w-full shadow-sm hover:shadow-md"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
}