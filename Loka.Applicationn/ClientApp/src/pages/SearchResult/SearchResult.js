// import { useState } from 'react';
// import { useCookies } from 'react-cookie';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import config from '~/config';
import Carousel from '~/components/Carousel/Carousel';
import styles from './SearchResult.module.scss';

const cx = classNames.bind(styles);

const slides = [
    'https://a0.muscache.com/im/pictures/0f1b8236-d4b4-408c-8cdb-b0314cc8c807.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/3818710f-ffb7-4875-b469-1060bd40e1d8.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/ec0c512f-03ce-47f7-a059-b27270aa3e29.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/6048ad98-6bde-4c5a-bafa-92f33ad952af.jpg?im_w=720',
];

const Pricing = [
    { minPrice: 0, maxPrice: 0 },
    { minPrice: 500000, maxPrice: 1000000 },
    { minPrice: 1000000, maxPrice: 2000000 },
    { minPrice: 3000000, maxPrice: 500000 },
];

// const goongApi_Main = 'pzeMS34X2XDwDPQt4a71xed6q2qFZINhBYXlsJo6';
const goongApi_Rob = 'oC8CNdh20xrH8Dpm0SIkZYQqBijW847QWVmBE0DB';

function SearchResult() {
    const [isHovered, setIsHovered] = useState(false);
    const [posts, setPosts] = useState([]);

    const [resultText, setResultText] = useState('');
    const [latitude, setLatitude] = useState(16.462325713021514);
    const [longitude, setLongitude] = useState(107.61745585099027);

    const { keyword, price, wardID, schoolID } = useParams();

    // Xử lý để lấy latitude, longitude
    useEffect(() => {
        if (!resultText.trim() || keyword === 'empty') {
            return;
        }

        const fetchApi = async () => {
            try {
                const response = await axios.get(`https://rsapi.goong.io/geocode`, {
                    params: {
                        address: resultText,
                        api_key: goongApi_Rob,
                    },
                });

                setLatitude(response.data.results[0].geometry.location.lat);
                setLongitude(response.data.results[0].geometry.location.lng);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApi();
    }, [keyword]);

    useEffect(() => {
        const fetchPosts = async () => {
            console.log(
                keyword,
                longitude,
                latitude,
                Pricing[price].minPrice,
                Pricing[price].maxPrice,
                schoolID,
                wardID,
            );
            const payload = {
                keyword: keyword,
                longitude: longitude,
                latitude: latitude,
                minPrice: Pricing[price].minPrice,
                maxPrice: Pricing[price].maxPrice,
                schoolID: schoolID,
                wardID: wardID,
            };

            // try {
            //     const response = await axios.post('/api-endpoint', payload);
            //     setPosts(response.data);
            // } catch (e) {
            //     console.error('Error fetching data:', e);
            // }
        };
        fetchPosts();
    }, [keyword, price, wardID, schoolID]);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?_limit=8&_page=${page}`);
    //             const data = response.data;

    //             // Update posts state with new data
    //             setPosts((prevPosts) => [...prevPosts, ...data]);

    //             // Check if there are more posts to load
    //             if (data.length === 0) {
    //                 setHasMore(false);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching posts:', error);
    //         }
    //     };

    //     fetchPosts();
    // }, [page]);

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
            <h2 className={cx('mb-[30px]', 'text-[23px]', 'font-medium')}>
                Kết quả tìm kiếm: {keyword !== 'empty' ? keyword : ''}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-14 gap-y-16">
                {posts.map((post, index) => (
                    <Link to={`/detail/${post.id}`} key={index}>
                        <div
                            className={cx('post__item', 'w-auto', 'flex', 'flex-col', 'justify-between', 'rounded-xl', {
                                group: isHovered,
                            })}
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
                                <p className="w-full text-[16px] font-medium ">Đường {post.id}</p>
                                <p className="w-full text-[16px]">Phường {post.userId}</p>
                                <p className="w-full text-[16px]">₫1.000.000 / tháng</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SearchResult;
