import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import Carousel from '~/components/Carousel/Carousel';
import Button from '~/components/Button';
import { CssSyntaxError } from 'postcss';
import FacebookMsg from '~/components/FacebookMsg/FacebookMsg';

const cx = classNames.bind(styles);

const slides = [
    'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/10/4/1100796/7669B8393f63f83da172.jpg',
    'https://i.vietgiaitri.com/2020/3/23/thue-duoc-phong-tro-gia-re-400kthang-chang-trai-chi-mat-them-100k-de-ho-bien-no-thanh-noi-dang-song-hon-b17-4784405.jpg',
    'https://baoxaydung.com.vn/stores/news_dataimages/hiep/072021/31/09/0745_image006.jpg',
    'https://2sao.vietnamnetjsc.vn/images/2021/07/16/11/21/phong-tro-ban-06.jpg',
];

function Home() {
    const [isHovered, setIsHovered] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://localhost:7245/api/Post', {
    //                 headers: {
    //                     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //                 },
    //                 mode: 'cors',
    //             });
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <div className={cx('wrapper')}>
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
            <FacebookMsg/>
        </div>
    );
}

export default Home;
