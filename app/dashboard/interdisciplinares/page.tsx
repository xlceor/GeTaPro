'use client';
import CapitulosNav from './chaptersNav';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Chapter1 from './chapter1';
import Chapter2 from './chapter2';
import Chapter3 from './chapter3';
import Chapter4 from './chapter4';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
{/* <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>inter</h1> */}
export default function page() {
    const [capitulo, setCapitulo] = useState(1);

    const renderizarCapitulo = () => {
        switch (capitulo) {
            case 1:
                return <Chapter1 />;
            case 2:
                return <Chapter2 />;
            case 3:
                return <Chapter3 />;
            case 4:
                return <Chapter4 />;
            default:
                return <p>Selecciona un capítulo</p>;
        }
    };

    const MyProgress = ({ percentage }: { percentage: number }) => {
        const [animatedValue, setAnimatedValue] = useState(0);

        useEffect(() => {
            let start = 0;
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
        <div className='flex flex-col scroll-hidden scrollbar-hide w-full h-full'> {/*<--- Jarvis, aqui es */}
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