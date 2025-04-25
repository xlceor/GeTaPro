'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useLogged } from '@/app/hooks/useLogged'

type Section = { name: string; text: string };

interface Project {
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
}

export default function ProjectsPage() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useLogged()



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/fetchProyects', {
          method: 'POST',
          body: JSON.stringify({ userId: user?.id }),
        });
  
        const result = await res.json();
  
        if (res.ok) {
          setProjects(result.projects);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        console.log(message);
      } finally {
        setLoading(false);
      }
    };
  
    if (user?.id) {
      fetchProjects();
    }
  }, [user?.id]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
  
    // Validación de campos vacíos o solo espacios
    if (!name.trim() || !description.trim()) {
      alert("Por favor, complete todos los campos antes de continuar, Señor.")
      return
    }
  
    try {
      const res = await fetch('/api/add-proyect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      })
      const { project } = await res.json()
  
      if (!project?.id) {
        throw new Error("La API no devolvió un ID válido, algo huele a Hydra.")
      }
  
      router.push(`/dashboard/proyectos/${project.id}`)
    } catch (error) {
      console.error("Falló la creación del proyecto, Señor:", error)
      alert("Hubo un error al crear el proyecto. Intente nuevamente o llame a Jarvis.")
    }
  }

  return (
    <div className="p-3 flex flex-col w-full h-full">
      <div className="font-extrabold text-5xl">Proyectos</div>
      <div className="flex flex-col p-10">
        {loading ? (
            <div className="text-gray-500 text-lg">Cargando proyectos... Paciencia, Señor.</div>
            ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {projects.map((project) => (
                <div
                    key={project.id}
                    className="bg-white border rounded-lg p-6 shadow hover:shadow-md transition cursor-pointer"
                    onClick={() => router.push(`/dashboard/proyectos/${project.id}`)}
                >
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-gray-600 line-clamp-3">{project.description}</p>
                    <p className="text-xs text-right mt-4 text-gray-400">Progreso: {project.progress}%</p>
                </div>
                ))}
            </div>
            ) : (
            <div className="text-gray-500 text-lg italic">Aún no hay proyectos. ¿Hora de crear algo legendario?</div>
            )}
        <button
          onClick={() => setShowModal(true)}
          className='bg-gray-300 w-60 rounded h-40 font-bold text-5xl'
        >
          +
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col bg-gray-100 justify-between h-[70%] p-6 rounded-lg shadow-lg w-6/12 max-w-5xl">
            <form onSubmit={handleCreateProject} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Crear nuevo proyecto</h2>
              <input
                type="text"
                placeholder="Nombre del proyecto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <textarea
                placeholder="Descripción del proyecto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border border-gray-300 rounded"
                required
              />
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}