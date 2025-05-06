"use client";

import Upload from "./upload"
import { useEffect, useState } from "react";
import { JSONContent } from '@tiptap/react';
import toast from 'react-hot-toast';


type Chapter = {
    [sectionKey: string]: {
      name: string;
      text: string;
      extraFiles:File[]
    };
  };

  interface TextContent {
    type: string; 
    text: JSONContent;
  }
interface Card {
    userId: string;
    projectId: string;
    chapterKey: string;
    chapter : Chapter;
    prevContent : TextContent
}
export default function Card({ userId, projectId, chapterKey, chapter, prevContent }: Card) {

    const [content, setContent] = useState(prevContent);

    useEffect(() => {
        setContent(prevContent);
      }, [prevContent]);
    

    console.log("content" + content)
  
    const sectionKey = Object.keys(chapter)[0]; // Asume que solo hay una clave
    const section = chapter[sectionKey];
  
    const handleSave = async (newContent: TextContent) => {
      try {
        console.log(
          "userId: " + userId,
          "projectId: " + projectId,
          "chapterKey: " + chapterKey,
          "sectionKey: " + sectionKey,
          "newContent.text:", newContent.text // Esto debería ser el objeto completo que mencionaste
        );
        const response = await fetch('/api/update-section', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            projectId,
            chapter: chapterKey,
            section: sectionKey,
            text: newContent.text // Aquí pasas el objeto completo
          }),
        });
    
        if (!response.ok) throw new Error('Error al guardar');
        toast.success('✅ Contenido guardado correctamente');
      } catch (err) {
        console.error(err);
        toast.error('❌ Error al guardar contenido');
      }
    };
    
    if (!content?.text?.content) {
      return (
        <div className="bg-white shadow h-[16rem] flex p-2 flex-col items-center w-full rounded-xl">
          <div className="font-bold text-xl">⌛ Cargando contenido...</div>
        </div>
      );
    }
    return (
      <div>
        <div className="bg-white shadow h-[16rem] flex p-2 flex-col items-center w-full rounded-xl">
          <div className="font-bold text-xl">{section.name}</div>
          <div className="font-semibold text-sm p-2 px-4">{section.text}</div>
          <div className="flex w-full justify-around h-full">
            <Upload content={content} setContent={setContent} onSave={handleSave}/>
          </div>
        </div>
      </div>
    );
  }