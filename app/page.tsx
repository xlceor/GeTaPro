import Image from "next/image";
// import Listnum from "./ui/listnum";
import Link from 'next/link';
import Card from "./ui/landing/card";

{/* <div className="w-full flex flex-col justify-center items-center h-full">
<p className="p-2 font-sans font-extrabold text-2xl gradient-text">Integrantes del equipo</p>
<div className="w-full flex h-full justify-between">
  <div className="grid grid-cols-3 w-full h-full p-2 justify-around gap-1">
    <li className="font-bold text-xl gradient-text w-full flex justify-center items-center">Carlos Osorio</li>
    <li className="font-bold text-xl gradient-text w-full flex justify-center items-center">Valentin Herrera</li>
    <li className="font-bold text-xl gradient-text w-full flex justify-center items-center">Oralia Dominguez</li>
    <li className="font-bold text-xl gradient-text w-full flex justify-center items-center">Fernanda Garcia</li>
    <li className="font-bold text-xl gradient-text w-full flex justify-center items-center">Julieta Alvarado</li>
    <li className="font-bold text-xl gradient-text w-full flex justify-center items-center">Natalia Estefania</li>
  </div>
</div>
</div> */}

export default function Home() {
  return (
    <div className=" flex-col flex items-center  justify-between w-full h-full min-h-screen p-8 pb-0 gap-16 ">
      <Card>
        <div className="flex  w-full h-full">
          <div className="w-5/6 h-full p-6">
          <h1 className="text-5xl font-sans p-5 text-justify font-extrabold gradient-text">
              Gestión Eficiente de <br />
              Proyectos de Investigación Académica
            </h1>
            <div className="w-full text-justify p-10">
              <p className=" font-mono ">
              La gestión de proyectos académicos enfrenta problemas como desorganización, pérdida de información y comunicación ineficaz. La falta de plataformas especializadas dificulta el seguimiento y la colaboración entre estudiantes y docentes.
              <br /> <br />
              Este proyecto propone una aplicación web moderna y colaborativa para organizar proyectos desde la concepción hasta la entrega final, mejorando la calidad y eficiencia.
                </p>

            </div>
          </div>
          <div className="w-2/4 h-full relative">
            <Image 
            src={"/1.jpg"}
            alt={"Imagen"}
            width={650}
            height={600}
            className="w-full h-full rounded-r-3xl relative"
            />
               <Link href={"/login"} className="w-full h-1/4 flex justify-center items-center absolute bottom-0">
                <button className="w-3/5 h-20 bg-purple-500 rounded-xl text-white font-extrabold text-xl shadow-xl hover:scale-105 transition-all duration-200">Enter</button>
               </Link>
          </div>
        </div>
      </Card>
      <Card>
        <div className="w-5/6 h-full flex flex-col justify-around p-6">
          <h2 className="text-5xl font-sans   font-extrabold gradient-text">Planteamiento del Problema</h2>
          <div className="flex flex-col h-4/6 w-full gap-3">
            <div className="flex w-full h-1/2 gap-6">
              <div className="bg-gray-200 w-full h-full shadow-inner rounded-xl shadow-black/20"></div>
              <div className="bg-gray-200 w-full h-full shadow-inner rounded-xl shadow-black/20"></div>
            </div>
            <div className="bg-gray-200 w-full h-3/6 shadow-inner rounded-xl shadow-black/20"></div>
          </div>
        </div>
        <div className="w-2/4 h-full relative">
        <Image 
            src={"/2.jpg"}
            alt={"Imagen"}
            width={650}
            height={600}
            className="w-full h-full rounded-r-3xl relative"
            />
        </div>
      </Card>
    </div>
    
  );
}
