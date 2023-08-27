import classNames from 'classnames/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faEllipsisVertical,
//     faEarthAsia,
//     faCircleQuestion,
//     faKeyboard,
//     faCoins,
//     faGear,
//     faUser,
//     faSignOut,
// } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assests/images';
// import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
// import Image from '~/components/Image';
import Search from '../Search';

const cx = classNames.bind(styles);

// const MENU_ITEMS = [
//     {
//         icon: <FontAwesomeIcon icon={faEarthAsia} />,
//         title: 'English',
//         children: {
//             title: 'Language',
//             data: [
//                 {
//                     code: 'en',
//                     title: 'English',
//                 },
//                 {
//                     code: 'vi',
//                     title: 'Tiếng Việt',
//                 },
//             ],
//         },
//     },
//     {
//         icon: <FontAwesomeIcon icon={faCircleQuestion} />,
//         title: 'Feedback and help',
//         to: '/feedack',
//     },
//     {
//         icon: <FontAwesomeIcon icon={faKeyboard} />,
//         title: 'Keyboard shortcuts',
//     },
// ];

function Header() {
    const currentUser = false;
    const [shouldResetSearch, setShouldResetSearch] = useState(false);

    const handleLogoClick = () => {
        setShouldResetSearch(true);
    };
    // Handle logic
    // const handleMenuChange = (menuItem) => {
    // console.log(menuItem);
    // };

    // const userMenu = [
    //     {
    //         icon: <FontAwesomeIcon icon={faUser} />,
    //         title: 'View profile',
    //         to: '/@hoaa',
    //     },
    //     {
    //         icon: <FontAwesomeIcon icon={faCoins} />,
    //         title: 'Settings',
    //         to: '/settings',
    //     },
    //     {
    //         icon: <FontAwesomeIcon icon={faGear} />,
    //         title: 'Feedback and help',
    //         to: '/feedack',
    //     },
    //     ...MENU_ITEMS,
    //     {
    //         icon: <FontAwesomeIcon icon={faSignOut} />,
    //         title: 'Log out',
    //         to: '/logout',
    //         separate: true,
    //     },
    // ];

    // src={images.logo}
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')} onClick={handleLogoClick}>
                    <img
                        src={images.logo2}
                        alt="loka_logo"
                        width="140"
                        // height="50"
                    />
                </Link>

                <Search shouldReset={shouldResetSearch} resetComplete={() => setShouldResetSearch(false)} />

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
                            {/* <Button text>Upload</Button> */}
                            <Button primary disabled>
                                Log in
                            </Button>
                        </>
                    )}

                    {/* <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/275491783_2551861914957987_429914352891170890_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=m6-mg-FBFwkAX_5lnpj&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfAR4vNMoHLwsYlwVLCpsEmb2Uc2j3gcU4PT2Ql-zOsc2Q&oe=644CA81D"
                                alt="Avatar"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu> */}
                </div>
            </div>
        </header>
    );
}

export default Header;
