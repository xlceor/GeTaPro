'use client';
import Image from "next/image";
import Link from 'next/link';
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="flex flex-col items-center w-full min-h-screen gap-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row w-full min-h-screen  gap-6 items-center justify-between">
        <div className="flex-1 flex p-8 flex-col gap-6">
          <span className="uppercase tracking-widest text-sm text-purple-500 font-semibold">Gestión inteligente</span>
          <h1 className="text-5xl md:text-6xl font-extrabold gradient-text leading-tight">
            Organiza tus proyectos <br /> escolares como un profesional
          </h1>
          <p className="text-lg font-mono text-gray-700 text-justify">
            Conia convierte la gestión de proyectos académicos en una experiencia fluida, colaborativa y sin estrés. Ya sea que estés empezando o finalizando, nuestra plataforma te acompaña en cada paso del camino.
          </p>
          <Link href="/login">
            <button className="bg-purple-600 hover:bg-purple-700 text-white text-xl px-8 py-4 rounded-full shadow-md hover:shadow-xl transition-all duration-300">
              Comienza tu proyecto
            </button>
          </Link>
        </div>
        <div className=" flex  w-2/4 h-full">
          <Image src="/1.jpg" alt="Gestión de proyectos escolares" width={400} height={800} className=" w-full h-full" />
        </div>
      </section>

      {/* Problemas que resuelve */}
      <section className="flex flex-col bg-gray-200 w-full gap-8 p-8 items-center">
        <p className="text-center font-mono text-lg max-w-2xl mb-2">
          ¿Por qué seguir sufriendo con tareas desorganizadas y comunicación confusa? Descubre cómo Conia elimina los obstáculos más comunes en tus proyectos.
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-2">¿Qué problemas resuelve?</h2>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="bg-gray-200 p-6 flex-1 flex flex-col items-center shadow-inner rounded-xl shadow-black/20">
            <h4 className="font-bold text-xl font-sans mb-2">Desorganización</h4>
            <p className="p-2 text-justify font-mono">
              Falta de plataformas digitales centralizadas que permitan un seguimiento adecuado y sistemático de los proyectos de investigación académica.
            </p>
          </div>
          <div className="bg-gray-200 p-6 flex-1 flex flex-col items-center shadow-inner rounded-xl shadow-black/20">
            <h4 className="font-bold text-xl font-sans mb-2">Retrasos y Duplicación</h4>
            <p className="p-2 text-justify font-mono">
              La carencia de herramientas colaborativas provoca retrasos en las entregas y la duplicación de esfuerzos, reduciendo la eficiencia del trabajo.
            </p>
          </div>
          <div className="bg-gray-200 p-6 flex-1 flex flex-col items-center shadow-inner rounded-xl shadow-black/20">
            <h4 className="font-bold text-xl font-sans mb-2">Comunicación Ineficaz</h4>
            <p className="p-2 text-justify font-mono">
              Dificultades en la interacción y coordinación entre estudiantes y asesores académicos, que limitan la fluidez en el avance del proyecto.
            </p>
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section className="flex flex-col md:flex-row w-full gap-8 p-8 items-center">
        <div className="flex-1 flex flex-col items-start">
          <h3 className="gradient-text font-bold text-2xl md:text-3xl mb-4">Objetivo General</h3>
          <p className="font-mono text-lg text-justify w-3/4">
            Desarrollar una aplicación web funcional que permita la gestión eficiente de proyectos de investigación académica mediante herramientas de colaboración y organización.
          </p>
        </div>
        <div className="flex-1 flex flex-col items-start">
          <h3 className="gradient-text font-bold text-2xl md:text-3xl mb-4">Objetivos Específicos</h3>
          <ul className="flex flex-col gap-4 font-mono text-lg list-disc pl-6">
            <li>Diseñar una arquitectura de software escalable y segura.</li>
            <li>Implementar un sistema de gestión basado en capítulos de proyectos.</li>
            <li>Facilitar la colaboración entre estudiantes y asesores mediante roles y notificaciones.</li>
            <li>Integrar bases de datos en tiempo real utilizando tecnologías modernas como Supabase.</li>
          </ul>
        </div>
      </section>

      {/* Justificación + Hipótesis */}
      <section className="flex bg-gray-200 p-8 flex-col w-full gap-8 items-center">
        <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-2">Justificación &amp; Hipótesis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-inner shadow-black/10">
            <span className="text-purple-500 text-3xl mb-2">💡</span>
            <h4 className="font-bold text-lg mb-1">Necesidad Digital</h4>
            <p className="font-mono text-justify text-base">
              Existe una creciente necesidad de digitalizar y mejorar la gestión de los proyectos académicos, adaptándose a los nuevos entornos de aprendizaje remoto y colaborativo.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-inner shadow-black/10">
            <span className="text-purple-500 text-3xl mb-2">🚀</span>
            <h4 className="font-bold text-lg mb-1">Impacto Potencial</h4>
            <p className="font-mono text-justify text-base">
              La implementación de esta aplicación puede impactar positivamente la calidad y el seguimiento de los proyectos, reduciendo la carga administrativa y mejorando la productividad estudiantil.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-inner shadow-black/10">
            <span className="text-purple-500 text-3xl mb-2">🛠️</span>
            <h4 className="font-bold text-lg mb-1">Tecnologías Modernas</h4>
            <p className="font-mono text-justify text-base">
              El uso de Next.js, Tailwind CSS y Supabase permite crear un entorno moderno, eficiente y altamente adaptable para la gestión académica.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-inner shadow-black/10">
            <span className="text-purple-500 text-3xl mb-2">📈</span>
            <h4 className="font-bold text-lg mb-1">Organización Mejorada</h4>
            <p className="font-mono text-justify text-base">
              La aplicación permitirá mejorar la organización y el seguimiento de los proyectos estudiantiles en entornos académicos.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-inner shadow-black/10">
            <span className="text-purple-500 text-3xl mb-2">⚡</span>
            <h4 className="font-bold text-lg mb-1">Experiencia Ágil</h4>
            <p className="font-mono text-justify text-base">
              El uso de tecnologías modernas garantizará una experiencia ágil, intuitiva y satisfactoria para los usuarios.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-inner shadow-black/10">
            <span className="text-purple-500 text-3xl mb-2">🤝</span>
            <h4 className="font-bold text-lg mb-1">Colaboración y Calidad</h4>
            <p className="font-mono text-justify text-base">
              El sistema fomentará la colaboración, distribución equitativa de tareas y mejorará los tiempos de entrega y la calidad de los proyectos finales.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusión y equipo */}
      <section className="flex p-10 flex-col w-full gap-8 items-center">
        <h2 className="text-3xl md:text-5xl font-extrabold gradient-text mb-2">Conclusión</h2>
        <p className="text-justify font-mono text-lg max-w-3xl">
          Conia no es solo una app, es la evolución de cómo deberíamos trabajar en equipo. Proyectos claros, tiempos definidos, roles asignados, y toda tu información, organizada de forma visual y potente.
        </p>
        <Link href="/login">
          <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white text-xl px-8 py-4 rounded-full shadow-md hover:shadow-xl transition-all duration-300">
            Quiero vivir la experiencia
          </button>
        </Link>
        <div className="w-full flex flex-col items-center">
          <p className="p-2 font-sans font-extrabold text-2xl gradient-text mb-4">Integrantes del equipo</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl py-4 items-center justify-around">
            {[
              "Carlos Osorio",
              "Valentin Herrera",
              "Oralia Dominguez",
              "Fernanda Garcia",
              "Julieta Alvarado",
              "Natalia Estefania"
            ].map((name, idx) => (
              <li key={idx} className="font-bold text-xl gradient-text flex justify-center items-center list-none">{name}</li>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}