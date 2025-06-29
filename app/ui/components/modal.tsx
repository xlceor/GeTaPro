"use client";

import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from '@tiptap/extension-code-block'
import CustomTextStyle from "@/app/extensions/CustomTextStyle";

import { UseEditorOptions } from "@tiptap/react";


import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaCode, FaQuoteLeft,
  FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaHeading 
} from "react-icons/fa";

import { Dispatch, SetStateAction, useState } from "react";


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
  content: TextContent;
  setContent: Dispatch<SetStateAction<TextContent>>;
  setShowModal:(state:boolean) => void
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [prevContent, setPrevContent] = useState(content);


  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      BulletList,
      CustomTextStyle as NonNullable<UseEditorOptions["extensions"]>[number],
      CodeBlock,
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

  if (!editor) return <p>Cargando editor...</p>;

  const baseBtnClass = "p-2 w-12 flex justify-center items-center border border-gray-700 rounded hover:bg-gray-300";
  const getClass = (isActive: boolean) =>
    `${baseBtnClass} ${isActive ? 'bg-gray-400' : 'bg-gray-100'}`;

  return (
    <div className="flex items-center justify-center relative overflow-y-auto w-full h-[100dvh] m-5">
      <div className="rounded-lg bg-gray-200 relative overflow-auto justify-between p-4 w-full h-[95dvh] flex items-center">
        <div className="flex flex-col absolute w-1/4 h-[97%]  items-center border border-gray-700">
        {/* Barra de herramientas */}
        <div className="flex flex-wrap  gap-2 w-full p-3 border-gray-700 border-b">
                  <button onClick={() => editor.chain().focus().toggleBold().run()} className={getClass(editor.isActive('bold'))}><FaBold /></button>
                  <button onClick={() => editor.chain().focus().toggleItalic().run()} className={getClass(editor.isActive('italic'))}><FaItalic /></button>
                  <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={getClass(editor.isActive('underline'))}><FaUnderline /></button>
                  <button onClick={() => editor.chain().focus().toggleStrike().run()} className={getClass(editor.isActive('strike'))}><FaStrikethrough /></button>
                  <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={getClass(editor.isActive('codeBlock'))}><FaCode /></button>
                  <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={getClass(editor.isActive('blockquote'))}><FaQuoteLeft /></button>
                  <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={getClass(editor.isActive('bulletList'))}><FaListUl /></button>
                  <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={getClass(editor.isActive('orderedList'))}><FaListOl /></button>
                  <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={getClass(editor.isActive({ textAlign: 'left' }))}><FaAlignLeft /></button>
                  <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={getClass(editor.isActive({ textAlign: 'center' }))}><FaAlignCenter /></button>
                  <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={getClass(editor.isActive({ textAlign: 'right' }))}><FaAlignRight /></button>
                  <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={getClass(editor.isActive('heading', { level: 1 }))}><FaHeading /> 1</button>
                  <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={getClass(editor.isActive('heading', { level: 2 }))}><FaHeading /> 2</button>
                  <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={getClass(editor.isActive('heading', { level: 3 }))}><FaHeading /> 3</button>
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
        <div className=" p-10 w-1/6 justify-center items-center flex md:flex-row flex-col gap-3">
          <button
            title="Guardar"
            disabled={!editor}
            className="px-4 py-2 bg-blue-500 h-14 text-white rounded hover:bg-blue-600"
            onClick={() => {
              if (editor) {
                onSave({ type: "text", text: editor.getJSON() });
                setPrevContent(content)
                setShowModal(false)
              }
            }}
          >
            Guardar
          </button>
          <button
                title="Cerrar"
                onClick={() => {
                  if(content != prevContent){
                    setShowConfirmModal(true)
                  } else {
                    setShowModal(false)
                  }
                }}
                className="px-4 py-2 bg-red-500 h-14 text-white rounded hover:bg-red-600"
              >
                Cerrar
          </button>
          </div>
        </div>
        <div className="w-2/4"></div>
        <div className="w-full  overflow-scroll h-full px-10 flex p-5 justify-center">
          <div className="w-full h-full">
          <EditorContent editor={editor} className="prose w-full h-full editor-content" />
          </div>
        </div>
      </div>
      {showConfirmModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">¿Está seguro de salir?</h2>
                <p className="mb-6 text-sm text-gray-600">
                  Tiene cambios sin guardar. ¿Desea guardar antes de salir?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => {
                      onSave({ type: "text", text: editor.getJSON() });
                      setPrevContent(content)
                      setShowModal(false); // Cierra el modal principal después de guardar
                      setShowConfirmModal(false); // Cierra este modal
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => {
                      setShowModal(false); // Cierra el modal principal sin guardar
                      setShowConfirmModal(false); // Cierra este modal
                    }}
                  >
                    Salir sin guardar
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
    
  );
}
/*"use client";

import { EditorContent, useEditor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from '@tiptap/extension-code-block'
import CustomTextStyle from "@/app/extensions/CustomTextStyle";
import { useUser } from "@/app/hooks/useLogged";

import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

import { UseEditorOptions } from "@tiptap/react";


import { 
  FaBold, FaItalic, FaUnderline, FaStrikethrough, FaCode, FaQuoteLeft,
  FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaHeading 
} from "react-icons/fa";

import { Dispatch, SetStateAction, useState } from "react";


interface TextContent {
  type: string; 
  text: JSONContent;
}


export default function Modal({
  onSave,
  content,
  setContent,
  setShowModal,
  sectionKey
}: {
  onSave: (newContent: TextContent) => void;
  content: TextContent;
  setContent: Dispatch<SetStateAction<TextContent>>;
  setShowModal:(state:boolean) => void;
  sectionKey: string;
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [prevContent, setPrevContent] = useState(content);

  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider('wss://yjs-server.com', sectionKey, ydoc); // puede usar id del capítulo o subcampo

  const {user} = useUser();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: user?.username,
          color: '#ffa500',
        },
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      BulletList,
      CustomTextStyle as NonNullable<UseEditorOptions["extensions"]>[number],
      CodeBlock,
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

  if (!editor) return <p>Cargando editor...</p>;

  const baseBtnClass = "p-2 w-12 flex justify-center items-center border border-gray-700 rounded hover:bg-gray-300";
  const getClass = (isActive: boolean) =>
    `${baseBtnClass} ${isActive ? 'bg-gray-400' : 'bg-gray-100'}`;

  return (
    <div className="flex items-center justify-center relative overflow-y-auto w-full h-[100dvh] m-5">
      <div className="rounded-lg bg-gray-200 relative overflow-auto justify-between p-4 w-full h-[95dvh] flex items-center">
        <div className="flex flex-col absolute w-1/4 h-[97%]  items-center border border-gray-700">
        {/* Barra de herramientas 
        <div className="flex flex-wrap  gap-2 w-full p-3 border-gray-700 border-b">
                  <button onClick={() => editor.chain().focus().toggleBold().run()} className={getClass(editor.isActive('bold'))}><FaBold /></button>
                  <button onClick={() => editor.chain().focus().toggleItalic().run()} className={getClass(editor.isActive('italic'))}><FaItalic /></button>
                  <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={getClass(editor.isActive('underline'))}><FaUnderline /></button>
                  <button onClick={() => editor.chain().focus().toggleStrike().run()} className={getClass(editor.isActive('strike'))}><FaStrikethrough /></button>
                  <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={getClass(editor.isActive('codeBlock'))}><FaCode /></button>
                  <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={getClass(editor.isActive('blockquote'))}><FaQuoteLeft /></button>
                  <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={getClass(editor.isActive('bulletList'))}><FaListUl /></button>
                  <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={getClass(editor.isActive('orderedList'))}><FaListOl /></button>
                  <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={getClass(editor.isActive({ textAlign: 'left' }))}><FaAlignLeft /></button>
                  <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={getClass(editor.isActive({ textAlign: 'center' }))}><FaAlignCenter /></button>
                  <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={getClass(editor.isActive({ textAlign: 'right' }))}><FaAlignRight /></button>
                  <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={getClass(editor.isActive('heading', { level: 1 }))}><FaHeading /> 1</button>
                  <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={getClass(editor.isActive('heading', { level: 2 }))}><FaHeading /> 2</button>
                  <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={getClass(editor.isActive('heading', { level: 3 }))}><FaHeading /> 3</button>
          {/* Selector de Fuente 
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

          {/* Selector de Tamaño
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
        <div className=" p-10 w-1/6 justify-center items-center flex md:flex-row flex-col gap-3">
          <button
            title="Guardar"
            disabled={!editor}
            className="px-4 py-2 bg-blue-500 h-14 text-white rounded hover:bg-blue-600"
            onClick={() => {
              if (editor) {
                onSave({ type: "text", text: editor.getJSON() });
                setPrevContent(content)
                setShowModal(false)
              }
            }}
          >
            Guardar
          </button>
          <button
                title="Cerrar"
                onClick={() => {
                  if(content != prevContent){
                    setShowConfirmModal(true)
                  } else {
                    setShowModal(false)
                  }
                }}
                className="px-4 py-2 bg-red-500 h-14 text-white rounded hover:bg-red-600"
              >
                Cerrar
          </button>
          </div>
        </div>
        <div className="w-2/4"></div>
        <div className="w-full  overflow-scroll h-full px-10 flex p-5 justify-center">
          <div className="w-full h-full">
          <EditorContent editor={editor} className="prose w-full h-full editor-content" />
          </div>
        </div>
      </div>
      {showConfirmModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">¿Está seguro de salir?</h2>
                <p className="mb-6 text-sm text-gray-600">
                  Tiene cambios sin guardar. ¿Desea guardar antes de salir?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => {
                      onSave({ type: "text", text: editor.getJSON() });
                      setPrevContent(content)
                      setShowModal(false); // Cierra el modal principal después de guardar
                      setShowConfirmModal(false); // Cierra este modal
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => {
                      setShowModal(false); // Cierra el modal principal sin guardar
                      setShowConfirmModal(false); // Cierra este modal
                    }}
                  >
                    Salir sin guardar
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
    
  );
}
*/