"use client";
import { useState } from "react";
import Modal from "./modal";
import { JSONContent } from '@tiptap/react';

interface TextContent {
  type: "text";
  text: JSONContent;
}

interface upload {
    content : TextContent;
    setContent : (content : TextContent) => void;
    onSave: (newContent: TextContent) => void;
}

export default function Upload({content, setContent, onSave} : upload) {
    const [showModal, setshowModal] = useState(false)

    console.log("content" + content)


    return (
        <div className="flex w-full gap-4 h-full">
          <div className="w-2/5 flex flex-col justify-center items-center gap-2">
            <div>Sube un archivo o</div>
            <button className="p-3 bg-blue-400 w-12 h-12 rounded-lg">^</button>
          </div>
          <div
            className="w-3/5 h-full bg-gray-200 text-gray-500 p-3 rounded-lg overflow-auto cursor-pointer"
            onClick={() => setshowModal(!showModal)}
          >
            <div className="h-full flex items-center justify-center text-center">
              Haz clic aquí para editar el contenido
            </div>
          </div>
          {showModal && (
            <div className="fixed inset-0 flex  h-full items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="flex flex-col bg-gray-100 justify-between h-[97%] p-4 rounded-lg shadow-lg w-11/12 max-w-5xl">
                <Modal content={content} setContent={setContent} onSave={onSave} />
                <div className="mt-4 text-right">
                  <button
                    onClick={() => setshowModal(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cerrar
                  </button>
                </div>
            </div>
        </div>)}
    </div>)
}