import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from './UploadImage.module.scss';

const cx = classNames.bind(styles);

function UploadImage({ onImagesChange, showDropzone = true, images = [] }) {
    const [files, setFiles] = useState([]);
    const inputRef = useRef(null);

    const handleChangeImages = (value) => {
        setFiles(value);
    };


    useEffect(() => {
        if (images.length > 0) {
            const imageFiles = images.map((base64Image, index) => {
                return {
                    name: `image-${index + 1}`,
                    preview: base64Image,
                };
            });

            handleChangeImages(imageFiles);
        } else if (images.length === 0) {
            handleChangeImages([]);
        }
    }, [images]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: async (acceptedFiles) => {
            const fileArray = await Promise.all(
                acceptedFiles.map(async (file) => {
                    const base64 = await convertToBase64(file);
                    return Object.assign(file, {
                        preview: base64,
                    });
                }),
            );
            setFiles(fileArray);
            // setFiles((prevFiles) => [...prevFiles, ...fileArray]);
            onImagesChange(fileArray);
        },
    });

    const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });

    const handleAddImages = async (selectedFiles) => {
        const newImages = await Promise.all(
            Array.from(selectedFiles).map(async (file) => {
                const base64 = await convertToBase64(file);
                return Object.assign(file, {
                    preview: base64,
                });
            }),
        );
        setFiles((prevFiles) => [...prevFiles, ...newImages]);
        onImagesChange([...files, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        onImagesChange(newFiles);
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        const inputElement = inputRef.current;
        inputElement.click();
    };

    const thumbs = files.map((file, index) => (
        <div className={cx('thumb')} key={file.name}>
            <div className={cx('thumb__inner')}>
                <img src={file.preview} className={cx('image')} alt="roomImage" />
                <button className={cx('delete__btn')} onClick={() => handleRemoveImage(index)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>
    ));

    return (
        <section className={cx('container')}>
            {showDropzone && (
                <div className={cx('dropzone')} {...getRootProps()}>
                    <input id="images" {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            )}
            <aside className="flex flex-row flex-wrap mt-10">{thumbs}</aside>
            <div className={cx('add-image', 'mt-[8px]')}>
                <label htmlFor="add-images">
                    <Button className={cx('bg-gray-400', 'hover:opacity-80', 'text-white')} onClick={handleButtonClick}>
                        Thêm ảnh
                    </Button>

                    <input
                        ref={inputRef}
                        id="add-images"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleAddImages(e.target.files)}
                        multiple
                        style={{ display: 'none' }}
                    />
                </label>
            </div>
        </section>
    );
}

UploadImage.propTypes = {
    showDropzone: PropTypes.bool,
    onImagesChange: PropTypes.func,
    images: PropTypes.array,
};

export default UploadImage;


