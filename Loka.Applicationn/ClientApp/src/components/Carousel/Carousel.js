import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

export default function Carousel({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) {
    const [curr, setCurr] = useState(0);

    const prev = () => {
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    };
    const next = () => {
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    };

    const handlePrevClick = (e) => {
        e.preventDefault();
        prev();
    };

    const handleNextClick = (e) => {
        e.preventDefault();
        next();
    };

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, []);

    return (
        <div className="overflow-hidden relative rounded-t-xl">
            <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={handlePrevClick}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hidden group-hover:block"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={handleNextClick}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hidden group-hover:block"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={` transition-all w-3 h-3 bg-white rounded-full
                            ${curr === i ? 'p-2' : 'bg-opacity-50'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
