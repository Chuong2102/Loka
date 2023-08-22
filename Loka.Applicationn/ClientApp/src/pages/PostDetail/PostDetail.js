import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import mapboxgl from '@goongmaps/goong-js';
import '@goongmaps/goong-js/dist/goong-js.css';

import styles from './PostDetail.module.scss';
import Carousel from './Carousel';
import SuggestedPost from '~/components/SuggestedPost';
import FacebookMsg from '~/components/FacebookMsg/FacebookMsg';

const cx = classNames.bind(styles);

const slides = [
    'https://a0.muscache.com/im/pictures/0f1b8236-d4b4-408c-8cdb-b0314cc8c807.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/3818710f-ffb7-4875-b469-1060bd40e1d8.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/ec0c512f-03ce-47f7-a059-b27270aa3e29.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/6048ad98-6bde-4c5a-bafa-92f33ad952af.jpg?im_w=720',
];

mapboxgl.accessToken = 'wnicbAmnNkoMHNYUKWnlFHezV189FjmMwkNJ7hKW';

function PostDetail() {
    const [latitude, setLatitude] = useState(16.462325713021514);
    const [longitude, setLongitude] = useState(107.61745585099027);

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

        // markerRef.current.on('dragend', onDragEnd);

        return () => {
            mapRef.current.remove();
        };
    }, []);
    // Map (end)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid', 'grid-cols-1')}>
                <div className={cx('flex', 'items-center', 'justify-center')}>
                    <div className={cx('post__item', 'max-w-[700px]', 'flex', 'flex-col', 'rounded-xl')}>
                        <Carousel autoSlide={true}>
                            {slides.map((slide, index) => (
                                <img key={index} className="rounded-xl object-cover w-full h-[220px] md:h-[470px]" src={slide} alt="slide" />
                            ))}
                        </Carousel>
                        <div className={cx('mt-[20px]')}>
                            <p className="w-full text-[18px] font-medium my-[10px] leading-20px">Thông tin mô tả:</p>
                            <p className="w-full text-[16px] leading-20px">
                                Địa chỉ: Ngõ 168 Nguyễn Xiển, Thanh Xuân, Hà Nội.
                            </p>
                            <p className="w-full text-[16px] leading-20px">
                                Nội thất: Full đồ giống ảnh. Điều hòa, nóng lạnh, giường - tủ quần áo, bàn bếp, tủ lạnh,
                                máy giặt chung, vệ sinh riêng từng phòng, thang máy (diện tích 25 - 30m²).
                            </p>
                            <p className="w-full text-[16px] leading-20px">
                                Dịch vụ: Điện 3,8k / số, nước 90k /người, mạng 100k / phòng.
                            </p>
                            <p className="w-full text-[18px] font-medium my-[10px] leading-20px">Đặc điểm:</p>
                            <p className="w-full text-[16px] leading-20px">Diện tích: 10m²</p>
                            <p className="w-full text-[16px] leading-20px">Mức giá: 4,9 triệu/tháng</p>

                            <p className="w-full text-[18px] font-medium my-[20px] leading-20px">Xem trên bản đồ</p>
                            {/* Map ---*/}
                            <div ref={mapContainerRef} className={cx('map__container', 'shadow-md')} />
                            {/* --- */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="m-auto mt-[80px] w-[222px] md:w-[690px] lg:w-[900px] pb-[20px]">
                <SuggestedPost />
            </div>
    
        </div>
    );
}

export default PostDetail;
