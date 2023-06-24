import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

export default function Carousel({ children: slides }) {
    const [curr, setCurr] = useState(0);

    const prev = () => {
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    };
    const next = () => {
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    };

    return (
        <div className="flex items-center justify-center">
            <div className="overflow-hidden relative rounded-xl">
                <div
                    className="flex transition-transform ease-out duration-500"
                    style={{ transform: `translateX(-${curr * 100}%)` }}
                >
                    {slides}
                </div>
                <div className="absolute inset-0 flex items-center justify-between p-4">
                    <button onClick={prev} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
                        <ChevronLeft size={34} />
                    </button>
                    <button onClick={next} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
                        <ChevronRight size={34} />
                    </button>
                </div>
                <div className="absolute bottom-8 right-0 left-0">
                    <div className="flex items-center justify-center gap-2">
                        {slides.map((_, i) => (
                            <div
                                className={` transition-all w-3 h-3 bg-white rounded-full
                            ${curr === i ? 'p-2' : 'bg-opacity-50'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
