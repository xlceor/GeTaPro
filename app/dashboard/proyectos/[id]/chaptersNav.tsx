import React from 'react';

interface CapitulosNavProps {
    setCapitulo: (capitulo: number) => void;
}

const CapitulosNav: React.FC<CapitulosNavProps> = ({ setCapitulo }) => {
    return (
        <div className="flex space-x-4 p-4 bg-gray-200 rounded-md">
            {[1, 2, 3, 4 ].map((id) => (
                <button
                    key={id}
                    onClick={() => setCapitulo(id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Capítulo {id}
                </button>
            ))}
        </div>
    );
};

export default CapitulosNav;