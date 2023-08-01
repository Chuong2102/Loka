import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';
import config from '~/config';

const cx = classNames.bind(styles);

// const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    // const [page, setPage] = useState();
    const [suggestedUser, getSuggestedUser] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page: 1, perPage: PER_PAGE })
            .then((data) => {
                getSuggestedUser(data);
            })
            .catch((error) => console.log(error));
    }, []);

    // const handleSeeMore = () => {
    //     setPage(page + 1);
    // };

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            <SuggestedAccounts
                label="Suggested accounts"
                data={suggestedUser}
                // onSeeMore={handleSeeMore}
            />
            <SuggestedAccounts label="Following accounts" />
        </aside>
    );
}

export default Sidebar;
