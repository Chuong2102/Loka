import axios from 'axios';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';

import styles from './Post.module.scss';
import Button from '~/components/Button';
import UploadImage from '~/components/UploadImage';
import ToastMessage from '~/components/ToastMessage';

const cx = classNames.bind(styles);

function Post() {
    const [buttonState, setButtonState] = useState(1);

    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 10;

    const [postId, setPostId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [addressLine1, setAddressLine1] = useState('');

    const [posts, setPosts] = useState([]);

    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarMessage = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
    };

    // Call API GET POST <3
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://localhost:7245/api/GetAllPostAdmin');
                const data = response.data;

                setPosts(data);
                //
                console.log(data);
                console.log(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            handleSnackbarMessage('Cần thêm ảnh!', 'warning');
            return;
        }

        const newPost = {
            title: title,
            description: description,
            images: images,
        };
        // console.log(newPost);

        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
            const addedPost = response.data;
            setPosts([...posts, addedPost]);

            resetForm();
            setImages([]);
            handleSnackbarMessage('Thêm thành công!', 'success');
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            handleSnackbarMessage('Cần thêm ảnh!', 'warning');
            return;
        }
        
        const updatedPost = {
            postId: postId,
            roomId: roomId,
            title: title,
            description: description,
            images: images,
            addressLine1: addressLine1
        };

        // console.log(updatedPost);
        
        // Call API Update posts
        try {
            const response = await axios.put(`https://localhost:7245/api/UpdatePost/`, updatedPost);
            const updatedPostData = response.data;

            console.log(updatedPostData);

            const updatedPosts = posts.map((post) => {
                if (post.postID === postId) {
                    return updatedPostData;
                }
                return post;
            });

            setPosts(updatedPosts);
          
            resetForm();
            setImages([]);
            handleSnackbarMessage('Sửa thành công!', 'success');
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDelete = async (e, postId) => {
        e.preventDefault();
        const confirmation = window.confirm('Bạn có chắc chắn muốn xóa?');
        if (confirmation) {
            // console.log(postId);
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const updatedPosts = posts.filter((post) => post.id !== postId);
                setPosts(updatedPosts);

                resetForm();
                setImages([]);
                handleSnackbarMessage('Xóa thành công!', 'success');
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (buttonState === 1) {
            await handleAdd(e);
        }
        if (buttonState === 2) {
            await handleUpdate(e);
        }
        if (buttonState === 3) {
            await handleDelete(e, postId);
        }
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const resetForm = () => {
        setPostId('');
        setRoomId('');
        setTitle('');
        setDescription('');
    };

    const handlePostIdChange = (e) => {
        setPostId(e.target.value);
    };

    const handleRoomIdChange = (e) => {
        setRoomId(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImagesChange = (imageFiles) => {
        const base64Images = imageFiles.map((file) => {
            return file.preview;
        });
        setImages(base64Images);
    };

    const handleRowClick = (post) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });

        setPostId(post.postID);
        console.log("postID: " + post.postId);

        setRoomId(post.roomID);
        console.log("roomID: " + post.roomId);

        setTitle(post.title);
        console.log("title: " + post.title);
        setDescription(post.description);
        setImages(post.images);
        setAddressLine1(post.addressLine1);

        // BE trả về giống dòng ở dưới, trả khác là lỗi nha <3
        // setImages(['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='])
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('w-11/12', 'ml-[48px]')}>
                <h3 className={cx('pt-[20px]', 'pb-[10px]', 'font-semibold', 'text-black', 'text-[24px]')}>
                    Post Form
                </h3>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className={cx('grid', 'grid-cols-2')}>
                        <div className="mb-[20px]">
                            <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="postId">
                                Post ID
                            </label>
                            <input
                                className={cx(
                                    'input_post',
                                    'shadow',
                                    'appearance-none',
                                    'border',
                                    'rounded',
                                    'w-11/12',
                                    'py-3',
                                    'px-3',
                                    'text-gray-700',
                                    'leading-tight',
                                )}
                                id="postId"
                                type="text"
                                placeholder="Enter Post ID"
                                autoComplete="off"
                                value={postId}
                                onChange={handlePostIdChange}
                                required
                                readOnly
                            />
                        </div>
                        <div className="mb-[20px]">
                            <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="title">
                                Tiêu đề
                            </label>
                            <input
                                className={cx(
                                    'input_post',
                                    'shadow',
                                    'appearance-none',
                                    'border',
                                    'rounded',
                                    'w-11/12',
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
                        <div className="mb-[20px]">
                            <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="description">
                                Mô tả
                            </label>
                            <input
                                className={cx(
                                    'input_post',
                                    'shadow',
                                    'appearance-none',
                                    'border',
                                    'rounded',
                                    'w-11/12',
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
                            <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="roomId">
                                Room ID
                            </label>
                            <input
                                className={cx(
                                    'input_post',
                                    'shadow',
                                    'appearance-none',
                                    'border',
                                    'rounded',
                                    'w-11/12',
                                    'py-3',
                                    'px-3',
                                    'text-gray-700',
                                    'leading-tight',
                                )}
                                id="roomId"
                                type="text"
                                placeholder="Enter Room ID"
                                autoComplete="off"
                                value={roomId}
                                onChange={handleRoomIdChange}
                                required
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="imges">
                            Ảnh
                        </label>
                        <UploadImage onImagesChange={handleImagesChange} showDropzone={false} images={images} />
                    </div>

                    <div className="mt-[16px]">
                        <Button
                            className={cx('bg-blue-500', 'hover:opacity-80', 'text-white', 'mr-[18px]')}
                            type="submit"
                            onClick={() => setButtonState(1)}
                        >
                            Thêm
                        </Button>

                        <Button
                            className={cx('bg-orange-500', 'hover:opacity-80', 'text-white', 'mr-[18px]')}
                            type="submit"
                            onClick={() => setButtonState(2)}
                        >
                            Cập nhật
                        </Button>
                        <Button
                            className={cx('bg-red-500', 'hover:opacity-80', 'text-white')}
                            type="submit"
                            onClick={() => setButtonState(3)}
                        >
                            Xóa
                        </Button>

                        <ToastMessage snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity}/>
                    </div>
                </form>
            </div>

            <table className={cx('post_table', 'w-11/12')}>
                <thead>
                    <tr>
                        <th>Post ID</th>
                        <th>Room ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage).map((post) => (
                        <tr key={post.postId}>
                            <td>{post.postId}</td>
                            <td>{post.roomId}</td>
                            <td>{post.title}</td>
                            <td>{post.description}</td>
                            <td>
                                <div className="flex">
                                    <Button
                                        className={cx('bg-green-500', 'hover:opacity-80', 'text-white')}
                                        onClick={() => handleRowClick(post)}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        className={cx('bg-red-500', 'hover:opacity-80', 'text-white')}
                                        onClick={(e) => handleDelete(e, post.postId)}
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-6">
                <ReactPaginate
                    containerClassName={'pagination flex'}
                    previousLabel={'< previous'}
                    nextLabel={'next >'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(posts.length / postsPerPage)}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    renderOnZeroPageCount={null}
                    previousClassName={
                        'border pt-[6px] px-3 rounded-md mr-2 bg-white hover:bg-blue-100 hover:cursor-pointer'
                    }
                    nextClassName={
                        'border pt-[6px] px-3 rounded-md ml-2 bg-white hover:bg-blue-100 hover:cursor-pointer'
                    }
                    breakClassName={'mx-2'}
                    pageClassName={
                        'min-w-[4rem] bg-white text-center rounded-md flex mx-1 hover:bg-blue-100 hover:cursor-pointer'
                    }
                    pageLinkClassName={'w-full px-5 py-3'}
                    activeLinkClassName={
                        'bg-blue-500 rounded-md text-white cursor-pointer hover:bg-blue-300 hover:cursor-pointer'
                    }
                />
            </div>
        </div>
    );
}

export default Post;
