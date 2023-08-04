import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import styles from './Room.module.scss';
import Button from '~/components/Button';
import Search from '~/layouts/components/Search';
import UploadImage from '~/components/UploadImage';

const cx = classNames.bind(styles);

// const goongApi_Main = 'pzeMS34X2XDwDPQt4a71xed6q2qFZINhBYXlsJo6';
const goongApi_Rob = 'oC8CNdh20xrH8Dpm0SIkZYQqBijW847QWVmBE0DB';

function Room() {
    const confirmationRef = useRef(null);

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [ward, setWard] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [placeId, setPlaceId] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longtitude, setLongtitude] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');

    // Xử lý placeId để lấy latitude, longtitude
    useEffect(() => {
        if (!placeId.trim()) {
            return;
        }

        const fetchApi = async () => {
            try {
                const response = await axios.get(`https://rsapi.goong.io/Place/Detail`, {
                    params: {
                        place_id: placeId,
                        api_key: goongApi_Rob,
                    },
                });

                setLatitude(response.data.result.geometry.location.lat);
                setLongtitude(response.data.result.geometry.location.lng);
            } catch (error) {
                console.error(error);
            }
        };

        fetchApi();
    }, [placeId]);

    const handleSearchItemClick = (result) => {
        setAddressLine1(result.structured_formatting.main_text);
        setAddressLine2(result.structured_formatting.secondary_text);
        setWard(result.compound.commune);
        setCity(result.compound.district);
        setProvince(result.compound.province);
        setPlaceId(result.place_id);

        window.scrollTo({
            top: confirmationRef.current.offsetTop - 100,
            behavior: 'smooth',
        });
    };

    const handleAddressLine1Change = (e) => {
        setAddressLine1(e.target.value);
    };

    const handleAddressLine2Change = (e) => {
        setAddressLine2(e.target.value);
    };

    const handleWardChange = (e) => {
        setWard(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleProvinceChange = (e) => {
        setProvince(e.target.value);
    };

    const handlePlaceIdChange = (e) => {
        setPlaceId(e.target.value);
    };

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleLongtitudeChange = (e) => {
        setLongtitude(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleAreaChange = (e) => {
        setArea(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleImagesChange = (imageFiles) => {
        const base64Images = imageFiles.map((file) => file.preview);
        setImages(base64Images);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Trả về BE
    const handleSave = (e) => {
        e.preventDefault();

        const payload = {
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            ward: ward,
            city: city,
            province: province,
            placeId: placeId,
            latitude: latitude,
            longtitude: longtitude,
            description: description,
            area: area,
            price: price,
            images: images,
            title: title,
        };

        console.log(payload);

        // axios
        //     .post('api/AddPost', payload)
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('ml-[20px]', 'flex', 'justify-center')}>
                <Search onSearchItemClick={handleSearchItemClick} />
            </div>
            <div ref={confirmationRef} className={cx('w-[700px]', 'm-auto')}>
                <h3 className={cx('pt-[20px]', 'pb-[10px]', 'font-semibold', 'text-black', 'text-[30px]')}>
                    Xác nhận địa chỉ
                </h3>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="name">
                            AddressLine1
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="addressLine1"
                            type="text"
                            placeholder="Enter AddressLine1"
                            autoComplete="off"
                            value={addressLine1}
                            onChange={handleAddressLine1Change}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            AddressLine2
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="addressLine2"
                            type="text"
                            placeholder="Enter AddressLine2"
                            autoComplete="off"
                            value={addressLine2}
                            onChange={handleAddressLine2Change}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Ward
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="ward"
                            type="text"
                            placeholder="Enter Ward"
                            autoComplete="off"
                            value={ward}
                            onChange={handleWardChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            City / District
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="city"
                            type="text"
                            placeholder="Enter City"
                            autoComplete="off"
                            value={city}
                            onChange={handleCityChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Province
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="province"
                            type="text"
                            placeholder="Enter Province"
                            autoComplete="off"
                            value={province}
                            onChange={handleProvinceChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Place ID
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="placeId"
                            type="text"
                            placeholder="Enter PlaceId"
                            autoComplete="off"
                            value={placeId}
                            onChange={handlePlaceIdChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Latitude
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="latitude"
                            type="text"
                            placeholder="Enter Latitude"
                            autoComplete="off"
                            value={latitude}
                            onChange={handleLatitudeChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Longtitude
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="longtitude"
                            type="text"
                            placeholder="Enter Longtitude"
                            autoComplete="off"
                            value={longtitude}
                            onChange={handleLongtitudeChange}
                        />
                    </div>
                    <h3 className={cx('pt-[20px]', 'pb-[10px]', 'font-semibold', 'text-rose-600', 'text-[26px]')}>
                        Room
                    </h3>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Description
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="description"
                            type="text"
                            placeholder="Enter Description"
                            autoComplete="off"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Area
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="area"
                            type="text"
                            placeholder="Enter Area"
                            autoComplete="off"
                            value={area}
                            onChange={handleAreaChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Price
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="price"
                            type="text"
                            placeholder="Enter Price"
                            autoComplete="off"
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Images
                        </label>
                        <UploadImage onImagesChange={handleImagesChange} />
                    </div>
                    <h3 className={cx('pt-[20px]', 'pb-[10px]', 'font-semibold', 'text-rose-600', 'text-[26px]')}>
                        Post
                    </h3>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Title
                        </label>
                        <input
                            className={cx(
                                'shadow',
                                'appearance-none',
                                'border',
                                'rounded',
                                'w-full',
                                'py-3',
                                'px-3',
                                'text-gray-700',
                                'leading-tight',
                            )}
                            id="title"
                            type="text"
                            placeholder="Enter Title"
                            autoComplete="off"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="flex justify-center mt-[16px]">
                        <Button className={cx('bg-blue-500', 'hover:opacity-80', 'text-white')} onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Room;
