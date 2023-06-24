import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                An
            </div>
        </footer>
    );
}

export default footer;
