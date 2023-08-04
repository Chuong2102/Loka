import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames/bind';

import styles from './UploadImage.module.scss';

const cx = classNames.bind(styles);

function UploadImage({ onImagesChange }) {
    const [files, setFiles] = useState([]);

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

    const thumbs = files.map((file) => (
        <div className={cx('thumb')} key={file.name}>
            <div className={cx('thumb__inner')}>
                <img src={file.preview} className={cx('image')} alt="roomImage" />
            </div>
        </div>
    ));

    return (
        <section className={cx('container')}>
            <div className={cx('dropzone')} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside className="flex flex-row flex-wrap mt-10">{thumbs}</aside>
        </section>
    );
}

export default UploadImage;
