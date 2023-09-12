import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import Carousel from '~/components/Carousel/Carousel';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const slides = [
    'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/10/4/1100796/7669B8393f63f83da172.jpg',
    'https://i.vietgiaitri.com/2020/3/23/thue-duoc-phong-tro-gia-re-400kthang-chang-trai-chi-mat-them-100k-de-ho-bien-no-thanh-noi-dang-song-hon-b17-4784405.jpg',
    'https://baoxaydung.com.vn/stores/news_dataimages/hiep/072021/31/09/0745_image006.jpg',
    'https://2sao.vietnamnetjsc.vn/images/2021/07/16/11/21/phong-tro-ban-06.jpg',
];

function Home() {
    const [isHovered, setIsHovered] = useState(false);
    const [posts, setPosts] = useState([]);
    const [files, setFiles] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // Track if there are more posts to load

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`https://localhost:7245/api/GetAllPost?limit=16&page=${page}`);
                const data = response.data;

                console.log(data);
                
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
        <div className={cx('wrapper', 'my-[80px]', 'md:my-[30px]')}>
            <h2 className={cx('mb-[30px]', 'text-[24px]', 'font-medium')}>
                <span className={cx('suggest', 'border-b-2', 'pb-1')}>Mới nhất</span>
            </h2>
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
                                    {post.images.map((slide, index) => (
                                        <img
                                            key={index}
                                            className={cx('rounded-t-xl', 'object-cover', 'w-full')}
                                            src={slide}
                                            alt="slide"
                                        />
                                    ))}
                                </Carousel>
                                <div className={cx('m-[10px]')}>
                                    <p className="w-full text-[16px] font-medium ">Đường {post.addressLine1}</p>
                                    <p className="w-full text-[16px]">Phường {post.wardName}</p>
                                    <p className="w-full text-[16px]">{post.price} / tháng</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default Home;
