import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Home() {

    return (
        <div className={cx('wrapper', 'my-[100px]')}>
            <div className="grid grid-cols-4 gap-x-14 gap-y-16">
            </div>
        </div>
    );
}

export default Home;
