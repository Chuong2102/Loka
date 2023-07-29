import axios from 'axios';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Post.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Post() {
    const [postId, setPostId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://localhost:7245/api/GetAllPost');
                // fetch('https://localhost:7245/api/GetAllPost').then(res => res.json()).then(
                //     e => console.log(e)
                // );
                const data = response.data.slice(0, 10);
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
            id: postId,
            userId: roomId,
            title: title,
            body: description,
        };

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
            id: postId,
            userId: roomId,
            title: title,
            body: description,
        };

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
        const confirmation = window.confirm('Có chắc là muốn xóa khum?');
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

    const handleRowClick = (post) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        setPostId(post.id);
        setRoomId(post.userId);
        setTitle(post.title);
        setDescription(post.body);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('w-[440px]', 'ml-[32px]')}>
                <h3 className={cx('pt-[20px]', 'pb-[10px]', 'font-semibold', 'text-black', 'text-[24px]')}>
                    Post Form
                </h3>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="name">
                            Post ID
                        </label>
                        <input
                            className={cx(
                                'input_post',
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
                            id="postId"
                            type="text"
                            placeholder="Enter Post ID"
                            autocomplete="off"
                            value={postId}
                            onChange={handlePostIdChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Room ID
                        </label>
                        <input
                            className={cx(
                                'input_post',
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
                            id="roomId"
                            type="text"
                            placeholder="Enter Room ID"
                            autocomplete="off"
                            value={roomId}
                            onChange={handleRoomIdChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Title
                        </label>
                        <input
                            className={cx(
                                'input_post',
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
                            autocomplete="off"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="mb-[20px]">
                        <label className="block text-gray-700 text-[18px] font-bold mb-2" htmlFor="email">
                            Description
                        </label>
                        <input
                            className={cx(
                                'input_post',
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
                            autocomplete="off"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </div>

                    <div className="flex justify-between items-center mt-[16px]">
                        <Button className={cx('bg-blue-500', 'hover:opacity-80', 'text-white')} onClick={handleAdd}>
                            Add
                        </Button>
                        <Button
                            className={cx('bg-orange-500', 'hover:opacity-80', 'text-white')}
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                        <Button className={cx('bg-red-500', 'hover:opacity-80', 'text-white')} onClick={(e) => handleDelete(e, postId)}>
                            Delete
                        </Button>
                    </div>
                </form>
            </div>
            <table className={cx('post_table')}>
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
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.userId}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
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
                                        onClick={(e) => handleDelete(e, post.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Post;
