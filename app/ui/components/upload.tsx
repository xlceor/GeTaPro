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


    return(
        <div>
            <div className="w-3/6 flex justify-center flex-col items-center gap-6 h-full">
                <div className="">Sube un archivo o</div>
                <button className="p-3 bg-blue-400 w-12 h-12 rounded-lg">^</button>
            </div>
            <div className="flex w-2/3 h-full bg-gray-200 text-gray-500 p-3 rounded-lg" onClick={() => setshowModal(!showModal)}>
                <Modal content={content} setContent={setContent} onSave={onSave} />
            
            </div>
        </div>
    )
}