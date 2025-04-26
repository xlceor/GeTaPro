'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { useLogged } from '@/app/hooks/useLogged';
import Card from '@/app/ui/components/card';
import { JSONContent } from '@tiptap/react';

type Section = {
  name: string;
  text: JSONContent;
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

interface ChapterData {
  [chapterKey: string]: {
    [sectionKey: string]: {
      name: string;
      text: string;
    };
  };
}

export default function Page() {
  const router = useRouter();
  const { user } = useLogged();
  const params = useParams();
  const projectId = params?.id;
  const [project, setProject] = useState<Project | null>(null);
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [capitulo, setCapitulo] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const titles = {
    chapter1: {
      title: 'Capítulo 1: El Problema',
      description: 'Aquí se define la pregunta de investigación que impulsa todo el proyecto.',
    },
    chapter2: {
      title: 'Capítulo 2: Fundamentación Teórica',
      description: 'Aquí se recoge el conocimiento previo relevante al tema.',
    },
    chapter3: {
      title: 'Capítulo 3: Metodología',
      description: 'Aquí se explica el camino a seguir para investigar con sentido.',
    },
    chapter4: {
      title: 'Capítulo 4: Resultados',
      description: 'Aquí se interpretan los datos obtenidos para darles significado.',
    },
  };

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch('/api/fetchProyectById', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, projectId }),
      });
      const { project, error } = await res.json();
      if (error) {
        console.error(error);
      } else {
        setProject(project);
      }
    };

    const fetchChapters = async () => {
      const res = await fetch('/api/chapters');
      const data = await res.json();
      setChapterData(data.chapters);
    };

    if (user?.id && projectId) {
      fetchProject();
      fetchChapters();
    }
  }, [user?.id, projectId]);

  const handleDeleteProyect = async () => {
    try {
      const res = await fetch('/api/remove-project', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project?.id }),
      });
      const { projects } = await res.json();
      if (!projects) throw new Error('No se devolvieron proyectos.');
      router.push(`/dashboard/proyectos`);
      toast.success('Proyecto eliminado correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar el proyecto');
    }
  };

  const renderizarCapitulo = () => {
    if (!chapterData || !user) return <p>Cargando...</p>;

    const currentKey = Object.keys(chapterData)[capitulo - 1];
    const sections = chapterData[currentKey];
    const info = titles[currentKey as keyof typeof titles];
    const userChapter = project?.[currentKey as keyof Project];

    return (
      <motion.div
        key={capitulo}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">{info.title}</h2>
          <p className="text-gray-600">{info.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(sections).map(([key, sec]) => (
            <Card
              key={key}
              userId={user.id}
              projectId={project?.id ?? 'default'}
              chapterKey={currentKey}
              chapter={{ [key]: sec }}
              prevContent={{
                type: 'text',
                text:
                  (userChapter as Record<string, Section>)?.[key]?.text ?? {
                    type: 'doc',
                    content: [],
                  },
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  };

  const MyProgress = ({ percentage }: { percentage: number }) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    useEffect(() => {
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 300, 1);
        setAnimatedValue(Math.round(progress * percentage));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [percentage]);

    return (
      <CircularProgressbar
        value={animatedValue}
        text={`${animatedValue}%`}
        styles={{
          path: { stroke: '#3b82f6' },
          trail: { stroke: '#d1d5db' },
          text: { fill: '#1f2937', fontSize: '16px' },
        }}
      />
    );
  };

  return (
    <div className="flex flex-col w-full h-full space-y-6 p-4">
      {/* Cabecera */}
        {/* Cabecera minimalista con línea superior */}
        <div className="relative bg-white rounded-xl shadow-lg p-6 pt-8">
          {/* Línea superior con gradiente */}
          <div className="absolute top-0 left-0 w-full h-2 p-4 rounded-t-xl bg-gradient-to-r from-indigo-600 to-blue-500" />
           
           {/* Botón de opciones (⋯) */}
          <button
            onClick={() => setShowModal(!showModal)}
            className="absolute top-0 right-2 text-white hover:text-gray-700 text-2xl"
            title="Opciones del proyecto"
          >
            ⋯
          </button>

          <div className="grid grid-cols-3 gap-6 p-3 items-start min-h-[12rem]">
            {/* Información del proyecto */}
            <div className="col-span-2 p-5 space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">{project?.name ?? 'Cargando proyecto...'}</h1>
              <p className="text-md text-gray-600">{project?.description}</p>
              <p className="text-sm text-gray-400">
                {project?.created_at ? new Date(project.created_at).toLocaleDateString() : 'Fecha desconocida'}
              </p>
            </div>

            {/* Archivos */}
            <div className="bg-gray-50 border rounded-xl p-4 shadow-inner flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FaSearch className="text-blue-500" />
                <input
                  placeholder="Buscar archivo..."
                  className="w-full rounded px-2 py-1 border text-sm text-gray-700"
                />
              </div>
              <ul className="list-disc pl-5 text-sm text-gray-700 overflow-y-auto max-h-32">
                {project?.files.map((file, i) => (
                  <li key={i}>{file}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      {/* Sección de navegación */}
      <div className="grid grid-cols-3 gap-4 h-1/2">
        <motion.div whileHover={{ scale: 1.03 }} className="p-4 bg-white rounded-xl shadow text-center space-y-2">
          <MyProgress percentage={project?.progress ?? 0} />
          <p className="font-semibold">Progreso</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} className="p-4 bg-white rounded-xl shadow text-center">
          <p>Chat</p>
          <Link href="/dashboard/chat" className="text-blue-500 underline">
            Ver más →
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} className="p-4 bg-white rounded-xl shadow text-center">
          <p>Kanban</p>
          <Link href="/dashboard/kanban" className="text-blue-500 underline">
            Ver más →
          </Link>
        </motion.div>
      </div>

      {/* Capítulos */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative flex w-3/4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="absolute h-full w-1/4 bg-white rounded-full transition-transform"
            style={{ transform: `translateX(${(capitulo - 1) * 100}%)` }}
          />
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => setCapitulo(n)}
              className={clsx('z-10 w-1/4 py-2 font-medium', {
                'text-indigo-600 font-bold': capitulo === n,
              })}
            >
              Capítulo {n}
            </button>
          ))}
        </div>
        <div className="w-full min-h-[100dvh]">
          <AnimatePresence mode="wait">{renderizarCapitulo()}</AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute w-40 h-10 right-16 top-26 bg-white border-2 rounded z-50">
          <button className="p-2 hover:bg-gray-300" onClick={() => setDeleteModal(!deleteModal)}>
            Eliminar proyecto
          </button>
        </div>
      )}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setDeleteModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-red-600">¿Eliminar este proyecto?</h2>
            <p className="mb-6 text-gray-600">
              Esta acción no se puede deshacer. Se eliminarán todos los datos asociados al proyecto. ¿Desea continuar, Señor?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteProyect}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Eliminar Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}