const Chapter1 = () => {
    return (
        <div className="flex flex-col w-11/12 h-full p-1 items-center min-h-96">
            <div className="flex flex-col w-full h-40 shadow items-center rounded-xl p-5 bg-white">
                <h2 className="text-2xl font-bold">Capítulo 1: El Problema</h2>
                <p className=" text-justify w-full">Cada gran descubrimiento comienza con una pregunta. Y cada pregunta surge de una inquietud, una necesidad o una observación del mundo que nos rodea. En este capítulo, exploraremos el problema central de nuestra investigación, estableciendo las bases para su análisis y solución. </p>
            </div>
            <div className="wrapper grid grid-cols-2 gap-2 p-2 w-full h-max">
                <div className="bg-white shadow h-[16rem] flex p-2 flex-col items-center w-full rounded-xl">
                    <div className=" font-bold text-xl">Planteamiento del Problema</div>
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
                    <div className="font-bold text-xl">Objetivos de Investigacion</div>
                    <div className="font-semibold text-sm p-2 px-4">¿Qué se pretende lograr? Coloca un objetivo general y no mas de 2 especificos</div>
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
                    <div className="font-bold text-xl">Justificacion de la investigacion</div>
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
                    <div className="font-bold text-xl">Hipotesis o supuestos de la Investigacion</div>
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

export default Chapter1;