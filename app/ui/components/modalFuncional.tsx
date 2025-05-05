"use client";

import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import CustomTextStyle from "@/app/extensions/CustomTextStyle"; 
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";

import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaList, FaImage, FaQuoteLeft } from "react-icons/fa";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";


import { UseEditorOptions } from "@tiptap/react";
interface TextContent {
  type: string; 
  text: JSONContent;
}

export default function Modal({
  onSave,
  content,
  setContent,
  setShowModal
}: {
  onSave: (newContent: TextContent) => void;
  content: { type: string; text: JSONContent };
  setContent: Dispatch<SetStateAction<{ type: string; text: JSONContent }>>;
  setShowModal:(state:boolean) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomTextStyle as NonNullable<UseEditorOptions["extensions"]>[number],
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      BulletList,
      Placeholder.configure({
        placeholder: "Escribe algo...",
      }),
      Image,
      Underline,
      Strike,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content?.text,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setContent({ type: "text", text: json });
    },
  });

  const fonts = [
    "Arial",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Verdana",
    "Trebuchet MS",
    "Lucida Console",
    "Palatino Linotype",
    "Segoe UI",
    "Tahoma",
    "Impact",
    "Comic Sans MS", // sí, incluso los villanos merecen una oportunidad
    "Roboto",
    "Open Sans",
    "Montserrat",
    "Lato",
    "Noto Sans",
    "Ubuntu",
    "Fira Sans",
    "Source Sans Pro"
  ];

  const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px"];

  const addPage = () => {
    if (!editor) return;
    // Insert a page break as a horizontal rule with a custom class or a hard break with a form feed character
    // Here we insert a custom node with a form feed character as a paragraph
    editor.chain().focus().insertContent({ type: 'paragraph', content: [{ type: 'text', text: '\f' }] }).run();
    // Optionally add a blank paragraph after to start a new page
    editor.chain().insertParagraph().run();
  };

  return (
    <div className="flex items-center justify-center overflow-y-auto w-full h-[100dvh] m-5">
      <div className="rounded-lg bg-gray-200 overflow-auto p-4 w-full h-[95dvh] flex flex-col items-center">
        <div className="flex w-full justify-between mb-4 border border-gray-700">

        {/* Barra de herramientas */}
        <div className="flex flex-wrap gap-2 w-2/4 p-3 border-gray-700 border">
          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <FaBold />
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <FaItalic />
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <FaUnderline />
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <FaStrikethrough />
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            H1
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            H2
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <FaList />
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <FaQuoteLeft/>
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => {
              const url = prompt("URL de la imagen:");
              if (url) {
                editor?.chain().focus().setImage({ src: url }).run();
              }
            }}
          >
            <FaImage />
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          >
            <FaAlignLeft />
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          >
            <FaAlignCenter />
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          >
            <FaAlignRight />
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
          >
            <FaAlignJustify />
          </button>

          <button
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onClick={() => addPage()}
            title="Agregar salto de página"
          >
            <AiOutlineFileAdd />
          </button>

          {/* Selector de Fuente */}
          <select
              className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
              onChange={(e) =>
                editor?.chain().focus().setMark('customTextStyle', { fontFamily: e.target.value }).run()
              }
            >
              <option value="">Fuente</option>
              {fonts.map((font, index) => (
                <option value={font} key={index}>
                  {font}
                </option>
              ))}
            </select>

          {/* Selector de Tamaño */}
          <select
            className="p-2 bg-gray-100 border-gray-700 border rounded hover:bg-gray-300"
            onChange={(e) =>
              editor?.chain().focus().setMark('customTextStyle', { fontSize: e.target.value }).run()
            }
          >
            <option value="">Tamaño</option>
            {fontSizes.map((size, index) => (
              <option value={size} key={index}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className=" w-1/6 h-2/3 justify-center items-center flex gap-3">
          <button
            className="px-4 py-2 bg-blue-500 h-14 text-white rounded hover:bg-blue-600"
            onClick={() => {
              if (editor) {
                onSave({ type: "text", text: editor.getJSON() });
              }
            }}
          >
            Guardar
          </button>
          <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-500 h-14 text-white rounded hover:bg-red-600"
              >
                Cerrar
          </button>
          </div>
        </div>
        <div className="w-[816px] h-[1056px] bg-white p-5 shadow overflow-auto">
          <EditorContent editor={editor} className="prose w-full h-full" />
        </div>
      </div>
    </div>
  );
}