export default function Card({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col w-full justify-center items-center p-4">
        <div className="flex flex-col w-full md:w-[85%] bg-gray-200/60 shadow-xl justify-center border-2 border-sky-500 rounded-3xl p-6">
          {children}
        </div>
      </div>
    );
  }