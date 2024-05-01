import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import React, { useState } from 'react';
import CInput from '../../companyProfile/formElement/CInput';
import { Done, Search } from '@mui/icons-material';
import useOutsideClick from '@/utils/UseOutSideClick';
import Button from '../../Common/UI/Button';

const SearchAbleInput = ({
    list,
    label,
    name,
    placeholder,
    handleAdd,
    selectedList,
    onChange,
    valueName,
    error,
    display,
    isEnter,
}) => {
    const [inputData, setInputData] = useState('');

    const handleClose = () => {
        setInputData('');
    };

    const ref = useOutsideClick(handleClose);

    const handleInputChange = (e) => {
        let { value } = e.target;
        setInputData(value);

        onChange(value);
    };

    const handleAddData = (item) => {
        let keyName = valueName ? item[valueName] : item.name;

        if (selectedList.includes(keyName)) {
            let temp = selectedList.filter((val) => val !== keyName);
            handleAdd(temp);
        } else {
            handleAdd([...selectedList, keyName]);
        }
    };

    const handleDelete = (item) => {
        let temp = selectedList.filter((val) => val !== item);
        handleAdd(temp);
    };

    const onKeyDown = (ev) => {
        if (ev.key === 'Enter' && isEnter) {
            let value = ev.target.value.trim()

            if (!value) return

            handleAdd([...selectedList, value]);
            handleClose();

            ev.preventDefault();
        }
    };

    return (
        <Box>
            <Box sx={{ position: 'relative' }} ref={ref}>
                <CInput
                    value={inputData}
                    onChange={handleInputChange}
                    label={label}
                    name={name}
                    placeholder={placeholder}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search color="primary" />
                            </InputAdornment>
                        ),
                    }}
                    error={error}
                    autoComplete={'off'}
                    onKeyDown={onKeyDown}
                />

                {inputData && list && list?.length > 0 ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 100,
                            border: 1,
                            bgcolor: 'white',
                            width: '100%',
                            borderRadius: 2,
                            borderColor: '#1C3E5E33',
                            height: 'auto',
                            maxHeight: 280,
                            overflow: 'auto',
                            zIndex: 99,
                        }}
                    >
                        {list.map((item, key) => (
                            <Box
                                key={`search_list_${label}_${key}`}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    borderBottom: 1,
                                    borderColor: '#1C3E5E33',
                                    p: 2,
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleAddData(item)}
                            >
                                <IconButton

                                    sx={{
                                        height: 30,
                                        width: 50,
                                        borderRadius: 1,
                                        bgcolor: 'primary.main',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'white',
                                        fontSize: 14,
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                        },
                                    }}
                                >
                                    {selectedList.includes(
                                        valueName ? item[valueName] : item.name,
                                    ) ? (
                                        <Done />
                                    ) : (
                                        'ADD'
                                    )}
                                </IconButton>
                                <Typography>
                                    {display ? item[display] : item.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                ) : null}
            </Box>

            <Box
                sx={{
                    minHeight: "100px",
                    height: '100%',
                    width: '100%',
                    border: 1,
                    mt: 3,
                    p: 2,
                    borderColor: '#1C3E5E80',
                    borderRadius: "12px",
                }}
            >
                {selectedList?.length > 0 ? (
                    selectedList?.map((item, key) => {
                        return (
                            <li
                                key={`selected_list_${label}_${key}`}
                                style={{ marginBottom: 15 }}
                            >
                                {item}{' '}
                                <Button
                                    onClick={() => handleDelete(item)}
                                    label="Delete"
                                    style={{
                                        mt: 0.5,
                                        color: '#ff4d4f',
                                        backgroundColor:
                                            'rgba(255, 77, 79, 0.2)',
                                        '&:hover': {
                                            backgroundColor:
                                                'rgba(255, 77, 79, 0.3)',
                                        },
                                    }}
                                />
                            </li>
                        );
                    })
                ) : (
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'text.grey',
                        }}
                    >
                        {' '}
                        No Data Selected
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default SearchAbleInput;
