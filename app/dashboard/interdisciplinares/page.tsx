import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import clsx from 'clsx';
{/* <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>inter</h1> */}
export default function page() {
    return( 
        <div className='flex flex-col w-full h-full'>
            <div className="head flex shadow bg-slate-100 w-full h-1/4 border-violet-600 border-2 rounded-xl">
                <div className="flex flex-col w-full gap-3 h-full justify-center items-center">
                    <h1 className="text-4xl font-bold">Nombre</h1>
                    <div className="text-gray-500">00/00/00</div>
                </div>
                <div className="w-2/3 bg-slate-400 rounded-lg flex flex-col">
                <div className=" rounded-lg bg-white flex h-9 justify-start items-center"> <button className='bg-blue-500 rounded-l p-2 w-10 flex h-full justify-center items-center'>lupa</button> <input type="text" placeholder="Search" className='w-full h-full px-2'  /></div>
                <p className=""> descripcion</p>
                </div>
            </div>
            <div className="body flex flex-col h-4/5 p-2 w-full">
                <div className=" h-1/3 w-full flex gap-1">
                    <div className="flex rounded-xl w-1/3 h-full bg-white p-3">Progress</div>
                    <div className="flex rounded-xl  flex-col w-1/3 h-full bg-white p-3">
                        <div>Chat</div>
                        <Link href="/dashboard/chat" className="text-blue-500 underline">Ver más →</Link>
                    </div>
                    <div className="flex rounded-xl flex-col justify-between w-1/3 h-full bg-white p-3">
                        <div>Kanban</div>
                        <Link href="/dashboard/kanban" className="text-blue-500 underline">Ver más →</Link>
                    </div>
                </div>
                <div className="chapters flex flex-col w-full items-center h-full p-2">
                    <div className="navegation w-3/4 justify-center items-center flex bg-gray-200 rounded border  border-gray-400">
                        <Link href="/dashboard/interdisciplinares/chapter_1" className="flex w-full hover:bg-white rounded border-r border-gray-400 justify-center items-center">Capitulo 1</Link>
                        <Link href="/dashboard/interdisciplinares/chapter_2" className="flex w-full hover:bg-white rounded border-r border-gray-400 justify-center items-center">Capitulo 2</Link>
                        <Link href="/dashboard/interdisciplinares/chapter_3" className="flex w-full hover:bg-white rounded border-r border-gray-400 justify-center items-center">Capitulo 3</Link>
                        <Link href="/dashboard/interdisciplinares/chapter_4" className="flex w-full hover:bg-white rounded  justify-center items-center">Capitulo 4</Link>
                    </div>
                    <div className="body"></div>


                </div>
            </div>
        </div>
)}