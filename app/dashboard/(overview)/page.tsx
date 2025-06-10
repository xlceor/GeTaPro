'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/app/hooks/useLogged'; // Ajuste el path si es necesario
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type RichTextContent = {
  type: string;
  content?: RichTextContent[];
  attrs?: Record<string, JSON>;
  marks?: { type: string }[];
  text?: string;
};

type Section = {
  name: string;
  text: RichTextContent;
  extraFiles: string[];
};

type Project = {
  id: string;
  name: string;
  description: string;
  files: string[];
  created_at: string;
  progress: number;
  chapter1: Record<string, Section>;
  chapter2: Record<string, Section>;
  chapter3: Record<string, Section>;
  chapter4: Record<string, Section>;
};

export default function Page() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/fetchProyects', {
          method: 'POST',
          body: JSON.stringify({ userId: user?.username }),
        });

        const result = await res.json();

        if (res.ok) {
          setProjects(result.projects);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        console.error('¡Houston, tenemos un problema!', message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchProjects();
    }
  }, [user?.username]);

  return (
    <div className="p-6 space-y-8">

            {/* Tarjeta de bienvenida */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center bg-white rounded-t-xl rounded-lg shadow"
      >
        <div className=" w-full h-4 bg-gradient-to-r p-3 rounded-t-xl from-green-400 via-emerald-600 to-cyan-600"></div>
          <div className=" flex items-center gap-6 p-6 bg-white rounded-lg">
          <Image
            src={user?.photoId || '/default-avatar.png'}
            alt="Foto de perfil"
            className="w-20 h-20 rounded-full border shadow"
            width={100}
            height={100}
          />
          <div className=''>
            <h2 className="text-2xl font-extrabold">¡Hola, {user?.name || 'usuario'}!</h2>
            <p className="text-gray-600">Este es tu resumen de proyectos actuales.</p>
          </div>
        </div>
      </motion.section>

      {/* Resumen de proyectos */}
{/* Resumen de proyectos */}
<section>
  {loading ? (
    <div className="text-gray-500 text-lg">Cargando proyectos... </div>
  ) : Array.isArray(projects) && projects.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white border rounded-t-xl rounded-lg shadow hover:shadow-md transition cursor-pointer flex flex-col"
          onClick={() => router.push(`/dashboard/proyectos/${project.id}`)}
        >
          <div className="bg-gradient-to-r rounded-t-xl from-cyan-600 to-violet-500 p-4"></div>
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition cursor-pointer flex flex-col">
            <h3 className="text-xl font-bold mb-2">{project.name}</h3>
            <p className="text-gray-600 flex-grow">{project.description}</p>
            <div className="mt-4 flex justify-end">
              <div className="w-20 h-20 bg-gray-50 rounded shadow-inner p-2">
                <CircularProgressbar
                  value={project.progress}
                  text={`${project.progress}%`}
                  styles={buildStyles({
                    textSize: '30px',
                    pathColor: '#4F46E5',
                    textColor: '#4F46E5',
                    trailColor: '#E5E7EB',
                  })}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center space-y-4 py-20">
      <Image
        src="/waiting-robot.png"
        alt="Esperando asignación"
        width={150}
        height={150}
        className="opacity-60"
      />
      <div className="text-gray-500 text-lg italic text-center">
        En espera de asignación de proyectos.<br />
      </div>
    </div>
  )}
</section>
    </div>
  );
}