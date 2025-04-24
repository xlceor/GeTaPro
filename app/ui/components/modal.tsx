import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';

interface TextContent {
  type: "text";
  text: JSONContent;
}

interface UploadProps {
  content: TextContent;
  setContent: (content: TextContent) => void;
  onSave: (newContent: TextContent) => void;
}

export default function Modal({ content, setContent, onSave }: UploadProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Placeholder.configure({
        placeholder: 'Escribe algo interesante, digno de Stark Industries...',
      }),
    ],
    content: content?.text?.content?.length ? content.text : '',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setContent({ type: "text", text: json });
    },
  });

  return (
    <div className="rounded-lg h-full flex flex-col justify-center  w-full max-w-3xl mx-auto mt-3 relative overflow-hidden">
      <div className=" h-full ">
        <div className=" flex justify-between items-center p-1">
        <h2 className=" text-2xl w-full font-bold text-gray-800 text-center">Editor de Contenido</h2>
                <button
                  className="p-2 text-xl bg-transparent border-2 border-gray-700 text-gray-700 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
                  onClick={() => {
                    if (editor) {
                      onSave({ type: "text", text: editor.getJSON() });
                    }
                  }}
                >
                  Guardar
                </button>
        </div>
        
        {/* Barra de herramientas */}
        <div className=" flex w-full justify-center">
          <div className="flex w-2/3 justify-center bg-gray-200 p-2 space-x-4 mb-2">
            <button
              className="p-3 bg-gray-300 w-1/6 rounded-md text-gray-700 hover:bg-gray-300"
              onClick={() => editor?.chain().focus().toggleBold().run()}
            >
              <strong>B</strong>
            </button>
            <button
              className="p-3 bg-gray-300 w-1/6 rounded-md text-gray-700 hover:bg-gray-300"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
              <em>I</em>
            </button>
            <button
              className="p-3 bg-gray-300 w-1/6 rounded-md text-gray-700 hover:bg-gray-300"
              onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              Título
            </button>
            <button
              className="p-3 bg-gray-300 w-1/6 rounded-md text-gray-700 hover:bg-gray-300"
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              Subtítulo
            </button>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl outline-none shadow-sm h-full">
          <EditorContent editor={editor} className="h-full w-full outline-none" />
        </div>
      </div>
      <style jsx global>{`
        .ProseMirror p.is-empty::before {
          content: attr(data-placeholder);
          float: left;
          color: #a0aec0;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}