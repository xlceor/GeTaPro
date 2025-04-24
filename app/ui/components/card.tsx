"use client";

import Upload from "./upload"
import { useState } from "react";
import { JSONContent } from '@tiptap/react';

type Chapter = {
    [sectionKey: string]: {
      name: string;
      text: string;
    };
  };

interface TextContent {
    type: "text";
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
  
    const sectionKey = Object.keys(chapter)[0]; // Asume que solo hay una clave
    const section = chapter[sectionKey];
  
    const handleSave = async (newContent: TextContent) => {
      try {
        const response = await fetch('/api/update-section', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            projectId,
            chapter: chapterKey,
            section: sectionKey,
            text: newContent.text
          }),
        });
  
        if (!response.ok) throw new Error('Error al guardar');
        alert('✅ Contenido guardado correctamente');
      } catch (err) {
        console.error(err);
        alert('❌ Error al guardar contenido');
      }
    };
  
    return (
      <div>
        <div className="bg-white shadow h-[16rem] flex p-2 flex-col items-center w-full rounded-xl">
          <div className="font-bold text-xl">{section.name}</div>
          <div className="font-semibold text-sm p-2 px-4">{section.text}</div>
          <div className="flex w-full justify-around h-full">
            <Upload content={content} setContent={setContent} onSave={handleSave} />
          </div>
        </div>
      </div>
    );
  }