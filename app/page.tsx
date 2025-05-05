'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Listnum from "./ui/listnum";
import Link from 'next/link';
import Card from "./ui/landing/card";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentDiapo, setCurrentDiapo] = useState(1);

  const diapos = 8;

  useEffect(() => {
    const handleScroll = () => {
      const progress = 100 / diapos;
      const limitedProgress = progress * currentDiapo;
      setScrollProgress(limitedProgress);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentDiapo]); // Añadir currentDiapo como dependencia

  function updateDiapo(act:'+' | '-'){
    if(act == '+'){
      setCurrentDiapo(prev => (prev < diapos ? prev + 1 : prev));
    } else {
      setCurrentDiapo(prev => (prev > 1 ? prev - 1 : prev));
    }
  }
  
  useEffect(() => {

    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        updateDiapo('-')
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        updateDiapo('+')
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => {
      window.removeEventListener("keydown", handleKeys);
    };
  }, [currentDiapo])

  function handleDiapos() {
    switch (currentDiapo) {
      case 1:
        return (
          <motion.div className="flex flex-col md:flex-row w-full h-full"
          key="diapo-1" // Usa una clave única para que Framer Motion detecte el cambio
          initial={{ opacity: 0, y:-10 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y:10 }}
          transition={{ duration: 0.5 }}
          >
          <div className="w-full md:w-5/6 h-full p-4 md:p-6">
            <h1 className="text-3xl md:text-5xl font-sans p-4 text-justify font-extrabold gradient-text">
              Gestión Eficiente de <br /> Proyectos de Investigación Académica
            </h1>
            <div className="w-full text-justify p-4 ">
              <p className="font-mono">
                Actualmente, la gestión de proyectos académicos enfrenta numerosos desafíos como la desorganización de la información, la pérdida de datos importantes y la comunicación ineficaz entre los miembros del equipo. Estos problemas afectan negativamente la calidad de los proyectos y la eficiencia en su desarrollo.
                <br /><br />
                Este proyecto propone una solución innovadora mediante el desarrollo de una aplicación web moderna, colaborativa y estructurada que permita a los estudiantes y docentes gestionar proyectos académicos de manera organizada, efectiva y en tiempo real, desde la concepción de la idea hasta la entrega final.
              </p>
            </div>
          </div>
          <div className="w-full md:w-2/4 h-full relative">
            <Image 
              src={"/1.jpg"}
              alt={"Imagen"}
              width={650}
              height={600}
              className="w-full h-64 md:h-full rounded-3xl object-cover"
            />
            <Link href={"/login"} className="w-full h-1/4 flex justify-center items-center absolute bottom-0">
              <button className="w-3/5 h-16 md:h-20 bg-purple-500 rounded-xl text-white font-extrabold text-lg md:text-xl shadow-xl hover:scale-105 transition-all duration-200">
                Enter
              </button>
            </Link>
          </div>
        </motion.div>
        );
      case 2:
        return (
          <motion.div className="flex flex-col md:flex-row w-full h-full p-4 md:p-6"
          key="diapo-2" // Usa una clave única para que Framer Motion detecte el cambio
          initial={{ opacity: 0, y:-10 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y:10 }}
          transition={{ duration: 0.5 }}
          >
          <div className="w-full md:w-5/6 flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold gradient-text">Planteamiento del Problema</h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6 w-[98%]">
                {[
                  { title: "Desorganización", text: "Falta de plataformas digitales centralizadas que permitan un seguimiento adecuado y sistemático de los proyectos de investigación académica." },
                  { title: "Retrasos y Duplicación", text: "La carencia de herramientas colaborativas provoca retrasos en las entregas y la duplicación de esfuerzos, reduciendo la eficiencia del trabajo." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-200 p-4 flex flex-col justify-center items-center shadow-inner rounded-xl shadow-black/20 w-full">
                    <h4 className="font-bold text-xl font-sans">{item.title}</h4>
                    <p className="p-2 text-justify font-mono">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-200 p-4 flex flex-col justify-center items-center shadow-inner rounded-xl shadow-black/20 w-[98%]">
                <h4 className="font-bold text-xl font-sans">Comunicación Ineficaz</h4>
                <p className="p-2 text-justify font-mono">
                  Dificultades en la interacción y coordinación entre estudiantes y asesores académicos, que limitan la fluidez en el avance del proyecto.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/4 h-full relative">
            <Image 
              src={"/2.jpg"}
              alt={"Imagen"}
              width={650}
              height={600}
              className="w-full h-64 md:h-full rounded-3xl object-cover"
            />
          </div>
        </motion.div>
        );
      case 3:
        return (
          <motion.div className="flex flex-col w-full h-full items-center justify-center p-4"
          key="diapo-3" // Usa una clave única para que Framer Motion detecte el cambio
          initial={{ opacity: 0, y:-10 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y:10 }}
          transition={{ duration: 0.5 }}
          >
            <h2 className="p-4 md:p-10 gradient-text font-extrabold text-3xl md:text-5xl">Objetivos Del Proyecto</h2>
            <div className="flex flex-col md:flex-row justify-center items-center w-full gap-8 p-4">
              <div className="flex flex-col items-center w-full">
                <h3 className="gradient-text font-bold text-2xl md:text-3xl p-4">Objetivo General</h3>
                <p className="font-mono text-lg text-center">
                  Desarrollar una aplicación web funcional que permita la gestión eficiente de proyectos de investigación académica mediante herramientas de colaboración y organización.
                </p>
              </div>
              <div className="flex flex-col items-center w-full">
                <h3 className="gradient-text font-bold text-2xl md:text-3xl p-4">Objetivos Específicos</h3>
                <ul className="flex flex-col gap-4 p-2 font-mono text-lg">
                  <li>Diseñar una arquitectura de software escalable y segura.</li>
                  <li>Implementar un sistema de gestión basado en capítulos de proyectos.</li>
                  <li>Facilitar la colaboración entre estudiantes y asesores mediante roles y notificaciones.</li>
                  <li>Integrar bases de datos en tiempo real utilizando tecnologías modernas como Supabase.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div className="flex flex-col md:flex-row w-full h-full p-4 gap-6"
          key="diapo-4" // Usa una clave única para que Framer Motion detecte el cambio
          initial={{ opacity: 0, y:-10 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y:10 }}
          transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col w-full gap-6">
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold gradient-text">Justificación de la Investigación</h2>
              {[
                { title: "Necesidad Digital", text: "Existe una creciente necesidad de digitalizar y mejorar la gestión de los proyectos académicos, adaptándose a los nuevos entornos de aprendizaje remoto y colaborativo." },
                { title: "Impacto Potencial", text: "La implementación de esta aplicación puede impactar positivamente la calidad y el seguimiento de los proyectos, reduciendo la carga administrativa y mejorando la productividad estudiantil." },
                { title: "Tecnologías Modernas", text: "El uso de Next.js, Tailwind CSS y Supabase permite crear un entorno moderno, eficiente y altamente adaptable para la gestión académica." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="bg-gray-200 p-6 w-10 h-10 rounded-xl shadow-inner shadow-black/20"></div>
                  <div>
                    <h4 className="font-bold text-xl pb-2">{item.title}</h4>
                    <p className="font-mono text-justify">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-2/4 h-full relative">
              <Image 
                src={"/3.jpg"}
                alt={"Imagen"}
                width={650}
                height={600}
                className="w-full h-64 md:h-full rounded-3xl object-cover"
              />
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div className="flex flex-col w-full"
          key="diapo-5" // Usa una clave única para que Framer Motion detecte el cambio
          initial={{ opacity: 0, y:-10 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y:10 }}
          transition={{ duration: 0.5 }}
          >
            <div className=" w-full h-72">
              <Image 
                src={"/4.jpg"}
                alt={"Imagen"}
                width={650}
                height={600}
                className="w-full h-full object-cover rounded-t-3xl"
              />
            </div>
            <div className="p-6">
              <h2 className="p-5 gradient-text font-extrabold text-3xl md:text-5xl">Hipótesis de la Investigación</h2>
              <ul className="font-mono text-lg flex flex-col gap-4 p-4">
                <li>La aplicación permitirá mejorar la organización y el seguimiento de los proyectos estudiantiles en entornos académicos.</li>
                <li>El uso de tecnologías modernas garantizará una experiencia ágil, intuitiva y satisfactoria para los usuarios.</li>
                <li>El sistema fomentará la colaboración, distribución equitativa de tareas y mejorará los tiempos de entrega y la calidad de los proyectos finales.</li>
              </ul>
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div className="flex flex-col md:flex-row w-full h-full p-4"
          key="diapo-6" // Usa una clave única para que Framer Motion detecte el cambio
          initial={{ opacity: 0, y:-10 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y:10 }}
          transition={{ duration: 0.5 }}
          >
            <div className="w-full md:w-2/4 h-full relative">
              <Image 
                src={"/5.jpg"}
                alt={"Imagen"}
                width={650}
                height={600}
                className="w-full h-64 md:h-full rounded-3xl object-cover"
              />
            </div>
            <div className="w-full md:w-5/6 flex flex-col items-center p-4">
              <h1 className="text-3xl md:text-5xl font-sans p-4 text-justify font-extrabold gradient-text">Paradigma de la Investigación</h1>
              <p className="font-mono text-lg text-justify p-4">
                El paradigma adoptado para el desarrollo de esta investigación es tecnológico-cuantitativo, orientado a la construcción, validación y medición del impacto de la solución propuesta en entornos educativos reales.
              </p>
            </div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div className="flex flex-col md:flex-row w-full h-full p-4"
          key="diapo-7" // Usa una clave única para que Framer Motion detecte el cambio
          initial={{ opacity: 0, y:-10 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y:10 }}
          transition={{ duration: 0.5 }}
          >
            <div className="w-full md:w-2/4 h-full relative">
              <Image 
                src={"/6.jpg"}
                alt={"Imagen"}
                width={650}
                height={600}
                className="w-full h-64 md:h-full rounded-3xl object-cover"
              />
            </div>
            <div className="w-full md:w-5/6 flex flex-col items-center p-4">
              <h1 className="text-3xl md:text-5xl font-sans p-4 text-justify font-extrabold gradient-text">Método de Investigación</h1>
              <ul className="flex flex-col w-full h-full gap-4 font-mono text-lg p-4">
                <li className="flex w-full h-full gap-2"><Listnum num={1} /> Análisis de entregas y calidad final de proyectos.</li>
                <li className="flex w-full h-full gap-2"><Listnum num={2} /> Medición de la satisfacción de los usuarios respecto a la plataforma.</li>
                <li className="flex w-full h-full gap-2"><Listnum num={3} /> Evaluación de eficiencia en términos de tiempo y calidad de ejecución de proyectos.</li>
              </ul>
            </div>
          </motion.div>
        );
      case 8:
        return (
          <motion.div className="flex flex-col w-full"
          key="diapo-8" // Usa una clave única para que Framer Motion detecte el cambio
          initial={{ opacity: 0, y:-10 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y:10 }}
          transition={{ duration: 0.5 }}
          >
            <div className=" w-full h-56">
              <Image 
                src={"/7.jpg"}
                alt={"Imagen"}
                width={650}
                height={600}
                className="w-full h-full object-cover rounded-t-3xl"
              />
            </div>
            <div className="flex flex-col md:flex-row w-full p-6">
              <div className="w-full font-mono text-lg">
                <h2 className="pb-2 gradient-text font-extrabold text-3xl md:text-4xl">Conclusiones y Próximos Pasos</h2>
                <p className="text-justify font-mono">
                  La aplicación desarrollada ofrece una plataforma integral para la gestión académica de proyectos, mejorando los procesos de organización, colaboración y seguimiento. Como próximos pasos, se plantea su implementación piloto en instituciones educativas, recogiendo retroalimentación de usuarios reales para futuras optimizaciones y mejoras.
                </p>
              </div>
              <div className="w-full flex flex-col items-center">
                <p className="p-2 font-sans font-extrabold text-2xl gradient-text">Integrantes del equipo</p>
                <div className="grid grid-cols-2 gap-4 w-full h-full py-14 items-center justify-around p-4">
                  {["Carlos Osorio", "Valentin Herrera", "Oralia Dominguez", "Fernanda Garcia", "Julieta Alvarado", "Natalia Estefania"].map((name, idx) => (
                    <li key={idx} className="font-bold text-xl gradient-text flex justify-center items-center">{name}</li>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div className="flex flex-col md:flex-row w-full h-full"
          key="diapo-1" // Usa una clave única para que Framer Motion detecte el cambio
          initial={{ opacity: 0, y:-10 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y:10 }}
          transition={{ duration: 0.5 }}
          >
          <div className="w-full md:w-5/6 h-full p-4 md:p-6">
            <h1 className="text-3xl md:text-5xl font-sans p-4 text-justify font-extrabold gradient-text">
              Gestión Eficiente de <br /> Proyectos de Investigación Académica
            </h1>
            <div className="w-full text-justify p-4 ">
              <p className="font-mono">
                Actualmente, la gestión de proyectos académicos enfrenta numerosos desafíos como la desorganización de la información, la pérdida de datos importantes y la comunicación ineficaz entre los miembros del equipo. Estos problemas afectan negativamente la calidad de los proyectos y la eficiencia en su desarrollo.
                <br /><br />
                Este proyecto propone una solución innovadora mediante el desarrollo de una aplicación web moderna, colaborativa y estructurada que permita a los estudiantes y docentes gestionar proyectos académicos de manera organizada, efectiva y en tiempo real, desde la concepción de la idea hasta la entrega final.
              </p>
            </div>
          </div>
          <div className="w-full md:w-2/4 h-full relative">
            <Image 
              src={"/1.jpg"}
              alt={"Imagen"}
              width={650}
              height={600}
              className="w-full h-64 md:h-full rounded-3xl object-cover"
            />
            <Link href={"/login"} className="w-full h-1/4 flex justify-center items-center absolute bottom-0">
              <button className="w-3/5 h-16 md:h-20 bg-purple-500 rounded-xl text-white font-extrabold text-lg md:text-xl shadow-xl hover:scale-105 transition-all duration-200">
                Enter
              </button>
            </Link>
          </div>
        </motion.div>
        );
    }
  }
  

  return (
    <div className="flex flex-col items-center justify-between w-full h-full min-h-screen p-4 md:p-8 pb-0 gap-16">
      <div className="fixed top-0 left-0 w-full z-50">
        <div
          className="h-1 bg-purple-500 p-1 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card>
          {handleDiapos()}
        </Card>
      </motion.div>
      <footer className="fixed w-full h-16 bottom-0 left-0 bg-gray-500/90 flex justify-center items-center">
      <div className="md:w-1/3 w-full p-3 h-full flex gap-3 justify-center items-center">
        <div className="w-full text-2xl text-white font-bold">Diapositiva {currentDiapo}</div>
        <div className="w-full h-full flex">
        <button className="w-full h-full hover:bg-gray-700 text-white font-extrabold text-4xl" onClick={() => updateDiapo('-')}>{"<--"}</button>
        <button className="w-full h-full hover:bg-gray-700 text-white font-extrabold text-4xl" onClick={() => updateDiapo('+')} >{"-->"}</button>
      </div>
      </div>
      </footer>

    </div>
  );
}