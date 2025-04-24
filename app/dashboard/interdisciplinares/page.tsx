'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { useLogged } from '@/app/hooks/useLogged';
import Card from "@/app/ui/components/card";
{/* <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>inter</h1> */}
interface ChapterData {
  [chapterKey: string]: {
    [sectionKey: string]: {
      name: string;
      text: string;
    };
  };
}

export default function Page() {
    const [capitulo, setCapitulo] = useState(1);
    const [chapterData, setChapterData] = useState<ChapterData | null>(null);
    const titles: Record<string, { title: string; description: string }> = {
        "chapter1": {
            title: "Capítulo 1: El Problema",
            description: "Cada gran descubrimiento comienza con una pregunta. Y cada pregunta surge de una inquietud, una necesidad o una observación del mundo que nos rodea. En este capítulo, exploraremos el problema central de nuestra investigación, estableciendo las bases para su análisis y solución. "
        },
        "chapter2": {
            title: "Capítulo 2: Fundamentación o Contexto Teórico",
            description: "Toda investigación se sostiene sobre el conocimiento previo. Antes de aventurarnos en nuevos hallazgos, debemos comprender qué se ha dicho y hecho en el pasado sobre nuestro tema. "
        },
        "chapter3": {
            title: "Capítulo 3: Contexto Metodológico",
            description: "Investigar sin un método es como navegar sin brújula. En este capítulo, se define el camino que seguiremos para obtener respuestas confiables y significativas."
        },
        "chapter4": {
            title: "Capítulo 4: Análisis e Interpretación de Resultados",
            description: "Los datos sin interpretación son solo números y palabras. En este capítulo, transformamos la información en conocimiento, dándole sentido a nuestros hallazgos."
        }
    };
    const user  = "123";

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch('/api/chapters');
        const data = await res.json();
        setChapterData(data.chapters);
      };
      fetchData();
    }, []);

    const renderizarCapitulo = () => {
      if (!chapterData || !user) return <p>Cargando...</p>;
      const chapterKeys = Object.keys(chapterData);
      const currentChapterKey = chapterKeys[capitulo - 1];
      const currentChapter = chapterData[currentChapterKey];
      const titleInfo = titles[currentChapterKey];
      if (!titleInfo) {
          console.warn("Clave inválida:", currentChapterKey);
          return <p className="text-red-500">Este capítulo aún no ha sido creado, Señor.</p>;
      }
      
      return (
        <div>
          <div className="flex flex-col w-full h-40 shadow items-center rounded-xl p-5 bg-white">
            <h2 className="text-2xl font-bold">{titleInfo.title}</h2>
            <p className="text-justify w-full">{titleInfo.description}</p>
          </div>
            <div className='wrapper grid grid-cols-2 gap-2 p-2 w-full h-max'>
                {Object.entries(currentChapter).map(([sectionKey, section]) => (
                    <Card
                    key={sectionKey}
                    userId={user}
                    projectId="default"
                    chapterKey={currentChapterKey}
                    chapter={{ [sectionKey]: section }}
                    prevContent={{ type: "text", text: { type: "doc", content: [] } }}
                    />
                ))}
            </div>
        </div>
      );
    };

    const MyProgress = ({ percentage }: { percentage: number }) => {
        const [animatedValue, setAnimatedValue] = useState(0);

        useEffect(() => {
            const duration = 300;
            const startTime = performance.now();

            const animate = (time: number) => {
                const progress = Math.min((time - startTime) / duration, 1);
                const currentValue = Math.round(progress * percentage);
                setAnimatedValue(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, [percentage]);

        return (
            <CircularProgressbar
                value={animatedValue}
                text={`${percentage}`}
                styles={{
                    path: { stroke: '#3b82f6' },
                    trail: { stroke: '#d1d5db' },
                    text: { fill: '#1f2937', fontSize: '16px' },
                }}
            />
        );
    };
    return( 
        <div className='flex flex-col scroll-hidden scrollbar-hide w-full h-full'>
            <div className="head flex shadow bg-slate-100 w-full h-[13rem] border-violet-600 border-2 rounded-xl">
                <div className="flex flex-col w-full gap-3 h-full justify-center items-center">
                    <h1 className="text-4xl font-bold">Nombre</h1>
                    <div className="text-gray-500">00/00/00</div>
                </div>
                <div className="w-2/3 bg-slate-400 rounded-lg flex flex-col">
                <div className=" rounded-lg bg-white flex h-9 justify-start items-center">
                    <button className='bg-blue-500 rounded-l p-2 w-10 flex h-full justify-center items-center'>lupa</button> 
                    <input type="text" placeholder="Search" className='w-full h-full px-2'  /></div>
                <p className=""> descripcion</p>
                </div>
            </div>
            <div className="body flex flex-col h-4/5 p-2 w-full">
                <div className=" h-[13rem] w-full flex gap-1">
                    <div className="flex shadow rounded-xl w-1/3 max-h-[12remh-full bg-white p-3">
                        <MyProgress percentage={75} />
                    </div>
                    <div className="flex shadow rounded-xl  flex-col w-1/3 h-full bg-white p-3">
                        <div>Chat</div>
                        <Link href="/dashboard/chat" className="text-blue-500 underline">Ver más →</Link>
                    </div>
                    <div className="flex shadow rounded-xl flex-col justify-between w-1/3 h-full bg-white p-3">
                        <div>Kanban</div>
                        <Link href="/dashboard/kanban" className="text-blue-500 underline">Ver más →</Link>
                    </div>
                </div>
                <div className="chapters flex flex-col w-full items-center h-max p-2">
                    <div className="relative navegation transition-transform duration-300 w-3/4 h-10 justify-center items-center flex bg-gray-200 shadow rounded-full border border-gray-400 overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full w-1/4 rounded-full bg-white transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(${(capitulo - 1) * 100}%)` }}
                        />

                        <button onClick={() => setCapitulo(1)} className={clsx("w-1/4 h-full z-10 rounded-full", { "text-violet-600 font-semibold": capitulo === 1 })}>Capítulo 1</button>
                        <button onClick={() => setCapitulo(2)} className={clsx("w-1/4 h-full z-10 rounded-full", { "text-violet-600 font-semibold": capitulo === 2 })}>Capítulo 2</button>
                        <button 
                            onClick={() => setCapitulo(3)} 
                            className={clsx("w-1/4 h-full z-10 rounded-full", { "text-violet-600 font-semibold": capitulo === 3 })}
                        >
                            Capítulo 3
                        </button>
                        <button 
                            onClick={() => setCapitulo(4)} 
                            className={clsx("w-1/4 h-full z-10 rounded-full", { "text-violet-600 font-semibold": capitulo === 4 })}
                        >
                            Capítulo 4
                        </button>
                    </div>
                    <div className="body p-2 w-full h-full min-h-[100dvh] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                            key={capitulo}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute h-max flex-grow overflow-visible w-full "
                            >
                            {renderizarCapitulo()}
                            </motion.div>
                        </AnimatePresence>
                    </div>


                </div>
            </div>
        </div>
)}