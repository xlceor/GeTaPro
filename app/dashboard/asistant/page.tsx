"use client";
import { lusitana } from '@/app/ui/fonts';
import { useState } from "react";
import Chat from './chatAsistant';

export default function Home() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const addMessages = async () => {
    if (!text.trim()) return;

    // Agregar mensaje del usuario
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setText(""); // Limpiar el input después de enviar

    try {
      // Llamar a la API de Next.js
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Agregar respuesta del asistente
      console.log(data.reply)
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      console.log(messages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center gap-3">
      <div className={`${lusitana.className} flex w-full justify-center`}>
        <Chat mess={messages} />
      </div>
      <div className='flex h-full justify-center items-center'>
        <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border p-2  text-black w-80"
              placeholder="Escribe algo..."
            />
            <button onClick={addMessages} className="bg-blue-500 text-white p-2 rounded">
              Enviar
            </button>
      </div>
    </div>
  );
}