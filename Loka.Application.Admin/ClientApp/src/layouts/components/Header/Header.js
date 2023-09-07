import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faCoins,
    faGear,
    faUser,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assests/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        // icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Sign in',
    },
];

function Header() {
    const currentUser = true;

    // Handle logic
    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            // to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            // to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="tiktok" />
                </Link> */}

                {/* <Search /> */}

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            {/* <Tippy delay={[0, 50]} content="Upload" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy> */}
                        </>
                    ) : (
                        <>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/351776496_6326657407400166_6313129531055829588_n.jpg?_nc_cat=103&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=116VhY0iDFgAX85jEr5&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfBZQfepIU-pVb5HO0L-q6s5GZ0SKDTAWW-qHLndYSpX3w&oe=6499CB36"
                                alt="Avatar"
                            />
                        ) : (
                            <></>
                            // <button className={cx('more-btn')}>
                            //     <FontAwesomeIcon icon={faEllipsisVertical} />
                            // </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
