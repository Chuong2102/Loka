import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';
import images from '~/assests/images';
import config from '~/config';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        navigate(`/home`);
    };

    return (
        <div className={cx('bg-gray-50', 'min-h-screen', 'flex', 'items-center', 'justify-center')}>
            <div
                className={cx(
                    'bg-gray-100',
                    'flex',
                    'rounded-2xl',
                    'shadow-lg',
                    'p-5',
                    'items-center',
                    'w-[800px]',
                    'h-[500px]',
                )}
            >
                <div className={cx('md:w-1/2', 'px-8', 'px-16')}>
                    <h2 className={cx('font-bold', 'text-[40px]', 'text-[#f98f41]')}>Login</h2>

                    <form onSubmit={handleSubmit} className={cx('flex', 'flex-col', 'gap-4')}>
                        <input
                            className={cx('px-[12px]', 'mt-8', 'rounded-xl', 'border', 'py-[14px]', 'text-[16px]')}
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                        <div className={cx('relative')}>
                            <input
                                className={cx(
                                    'px-[12px]',
                                    'rounded-xl',
                                    'border',
                                    'w-full',
                                    'py-[14px]',
                                    'text-[16px]',
                                )}
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            className={cx(
                                'bg-[#f98f41]',
                                'rounded-xl',
                                'text-white',
                                'py-[10px]',
                                'mt-[10px]',
                                'text-[18px]',
                                'hover:opacity-80',
                                'hover:shadow-md',
                            )}
                        >
                            Login
                        </button>
                    </form>

                    <div className={cx('mt-6', 'grid', 'grid-cols-3', 'items-center', 'text-gray-400')}>
                        <div className={cx('border-gray-400')}></div>
                        <p className={cx('text-center', 'text-[14px]')}>OR</p>
                        <div className={cx('border-gray-400')}></div>
                    </div>

                    <button
                        className={cx(
                            'bg-white',
                            'border',
                            'py-[10px]',
                            'w-full',
                            'rounded-xl',
                            'mt-5',
                            'flex',
                            'justify-center',
                            'items-center',
                            'text-sm',
                            'hover:shadow-md',
                            'duration-300',
                            'text-[#002D74]',
                        )}
                    >
                        <svg className={cx('mr-3')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                            <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                            />
                            <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                            />
                            <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                            />
                            <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                            />
                        </svg>
                        <p className={cx('text-[16px]')}>Login with Google</p>
                    </button>

                    <div
                        className={cx(
                            'mt-[50px]',
                            'text-[12px]',
                            'border-b',
                            'border-[#002D74]',
                            'py-4',
                            'text-[#002D74]',
                        )}
                    >
                        <a href="#">Forgot your password?</a>
                    </div>

                    <div
                        className={cx(
                            'mt-[12px]',
                            'text-[12px]',
                            'flex',
                            'justify-between',
                            'items-center',
                            'text-[#002D74]',
                        )}
                    >
                        <p>Don't have an account?</p>
                        <button
                            className={cx(
                                'py-2',
                                'px-5',
                                'bg-white',
                                'border',
                                'rounded-xl',
                                'hover:scale-110',
                                'duration-300',
                            )}
                        >
                            <p>Register</p>
                        </button>
                    </div>
                </div>

                <div className={cx('md:block', 'hidden', 'md:w-1/2', 'px-8')}>
                    <img className={cx('rounded-2xl')} src={images.logo_loka} alt="logo_loka" />
                </div>
            </div>
        </div>
    );
}

export default Login;
