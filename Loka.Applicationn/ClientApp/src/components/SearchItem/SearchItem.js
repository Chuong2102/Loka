import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SearchIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

function SearchItem({ data, ...passProps }) {
    return (
        <Link className={cx('wrapper')} {...passProps}>
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
