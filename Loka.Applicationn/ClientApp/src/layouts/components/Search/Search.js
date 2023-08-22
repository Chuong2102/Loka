import { useEffect, useState, useRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchItem from '~/components/SearchItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

// const goongApi_Main = 'pzeMS34X2XDwDPQt4a71xed6q2qFZINhBYXlsJo6';
const goongApi_Rob = 'oC8CNdh20xrH8Dpm0SIkZYQqBijW847QWVmBE0DB';

function Search({ shouldReset, resetComplete }) {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowReslut] = useState(false);
    const [loading, setLoading] = useState(false);

    const [price, setPrice] = useState('');
    const [uni, setUni] = useState('');
    const [ward, setWard] = useState('');

    useEffect(() => {
        if (shouldReset) {
            setSearchValue('');
            setPrice('');
            setUni('');
            setWard('');

            resetComplete();
        }
    }, [shouldReset, resetComplete]);

    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    };
    const handleChangeUni = (e) => {
        setUni(e.target.value);
    };
    const handleChangeWard = (e) => {
        setWard(e.target.value);
    };

    const handleRefreshClick = () => {
        setPrice('');
        setUni('');
        setWard('');
    };

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
        setSearchValue(debouncedValue);
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

    const handleSearchClick = (e) => {
        e.preventDefault();
        // const queryParams = new URLSearchParams();
        // if (price) queryParams.append('price', price);
        // if (uni) queryParams.append('uni', uni);
        // if (ward) queryParams.append('ward', ward);
        navigate(`/search/${debouncedValue}`);       
    };

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this
        // by creating a new parentNode context.
        <div className={cx('mt-[16px]')}>
            <HeadlessTippy
                interactive
                placement="bottom"
                visible={showResult && searchResult.length > 0}
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
                                    }}
                                />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Nhập tên đường / phường"
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
                    <Link to="#" onClick={handleSearchClick}>
                        <button
                            className={cx('search-btn', 'flex', 'items-center')}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={debouncedValue ? handleHideResult : undefined}
                        >
                            {/* <SearchIcon/> */}
                            <FontAwesomeIcon className={cx('search__icon', 'md:block', 'hidden')} icon={faMagnifyingGlass} />
                            <div className={cx('text-[16px]', 'md:ml-[4px]', 'font-medium')}>Tìm kiếm</div>
                        </button>
                    </Link>
                </div>
            </HeadlessTippy>
            <div className={cx('justify-between', 'md:flex' ,'lg:flex', 'hidden')}>
                <FormControl sx={{ m: 1, minWidth: 94 }} size="small">
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={price}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={handleChangePrice}
                        sx={{
                            '& .MuiSelect-select': {
                                fontSize: '14px',
                                mt: '3px',
                                mb: '-3px',
                                minWidth: 60,
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    maxHeight: '140px',
                                },
                            },
                        }}
                    >
                        <MenuItem sx={{ fontSize: '12px' }} value="">
                            <em>Giá</em>
                        </MenuItem>
                        <MenuItem sx={{ fontSize: '12px' }} value={10}>
                            1 triệu
                        </MenuItem>
                        <MenuItem sx={{ fontSize: '12px' }} value={20}>
                            2 triệu
                        </MenuItem>
                        <MenuItem sx={{ fontSize: '12px' }} value={30}>
                            3 - 5 triệu
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 124 }} size="small">
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={uni}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={handleChangeUni}
                        sx={{
                            '& .MuiSelect-select': {
                                fontSize: '14px',
                                mt: '3px',
                                mb: '-3px',
                                minWidth: 120,
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    maxHeight: '130px',
                                },
                            },
                        }}
                    >
                        <MenuItem sx={{ fontSize: '12px' }} value="">
                            <em>Gần trường ĐH/CĐ</em>
                        </MenuItem>
                        <MenuItem sx={{ fontSize: '12px' }} value={10}>
                            Khoa học
                        </MenuItem>
                        <MenuItem sx={{ fontSize: '12px' }} value={20}>
                            Y Dược
                        </MenuItem>
                        <MenuItem sx={{ fontSize: '12px' }} value={30}>
                            Kinh tế
                        </MenuItem>{' '}
                        <MenuItem sx={{ fontSize: '12px' }} value={40}>
                            Nông Lâm
                        </MenuItem>
                        <MenuItem sx={{ fontSize: '12px' }} value={50}>
                            Công nghiệp
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 116 }} size="small">
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={ward}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={handleChangeWard}
                        sx={{
                            '& .MuiSelect-select': {
                                fontSize: '14px',
                                mt: '3px',
                                mb: '-3px',
                                minWidth: 78,
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    maxHeight: '140px',
                                },
                            },
                        }}
                    >
                        <MenuItem sx={{ fontSize: '12px' }} value="">
                            <em>Phường</em>
                        </MenuItem>
                        <MenuItem sx={{ fontSize: '12px' }} value={10}>
                            Vĩnh Ninh
                        </MenuItem>
                        <MenuItem sx={{ fontSize: '12px' }} value={20}>
                            Phước Vĩnh
                        </MenuItem>
                        <MenuItem sx={{ fontSize: '12px' }} value={30}>
                            Phường Đúc
                        </MenuItem>
                    </Select>
                </FormControl>
                <button className={cx('btn__rotate')} onClick={handleRefreshClick}>
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </button>
            </div>
        </div>
    );
}

export default Search;
