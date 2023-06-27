import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    UserGroupIcon,
    UserGroupActiveIcon,
} from '~/components/Icons';
import config from '~/config';
import images from '~/assests/images';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper','fixed', 'h-screen')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                <img src={images.logo} alt="tiktok" />
            </Link>
            <Menu>
                <MenuItem
                    title="Post"
                    to={config.routes.post}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                 <MenuItem
                    title="G"
                    to={config.routes.profile}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
            </Menu>
        </aside>
    );
}

export default Sidebar;
