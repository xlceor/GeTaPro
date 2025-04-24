import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

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
    extensions: [StarterKit],
    content: content.text,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setContent({ type: "text", text: json });
    },
  });

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="mb-2 font-semibold text-lg">Editor</h2>
      <div className="mb-4 border rounded p-2">
        <EditorContent editor={editor} />
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => {
          if (editor) {
            onSave({ type: "text", text: editor.getJSON() });
          }
        }}
      >
        Guardar
      </button>
    </div>
  );
}