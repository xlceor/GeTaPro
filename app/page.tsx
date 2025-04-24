import Image from "next/image";
import {montserrat} from '@/app/ui/fonts'
import Listnum from "./ui/listnum";
import Link from 'next/link';

export default function Home() {
  return (
    <div className=" flex-col flex items-center  justify-between w-full bg-gray-900 text-white h-full min-h-screen p-8 pb-0 gap-16 ">
      {/**font-[family-name:var(--font-geist-sans)] */}
      <main className="flex flex-col gap-8 row-start-2 w-full h-full min-h-[200%] items-center justify-center mx-auto sm:items-start">
        <div className="flex h-dvh w-full justify-center items-center">
          <div className="flex w-4/5 h-4/6 bg-gray-950 border-2 border-cyan-600 rounded-lg">
            <Image
            src="/Getapro.avif"
            width={896}
            height={1152}
            className="hidden md:block h-full w-2/5"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <div className="w-full h-full flex flex-col justify-around p-10 font-bold">
            <h1 className={`${montserrat.className} text-transparent bg-clip-text bg-gradient-to-br from-violet-500  to-teal-300 to-80% text-5xl`}>GeTaPro: Una Aplicación de Gestión de Tareas Basada en IA para Proyectos Escolares</h1>
            {/* <div className="grid grid-cols-2 w-2/3">
              <li>Carlos Osorio</li>
              <li>Fernanda Garcia</li>
              <li>Natalia Estefania</li>
              <li>Oraria Dominges</li>
              <li>Valentin Herrera</li>
              <li>Julieta Alvarado</li>
            </div> */}
                      <Link
            href={"/login"}
            className="p-6 bg-violet-600"
          >
            <div className='flex items-center gap-2  justify-center '>
                <p className="hidden md:block md:w-10">Enter</p>
            </div>
          </Link>
            <div>
              <div>Info</div>
              <div></div>
            </div>
          </div>
          </div>
        </div>
        <div className="flex h-dvh w-full justify-center items-center">
          <div className="flex flex-col w-4/5 h-4/6 bg-gray-950 border-2 border-cyan-600 rounded-lg">
            <Image
            src="/charts.avif"
            width={896}
            height={1152}
            className="flex h-1/5 w-full object-cover object-center"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <div className="w-full h-full flex flex-col justify-around p-10 font-bold">
            <h1 className={`${montserrat.className} text-transparent bg-clip-text bg-gradient-to-r from-violet-500  to-teal-300 to-80% text-5xl`}>Objetivos del Proyecto</h1>
            <div className="grid grid-cols-2 w-full h-2/4">
            <li className=""><Listnum num={1}/></li>
            <li className=""></li>
            <li className=""></li>
            <li className=""></li>
            </div>
          </div>
          
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
