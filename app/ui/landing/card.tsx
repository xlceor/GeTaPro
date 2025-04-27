



export default function Card ({ children }: { children: React.ReactNode }) {
    return(
        <div className="flex flex-col h-dvh w-full justify-center items-center">
            <div className="flex w-[85%] h-[76%] bg-gray-200/70 shadow-xl  justify-center border-2 border-sky-500 rounded-3xl">
                {children}
            </div>
        </div>
    )
}