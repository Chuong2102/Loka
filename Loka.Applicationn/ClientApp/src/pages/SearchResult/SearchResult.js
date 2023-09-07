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

function SearchResult() {
    const [isHovered, setIsHovered] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // Track if there are more posts to load

    const { keyword } = useParams();
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);

    // const price = queryParams.get('price');
    // const uni = queryParams.get('uni');
    // const ward = queryParams.get('ward');

    // console.log(price, uni, ward);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?_limit=8&_page=${page}`);
                const data = response.data;

                // Update posts state with new data
                setPosts((prevPosts) => [...prevPosts, ...data]);

                // Check if there are more posts to load
                if (data.length === 0) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [page]);

    const loadMorePosts = () => {
        setPage((prevPage) => prevPage + 1);
    };

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
            <h2 className={cx('mb-[30px]', 'text-[23px]', 'font-medium')}>Kết quả tìm kiếm: {keyword}</h2>
            <InfiniteScroll
                dataLength={posts.length} // Indicate the number of items
                next={loadMorePosts} // Load more items when scrolling
                hasMore={hasMore} // If there are more items to load
                loader={<h4 classNames={cx('text-center')}>Loading...</h4>} // Loader component
            >
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-14 gap-y-16">
                    {posts.map((post, index) => (
                        <Link to={`/detail/${post.id}`} key={index}>
                            <div
                                className={cx(
                                    'post__item',
                                    'w-auto',
                                    'flex',
                                    'flex-col',
                                    'justify-between',
                                    'rounded-xl',
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
                                    <p className="w-full text-[16px] font-medium ">Đường {post.id}</p>
                                    <p className="w-full text-[16px]">Phường {post.userId}</p>
                                    <p className="w-full text-[16px]">₫1.000.000 / tháng</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </InfiniteScroll>
            
        </div>
    );
}

export default SearchResult;
