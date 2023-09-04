import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchItem from '~/components/SearchItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

// const goongApi_Main = 'pzeMS34X2XDwDPQt4a71xed6q2qFZINhBYXlsJo6';
const goongApi_Rob = 'oC8CNdh20xrH8Dpm0SIkZYQqBijW847QWVmBE0DB';

function Search({ onSearchItemClick }) {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowReslut] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();

    // useEffect(() => {
    //     if (!debouncedValue.trim()) {
    //         setSearchResult([]);
    //         return;
    //     }

    //     const fetchApi = async () => {
    //         setLoading(true);

    //         const result = await searchServices.search(debouncedValue);

    //         setSearchResult(result);
    //         setLoading(false);
    //     };

    //     fetchApi();
    // }, [debouncedValue]);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            try {
                const response = await axios.get(`https://rsapi.goong.io/Place/AutoComplete`, {
                    params: {
                        api_key: goongApi_Rob,
                        location: '16.4647, 107.5833',
                        limit: 10,
                        radius: 100,
                        input: debouncedValue,
                    },
                });

                setSearchResult(response.data.predictions);
            } catch (error) {
                console.error('Error fetching API:', error);
                setSearchResult([]);
            }
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowReslut(false);
        setSearchValue('');
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    // const handleKeyPress = (e) => {
    //     if (e.key === 'Enter' && debouncedValue) {
    //         e.preventDefault();
    //         handleHideResult();
    //         navigate(`/search/${debouncedValue}`);
    //     }
    // };

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this
        // by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Gợi ý</h4>
                            {searchResult.map((result, index) => (
                                <SearchItem
                                    key={index}
                                    data={result}
                                    onClick={() => {
                                        handleHideResult();
                                        onSearchItemClick(result);
                                    }}
                                />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search', 'mt-[40px]', 'mb-[60px]')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Nhập địa chỉ"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowReslut(true)}
                        // onKeyPress={handleKeyPress}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    {/* <Link to={debouncedValue ? `/search/${debouncedValue}` : '#'}> */}
                        <button
                            className={cx('search-btn', 'flex', 'items-center')}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={debouncedValue ? handleHideResult : undefined}
                        >
                            <SearchIcon />
                            <div className={cx('text-[15px]', 'ml-[4px]')}>Tìm kiếm</div>
                        </button>
                    {/* </Link> */}
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
