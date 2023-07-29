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

const cx = classNames.bind(styles);

const slides = [
    'https://a0.muscache.com/im/pictures/0f1b8236-d4b4-408c-8cdb-b0314cc8c807.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/3818710f-ffb7-4875-b469-1060bd40e1d8.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/ec0c512f-03ce-47f7-a059-b27270aa3e29.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/6048ad98-6bde-4c5a-bafa-92f33ad952af.jpg?im_w=720',
];

function Home() {
    const [isHovered, setIsHovered] = useState(false);
    const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     fetch(`http://localhost:5001/api/Post`)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             // setPosts(res.data);
    //             console.log(res)
    //         })
    //         .catch((error) => {
    //             console.log('Error:', error);
    //         });
    //   }, []);

    useEffect(() => {
        axios
            .get('http://localhost:46579/api/Post')
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
            });
    }, []);

    return (
        <div className={cx('wrapper', 'my-[100px]')}>
            <div className="grid grid-cols-4 gap-x-14 gap-y-16">
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
        </div>
    );
}

export default Home;
