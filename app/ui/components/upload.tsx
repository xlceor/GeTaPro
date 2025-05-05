"use client";
import { useState } from "react";
import Modal from "./modal";
import { JSONContent } from "@tiptap/react";
import ReactMarkdown from "react-markdown";

function getTextFromJSONContent(json: JSONContent): string {
  if (!json) return "";

  let text = "";

  if (json.type === "text" && typeof json.text === "string") {
    text += json.text;
  }

  if (Array.isArray(json.content)) {
    for (const node of json.content) {
      text += getTextFromJSONContent(node);
    }
  }

  // Agrega salto de línea después de bloques y aplica formato especial a headings
  if (json.type === "heading") {
    text = "\n\n**" + text.toUpperCase() + "**\n";
  } else if (["paragraph", "blockquote"].includes(json.type || "")) {
    text += "\n";
  }

  return text;
}

interface TextContent {
  type: string; 
  text: JSONContent;
}

interface UploadProps {
  content: TextContent;
  setContent: (content: TextContent) => void;
  onSave: (newContent: TextContent) => void;
}

export default function Upload({ content, setContent, onSave}: UploadProps) {
  const [showModal, setShowModal] = useState(false);

  const plainText = getTextFromJSONContent(content.text);
  const previewText = plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText;

  return (
    <div className="flex w-full gap-4 h-full">
      <div
        className="w-full h-full bg-gray-200 text-gray-500 p-3 rounded-lg overflow-auto cursor-pointer"
        onClick={() => setShowModal(!showModal)}
      >
        <div className="h-full flex items-center justify-center text-center whitespace-pre-wrap font-mono">


          <ReactMarkdown>
              {previewText || "Haz clic aquí para editar el contenido"}
          </ReactMarkdown>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 z-50">
            <Modal content={content} setContent={setContent} onSave={onSave} setShowModal={setShowModal} />
        </div>
      )}
    </div>
  );
}