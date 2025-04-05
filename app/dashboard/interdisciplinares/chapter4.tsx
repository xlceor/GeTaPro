const Chapter4 = () => {
    return (
        <div className="flex flex-col w-11/12 p-1 h-full items-center min-h-96">
            <div className="flex flex-col w-full items-center h-40 rounded-xl p-5 bg-white">
                <h2 className="text-2xl font-bold">Capítulo 4: Análisis e Interpretación de Resultados</h2>
                <p className=" text-justify">Los datos sin interpretación son solo números y palabras. En este capítulo, transformamos la información en conocimiento, dándole sentido a nuestros hallazgos.</p>
            </div>
            <div className="wrapper grid grid-cols-2 gap-2 p-2 w-full h-full">
            <div className="bg-white shadow h-[16rem] flex p-2 flex-col items-center w-full rounded-xl">
                    <div className="font-bold text-xl">Conclusion</div>
                    <div className="font-semibold text-sm p-2 px-4">¿Por qué es relevante esta investigación?</div>
                    <div className="flex w-full justify-around h-full">
                        <div className="w-3/6 flex justify-center flex-col items-center gap-6 h-full">
                            <div className="">Sube un archivo o</div>
                            <button className="p-3 bg-blue-400 w-12 h-12 rounded-lg">^</button>
                        </div>
                        <div className="flex w-2/3 h-full bg-gray-200 text-gray-500 p-3 rounded-lg">
                        Escribe algo...
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow h-[16rem] flex p-2 flex-col items-center w-full rounded-xl">
                    <div className="font-bold text-xl">Recomendaciones</div>
                    <div className="font-semibold text-sm p-2 px-4">¿Por qué es relevante esta investigación?</div>
                    <div className="flex w-full justify-around h-full">
                        <div className="w-3/6 flex justify-center flex-col items-center gap-6 h-full">
                            <div className="">Sube un archivo o</div>
                            <button className="p-3 bg-blue-400 w-12 h-12 rounded-lg">^</button>
                        </div>
                        <div className="flex w-2/3 h-full bg-gray-200 text-gray-500 p-3 rounded-lg">
                        Escribe algo...
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow h-[16rem] flex p-2 flex-col items-center w-full rounded-xl">
                    <div className="font-bold text-xl">Bibliografia</div>
                    <div className="font-semibold text-sm p-2 px-4">¿Por qué es relevante esta investigación?</div>
                    <div className="flex w-full justify-around h-full">
                        <div className="w-3/6 flex justify-center flex-col items-center gap-6 h-full">
                            <div className="">Sube un archivo o</div>
                            <button className="p-3 bg-blue-400 w-12 h-12 rounded-lg">^</button>
                        </div>
                        <div className="flex w-2/3 h-full bg-gray-200 text-gray-500 p-3 rounded-lg">
                        Escribe algo...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chapter4;