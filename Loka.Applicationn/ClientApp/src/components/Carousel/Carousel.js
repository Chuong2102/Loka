import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import classNames from 'classnames/bind';

import styles from './Carousel.module.scss';
const cx = classNames.bind(styles);

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

    // --- Auto slide ---
    // useEffect(() => {
    //     if (!autoSlide) return;
    //     const slideInterval = setInterval(next, autoSlideInterval);
    //     return () => clearInterval(slideInterval);
    // }, []);

    return (
        <div className={cx('overflow-hidden', 'relative', 'rounded-t-xl')}>
            <div
                className={cx('flex', 'transition-transform', 'ease-out', 'duration-500', 'w-full')}
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {slides}
            </div>

            <div className={cx('absolute', 'inset-0', 'flex', 'items-center', 'justify-between', 'p-4')}>
                <button
                    onClick={handlePrevClick}
                    // onClick={prev}
                    className={cx(
                        'p-1',
                        'rounded-full',
                        'shadow',
                        'bg-white/80',
                        'text-gray-800',
                        'block',
                        'xl:hidden',
                        'xl:group-hover:block',
                    )}
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={handleNextClick}
                    // onClick={next}
                    className={cx(
                        'p-1',
                        'rounded-full',
                        'shadow',
                        'bg-white/80',
                        'text-gray-800',
                        'block',
                        'xl:hidden',
                        'xl:group-hover:block',
                    )}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
            <div className={cx('absolute', 'bottom-4', 'right-0', 'left-0')}>
                <div className={cx('flex', 'items-center', 'justify-center', 'gap-2')}>
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={cx('transition-all', 'w-3', 'h-3', 'mx-[1px]', 'bg-white', 'rounded-full', {
                                'p-2': curr === i,
                                'bg-opacity-50': curr !== i,
                            })}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
