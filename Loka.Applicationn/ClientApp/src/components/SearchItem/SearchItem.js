import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SearchIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function SearchItem({ data, ...passProps }) {
    return (
        <Link to={`/search/${data.description}`} className={cx('wrapper')} {...passProps}>
            <SearchIcon className={cx('search-icon')}/>
            <div className={cx('info')}>
                <span className={cx('username')}>{data.description}</span>
            </div>
        </Link>
    );
}

SearchItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SearchItem;
