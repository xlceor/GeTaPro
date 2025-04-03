interface ListnumProps {
  mess: Array<{ role: string; content: string }>; // Definir el tipo correctamente
}

export default function Chat({ mess }: ListnumProps) {
  return (
    <div className="flex flex-col w-2/3 gap-2 bg-gray-100 border rounded text-black">
      <div className="">
        {mess.map((msg, index) => (
            <div key={index} className={`p-6 ${msg.role === 'user' ? 'text-end ' : 'text-start bg-gray-300'}`}>
              <div>{msg.role === 'user' && msg.role}</div>
              <div>{msg.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}