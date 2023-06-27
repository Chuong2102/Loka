import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import Carousel from '~/components/Carousel/Carousel';
import Button from '~/components/Button';
import { CssSyntaxError } from 'postcss';


const cx = classNames.bind(styles);


function Home() {
    const [isHovered, setIsHovered] = useState(false);
    

    return (
        <div className={cx('wrapper', 'my-[100px]')}>
            <div className="grid grid-cols-4 gap-x-14 gap-y-16">   
               
            </div>
        </div>
    );
}

export default Home;
