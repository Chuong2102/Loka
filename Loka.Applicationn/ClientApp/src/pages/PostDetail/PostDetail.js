import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import mapboxgl from '@goongmaps/goong-js';
import '@goongmaps/goong-js/dist/goong-js.css';
import { useParams } from 'react-router-dom';

import styles from './PostDetail.module.scss';
import Carousel from './Carousel';
import SuggestedPost from '~/components/SuggestedPost';
import FacebookMsg from '~/components/FacebookMsg/FacebookMsg';

const cx = classNames.bind(styles);

const slides = [
    'https://forum.ngocrongonline.com/app/view/forum/15825212698171.jpg',
];

mapboxgl.accessToken = 'wnicbAmnNkoMHNYUKWnlFHezV189FjmMwkNJ7hKW';

function PostDetail() {
    const [post, setPost] = useState({});
    const [latitude, setLatitude] = useState(16.462325713021514);
    const [longitude, setLongitude] = useState(107.61745585099027);
    const [photos, setPhotos] = useState(slides);

    const { postID } = useParams();

    // Call API lấy POST DETAIL
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:7245/api/Detail?id=${postID}`);
                setPost(response.data);
                setLatitude(response.data.latitude);
                setLongitude(response.data.longitude);
                setPhotos(response.data.images);

                console.log(response.data);
            } catch (e) {
                console.error('Error fetching data:', e);
            }
        };

        fetchData();
    }, [postID]);


    // Map (begin)
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'https://tiles.goong.io/assets/goong_map_web.json',
            center: [longitude, latitude],
            zoom: 18,
        });

        markerRef.current = new mapboxgl.Marker({
            draggable: false,
        })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);

        return () => {
            mapRef.current.remove();
        };
    }, [latitude, longitude]);
    // Map (end)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid', 'grid-cols-1')}>
                <div className={cx('flex', 'items-center', 'justify-center')}>
                    <div className={cx('post__item', 'max-w-[700px]', 'flex', 'flex-col', 'rounded-xl')}>
                        <Carousel autoSlide={true}>
                            {photos.map((slide, index) => (
                                <img
                                    key={index}
                                    className="rounded-xl object-cover w-full h-[220px] md:h-[470px]"
                                    src={slide}
                                    alt="slide"
                                />
                            ))}
                        </Carousel>
                        <div className={cx('mt-[20px]')}>
                            <p className="w-full text-[18px] font-medium my-[10px] leading-20px">Thông tin mô tả: {post.description}</p>
                            <p className="w-full text-[16px] leading-20px" style={{margin: "0px 0px 10px 0px"}}>Địa chỉ: {post.addressLine1}.</p>
                            <p className="w-full text-[16px] leading-20px">
                                Nội thất: Full đồ giống ảnh. Điều hòa, nóng lạnh, giường - tủ quần áo, bàn bếp, tủ lạnh,
                                máy giặt chung, vệ sinh riêng từng phòng, thang máy (diện tích 25 - 30m²).
                            </p>
                            <p className="w-full text-[16px] leading-20px">
                                Dịch vụ: Điện 3,8k / số, nước 90k /người, mạng 100k / phòng.
                            </p>
                            <p className="w-full text-[18px] font-medium my-[10px] leading-20px">Đặc điểm:</p>
                            <p className="w-full text-[16px] leading-20px">Diện tích: 10m²</p>
                            <p className="w-full text-[16px] leading-20px">Giá: {post.price}</p>

                            <p className="w-full text-[18px] font-medium my-[20px] leading-20px">Xem trên bản đồ</p>
                            {/* Map ---*/}
                            <div ref={mapContainerRef} className={cx('map__container', 'shadow-md')} />
                            {/* --- */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="m-auto mt-[80px] w-[222px] md:w-[690px] lg:w-[900px] pb-[20px]">
                <SuggestedPost longitude={longitude} latitude={latitude} />
            </div>
        </div>
    );
}

export default PostDetail;
