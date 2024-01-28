import Slider from 'react-slick';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './SuggestedPost.module.scss';
import config from '~/config';
import Carousel from '../Carousel/Carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cx = classNames.bind(styles);

const slides = [
    'https://a0.muscache.com/im/pictures/0f1b8236-d4b4-408c-8cdb-b0314cc8c807.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/3818710f-ffb7-4875-b469-1060bd40e1d8.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/ec0c512f-03ce-47f7-a059-b27270aa3e29.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/6048ad98-6bde-4c5a-bafa-92f33ad952af.jpg?im_w=720',
];

function SuggestedPost({ longitude, latitude, data, ...passProps }) {
    const [posts, setPosts] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    // Tét: Dùng cái ở dưới nha <3 <3 luv
    //useEffect(() => {
    //    const fetchPosts = async () => {
    //        try {
    //            const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?_limit=8&_page=1}`);
    //            const data = response.data;
    //            setPosts(data);
    //        } catch (error) {
    //            console.error('Error fetching posts:', error);
    //        }
    //    };

    //    fetchPosts();
    //}, []);

     useEffect(() => {
         const fetchSuggestedPosts = async () => {
             console.log(
                 longitude,
                 latitude,
             );

             const payload = {
                 longitude: longitude,
                 latitude: latitude,
             };

     try {
         const response = await axios.post(`https://localhost:7245/api/SuggestRoom/${longitude}&${latitude}`);
         setPosts(response.data);
     } catch (e) {
         console.error('Error fetching data:', e);
     }
     };
         fetchSuggestedPosts();
     }, [longitude, latitude]);

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    background: 'gray',
                    paddingRight: '10px',
                    paddingTop: '1.85px',
                    borderRadius: '50%',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    transform: 'scale(1.2)',
                    marginLeft: '10px',
                    marginTop: '-20px',
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    background: 'gray',
                    paddingRight: '1px',
                    paddingTop: '1.85px',
                    borderRadius: '50%',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    transform: 'scale(1.2)',
                    marginRight: '20px',
                    marginTop: '-20px',
                }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                },
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                },
            },
        ],
    };
    return (
        <div>
            <h2
                className={cx(
                    'ml-[6px]',
                    'mb-[30px]',
                    'text-[24px]',
                    'font-medium',
                    'text-center',
                    'md:text-left',
                    'lg:text-left',
                )}
            >
                <span className={cx('border-b-2', 'suggest', 'pb-1')}>Đề xuất</span>
            </h2>
            <Slider {...settings}>
                {posts.map((post, index) => (
                    <Link to={`/detail/${post.roomID}`} key={index}>
                        <div
                            className={cx(
                                'post__item',
                                'w-[210px]',
                                'flex',
                                'flex-col',
                                'justify-between',
                                'rounded-xl',
                                'ml-[7px]',
                                {
                                    group: isHovered,
                                },
                            )}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <Carousel autoSlide={true}>
                                {slides.map((slide, index) => (
                                    <img
                                        key={index}
                                        className={cx('rounded-t-xl', 'object-cover', 'w-full')}
                                        src={slide}
                                        alt="slide"
                                    />
                                ))}
                            </Carousel>
                            <div className={cx('m-[10px]')}>
                                <p className="w-full text-[13px] font-medium">Đường{post.addressLine1}</p>
                                <p className="w-full text-[13px]">Phường {post.wardName}</p>
                                <p className="w-full text-[13px]">{post.price} / tháng</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
}

SuggestedPost.propTypes = {};

export default SuggestedPost;
