import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import mapboxgl from '@goongmaps/goong-js';
import '@goongmaps/goong-js/dist/goong-js.css';

import styles from './Room.module.scss';
import Button from '~/components/Button';
import Search from '~/layouts/components/Search';
import UploadImage from '~/components/UploadImage';
import ToastMessage from '~/components/ToastMessage';

const cx = classNames.bind(styles);

// const goongApi_Main = 'pzeMS34X2XDwDPQt4a71xed6q2qFZINhBYXlsJo6';
const goongApi_Rob = 'oC8CNdh20xrH8Dpm0SIkZYQqBijW847QWVmBE0DB';
mapboxgl.accessToken = 'wnicbAmnNkoMHNYUKWnlFHezV189FjmMwkNJ7hKW';

function Room() {
    const confirmationRef = useRef(null);

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [ward, setWard] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [placeId, setPlaceId] = useState('');

    const [latitude, setLatitude] = useState(16.462325713021514);
    const [longitude, setLongitude] = useState(107.61745585099027);

    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');

    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarMessage = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
    };

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
            draggable: true,
        })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);

        markerRef.current.on('dragend', onDragEnd);

        return () => {
            mapRef.current.remove();
        };
    }, []);

    function onDragEnd() {
        const lngLat = markerRef.current.getLngLat();
        setLatitude(lngLat.lat);
        setLongitude(lngLat.lng);
    }

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.setLngLat([longitude, latitude]);
            mapRef.current.flyTo({ center: [longitude, latitude] });
        }
    }, [latitude, longitude]);
    // Map (end)

    // Xử lý placeId để lấy latitude, longitude
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
                setLongitude(response.data.result.geometry.location.lng);
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

        // window.scrollTo({
        //     top: confirmationRef.current.offsetTop - 100,
        //     behavior: 'smooth',
        // });
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

    const handleLongitudeChange = (e) => {
        setLongitude(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleAreaChange = (e) => {
        const inputValue = e.target.value;
        const numericInputValue = inputValue.replace(/[^0-9]/g, '');
        setArea(numericInputValue);
    };

    const handlePriceChange = (e) => {
        const inputValue = e.target.value;
        const numericInputValue = inputValue.replace(/[^0-9]/g, '');
        setPrice(numericInputValue);
    };

    const handleImagesChange = (imageFiles) => {
        const base64Images = imageFiles.map((file) => file.preview);
        setImages(base64Images);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const resetForm = () => {
        setAddressLine1('');
        setAddressLine2('');
        setWard('');
        setCity('');
        setProvince('');
        setPlaceId('');
        setLatitude('');
        setLongitude('');
        setDescription('');
        setArea('');
        setPrice('');
        setTitle('');
    };

    // Trả về BE
    const handleSave = (e) => {
        e.preventDefault();

        if (images.length === 0) {
            handleSnackbarMessage('Cần thêm ảnh!', 'warning');
            return;
        }

        const payload = {
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            wardName: ward,
            city: city,
            province: province,
            placeID: placeId,
            latitude: latitude,
            longitude: longitude,
            description: description,
            area: area,
            price: price,
            images: images,
            title: title,
        };

        console.log(payload);

        axios
            .post('https://localhost:7245/api/AddPost', payload)
            .then((response) => {
                console.log(response.data);
                resetForm();
                setImages([]);
                handleSnackbarMessage('Thêm thành công!', 'success');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('flex', 'justify-center')}>
                <Search onSearchItemClick={handleSearchItemClick} />
            </div>

            {/* Map ---*/}
            <div ref={mapContainerRef} className={cx('map__container', 'shadow-md')} />
            {/* --- */}

            <div ref={confirmationRef} className={cx('w-[700px]', 'm-auto', 'mt-[40px]')}>
                <h3 className={cx('pt-[20px]', 'pb-[10px]', 'font-semibold', 'text-black', 'text-[30px]')}>
                    Xác nhận địa chỉ
                </h3>
                <form onSubmit={handleSave} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="addressLine1">
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
                            required
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="addressLine2">
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
                            required
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="ward">
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
                            required
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="city">
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
                            required
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="province">
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
                            required
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="placeId">
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
                            // onChange={handlePlaceIdChange}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="latitude">
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
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="longitude">
                            longitude
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
                            id="longitude"
                            type="text"
                            placeholder="Enter longitude"
                            autoComplete="off"
                            value={longitude}
                            onChange={handleLongitudeChange}
                            required
                            readOnly
                        />
                    </div>
                    <h3 className={cx('pt-[20px]', 'pb-[10px]', 'font-semibold', 'text-rose-600', 'text-[26px]')}>
                        Room
                    </h3>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="description">
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
                            required
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="area">
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
                            required
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="price">
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
                            required
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="images">
                            Images
                        </label>
                        <UploadImage onImagesChange={handleImagesChange} images={images} />
                    </div>
                    <h3 className={cx('pt-[20px]', 'pb-[10px]', 'font-semibold', 'text-rose-600', 'text-[26px]')}>
                        Post
                    </h3>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="title">
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
                            required
                        />
                    </div>
                    <div className="flex justify-center mt-[16px]">
                        <Button className={cx('bg-blue-500', 'hover:opacity-80', 'text-white')} type="submit">
                            Save
                        </Button>
                        <ToastMessage snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Room;
