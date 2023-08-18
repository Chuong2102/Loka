import axios from 'axios';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';

import styles from './Post.module.scss';
import Button from '~/components/Button';
import UploadImage from '~/components/UploadImage';

const cx = classNames.bind(styles);

function Post() {
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 10;

    const [postId, setPostId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                const data = response.data;
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        const newPost = {
            postId: postId,
            roomId: roomId,
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
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedPost = {
            postId: postId,
            roomId: roomId,
            title: title,
            description: description,
            images: images,
        };

        // console.log(updatedPost);

        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, updatedPost);
            const updatedPostData = response.data;

            const updatedPosts = posts.map((post) => {
                if (post.id === postId) {
                    return updatedPostData;
                }
                return post;
            });

            setPosts(updatedPosts);
            resetForm();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDelete = async (e, postId) => {
        e.preventDefault();
        const confirmation = window.confirm('Bạn có chắc chắn muốn xóa?');
        if (confirmation) {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
                const updatedPosts = posts.filter((post) => post.id !== postId);
                setPosts(updatedPosts);
                resetForm();
            } catch (error) {
                console.error('Error deleting post:', error);
            }
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

        setPostId(post.postId);
        setRoomId(post.roomId);
        setTitle(post.title);
        setDescription(post.description);
        setImages(post.images);

        // BE trả về giống dòng ở dưới, trả khác là lỗi nha <3
        // setImages(['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='])
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('w-11/12', 'ml-[48px]')}>
                <h3 className={cx('pt-[20px]', 'pb-[10px]', 'font-semibold', 'text-black', 'text-[24px]')}>
                    Post Form
                </h3>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                            />
                        </div>
                        <div className="mb-[20px]">
                            <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="title">
                                Title
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
                            />
                        </div>
                        <div className="mb-[20px]">
                            <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="description">
                                Description
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
                            />
                        </div>
                    </div>

                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="imges">
                            Images
                        </label>
                        <UploadImage onImagesChange={handleImagesChange} showDropzone={false} images={images} />
                    </div>

                    <div className="mt-[16px]">
                        <Button
                            className={cx('bg-blue-500', 'hover:opacity-80', 'text-white', 'mr-[18px]')}
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                        <Button
                            className={cx('bg-orange-500', 'hover:opacity-80', 'text-white', 'mr-[18px]')}
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                        <Button
                            className={cx('bg-red-500', 'hover:opacity-80', 'text-white')}
                            onClick={(e) => handleDelete(e, postId)}
                        >
                            Delete
                        </Button>
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
                                        Edit
                                    </Button>
                                    <Button
                                        className={cx('bg-red-500', 'hover:opacity-80', 'text-white')}
                                        onClick={(e) => handleDelete(e, post.postId)}
                                    >
                                        Delete
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
