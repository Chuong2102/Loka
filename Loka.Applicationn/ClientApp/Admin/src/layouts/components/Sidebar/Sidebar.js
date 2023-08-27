import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare, faLocationDot} from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
// import {
//     UserGroupIcon,
//     UserGroupActiveIcon,
// } from '~/components/Icons';
import config from '~/config';
import images from '~/assests/images';

const cx = classNames.bind(styles);

function Sidebar() {
    const location = useLocation();

    return (
        <aside className={cx('wrapper','fixed', 'h-screen')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                <img className={cx('logo-img')} src={images.logo_loka} alt="logo_loka" />
            </Link>
            <Menu>
                <MenuItem
                    title="Post"
                    to={config.routes.post}
                    icon={<FontAwesomeIcon icon={faPenToSquare}/>}
                    activeIcon={<FontAwesomeIcon icon={faPenToSquare}/>}
                />
                <MenuItem
                    title="Room"
                    to={config.routes.room}
                    icon={<FontAwesomeIcon icon={faLocationDot}/>}
                    activeIcon={<FontAwesomeIcon icon={faLocationDot}/>}
                />
            </Menu>
        </aside>
    );
}

export default Sidebar;
