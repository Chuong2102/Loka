// import { useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import config from '~/config';
import Carousel from '~/components/Carousel/Carousel';
import styles from './SearchResult.module.scss';
import FacebookMsg from '~/components/FacebookMsg/FacebookMsg';

const cx = classNames.bind(styles);

const slides = [
    'https://a0.muscache.com/im/pictures/0f1b8236-d4b4-408c-8cdb-b0314cc8c807.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/3818710f-ffb7-4875-b469-1060bd40e1d8.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/ec0c512f-03ce-47f7-a059-b27270aa3e29.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/6048ad98-6bde-4c5a-bafa-92f33ad952af.jpg?im_w=720',
];

function SearchResult() {
    const { keyword } = useParams();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
            duration: 4000,
        });
    }, []);

    return (
        <div className={cx('wrapper', 'my-[80px]', 'md:my-[30px]')}>
            <h2 className={cx('mb-[30px]', 'text-[24px]', 'font-medium')}>Kết quả tìm kiếm: {keyword}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-14 gap-y-16">
                <Link to={config.routes.detail}>
                    <div
                        className={cx('post__item', 'w-auto', 'flex', 'flex-col', 'justify-between', 'rounded-xl', {
                            group: isHovered,
                        })}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Carousel autoSlide={true}>
                            {slides.map((slide, index) => (
                                <img key={index} className="rounded-t-xl" src={slide} alt="slide" />
                            ))}
                        </Carousel>
                        <div className={cx('m-[10px]')}>
                            <p className="w-full text-[16px] font-medium ">Đường Nguyễn Huệ</p>
                            <p className="w-full text-[16px]">Phường Vĩnh Ninh</p>
                            <p className="w-full text-[16px]">₫1.000.000 / tháng</p>
                        </div>
                    </div>
                </Link>
                <Link to={config.routes.detail}>
                    <div
                        className={cx('post__item', 'w-auto', 'flex', 'flex-col', 'justify-between', 'rounded-xl', {
                            group: isHovered,
                        })}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Carousel autoSlide={true}>
                            {slides.map((slide, index) => (
                                <img key={index} className="rounded-t-xl" src={slide} alt="slide" />
                            ))}
                        </Carousel>
                        <div className={cx('m-[10px]')}>
                            <p className="w-full text-[16px] font-medium ">Đường Nguyễn Huệ</p>
                            <p className="w-full text-[16px]">Phường Vĩnh Ninh</p>
                            <p className="w-full text-[16px]">₫1.000.000 / tháng</p>
                        </div>
                    </div>
                </Link>
                <Link to={config.routes.detail}>
                    <div
                        className={cx('post__item', 'w-auto', 'flex', 'flex-col', 'justify-between', 'rounded-xl', {
                            group: isHovered,
                        })}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Carousel autoSlide={true}>
                            {slides.map((slide, index) => (
                                <img key={index} className="rounded-t-xl" src={slide} alt="slide" />
                            ))}
                        </Carousel>
                        <div className={cx('m-[10px]')}>
                            <p className="w-full text-[16px] font-medium ">Đường Nguyễn Huệ</p>
                            <p className="w-full text-[16px]">Phường Vĩnh Ninh</p>
                            <p className="w-full text-[16px]">₫1.000.000 / tháng</p>
                        </div>
                    </div>
                </Link>
                <Link to={config.routes.detail}>
                    <div
                        className={cx('post__item', 'w-auto', 'flex', 'flex-col', 'justify-between', 'rounded-xl', {
                            group: isHovered,
                        })}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Carousel autoSlide={true}>
                            {slides.map((slide, index) => (
                                <img key={index} className="rounded-t-xl" src={slide} alt="slide" />
                            ))}
                        </Carousel>
                        <div className={cx('m-[10px]')}>
                            <p className="w-full text-[16px] font-medium ">Đường Nguyễn Huệ</p>
                            <p className="w-full text-[16px]">Phường Vĩnh Ninh</p>
                            <p className="w-full text-[16px]">₫1.000.000 / tháng</p>
                        </div>
                    </div>
                </Link>
                <Link to={config.routes.detail}>
                    <div
                        className={cx('post__item', 'w-auto', 'flex', 'flex-col', 'justify-between', 'rounded-xl', {
                            group: isHovered,
                        })}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Carousel autoSlide={true}>
                            {slides.map((slide, index) => (
                                <img key={index} className="rounded-t-xl" src={slide} alt="slide" />
                            ))}
                        </Carousel>
                        <div className={cx('m-[10px]')}>
                            <p className="w-full text-[16px] font-medium ">Đường Nguyễn Huệ</p>
                            <p className="w-full text-[16px]">Phường Vĩnh Ninh</p>
                            <p className="w-full text-[16px]">₫1.000.000 / tháng</p>
                        </div>
                    </div>
                </Link>
                <Link to={config.routes.detail}>
                    <div
                        className={cx('post__item', 'w-auto', 'flex', 'flex-col', 'justify-between', 'rounded-xl', {
                            group: isHovered,
                        })}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Carousel autoSlide={true}>
                            {slides.map((slide, index) => (
                                <img key={index} className="rounded-t-xl" src={slide} alt="slide" />
                            ))}
                        </Carousel>
                        <div className={cx('m-[10px]')}>
                            <p className="w-full text-[16px] font-medium ">Đường Nguyễn Huệ</p>
                            <p className="w-full text-[16px]">Phường Vĩnh Ninh</p>
                            <p className="w-full text-[16px]">₫1.000.000 / tháng</p>
                        </div>
                    </div>
                </Link>
                <Link to={config.routes.detail}>
                    <div
                        className={cx('post__item', 'w-auto', 'flex', 'flex-col', 'justify-between', 'rounded-xl', {
                            group: isHovered,
                        })}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Carousel autoSlide={true}>
                            {slides.map((slide, index) => (
                                <img key={index} className="rounded-t-xl" src={slide} alt="slide" />
                            ))}
                        </Carousel>
                        <div className={cx('m-[10px]')}>
                            <p className="w-full text-[16px] font-medium ">Đường Nguyễn Huệ</p>
                            <p className="w-full text-[16px]">Phường Vĩnh Ninh</p>
                            <p className="w-full text-[16px]">₫1.000.000 / tháng</p>
                        </div>
                    </div>
                </Link>
                <Link to={config.routes.detail}>
                    <div
                        className={cx('post__item', 'w-auto', 'flex', 'flex-col', 'justify-between', 'rounded-xl', {
                            group: isHovered,
                        })}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Carousel autoSlide={true}>
                            {slides.map((slide, index) => (
                                <img key={index} className="rounded-t-xl" src={slide} alt="slide" />
                            ))}
                        </Carousel>
                        <div className={cx('m-[10px]')}>
                            <p className="w-full text-[16px] font-medium ">Đường Nguyễn Huệ</p>
                            <p className="w-full text-[16px]">Phường Vĩnh Ninh</p>
                            <p className="w-full text-[16px]">₫1.000.000 / tháng</p>
                        </div>
                    </div>
                </Link>
            </div>
            <FacebookMsg />
        </div>
    );
}

export default SearchResult;
