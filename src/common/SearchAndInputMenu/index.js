import CircularLoader from '@/components/Loader/CircularLoader';
import CInput from '@/components/companyProfile/formElement/CInput';
import { Close } from '@mui/icons-material';
import {
    Box,
    FormHelperText,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CModal from '../CModal';
import useDebounce from '@/utils/useDebounce';

const SearchAndInputMenu = ({
    value,
    label,
    placeholder,
    display,
    valueKey,
    options,
    error,
    onChange,
    name,
    handleSelect,
    loading,
    addLoading,
    addLabel,
    children,
    setOpenAddModal
}) => {
    const ref = useRef();
    const [input, setInput] = useState('')

    const debounceFunction = useDebounce((value) => onChange(value), 500);

    const handleInputChange = (e) => {
        let { value } = e.target
        setInput(value)

        debounceFunction(value)
    }

    const handleSelectData = (value) => {
        handleSelect(value);
        setInput('');
    }

    const handleClear = () => {
        setInput("")
        handleSelect('');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setTimeout(() => {
                    setInput('');
                }, 200);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Box>
            <Box sx={{ position: 'relative' }}>
                <Box ref={ref}>
                    <CInput
                        value={input || value}
                        onChange={handleInputChange}
                        label={label}
                        name={name}
                        placeholder={placeholder}
                        autoComplete="off"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {input || value ? (
                                        <IconButton onClick={handleClear}>
                                            <Close />
                                        </IconButton>
                                    ) : null}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {input ?

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
                            p: 1
                        }}
                    >
                        {!loading ? options && options.length > 0 ?
                            options.map((item, key) => (
                                <Box
                                    key={`${label}_${item[display]}_${key}`}
                                    onClick={() => {
                                        handleSelectData(item[valueKey])

                                    }}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        px: 1.5,
                                        py: 1,
                                        cursor: 'pointer',
                                        borderRadius: 1,
                                        bgcolor:
                                            value === item[valueKey]
                                                ? 'rgba(0,0,0,0.1)'
                                                : '',
                                        '&:hover': {
                                            bgcolor: 'rgba(0,0,0,0.1)',
                                        },
                                    }}
                                >
                                    <Typography>{item[display]}</Typography>
                                </Box>
                            ))
                            :
                            <Box sx={{
                                px: 1.5,
                                py: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <IconButton
                                    disabled={addLoading}
                                    onClick={() => setOpenAddModal(true)}
                                    sx={{
                                        height: 30,
                                        width: "100%",
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
                                        "&.Mui-disabled": {
                                            bgcolor: 'rgba(0,0,0,0.2)'
                                        }
                                    }}
                                >
                                    {addLabel}
                                </IconButton>
                            </Box> :
                            <Box sx={{
                                px: 1.5,
                                py: 1,
                            }}>
                                <Typography sx={{ fontWeight: 600, color: 'grey' }}>Loading....</Typography>
                            </Box>
                        }

                    </Box>

                    : null}
            </Box>

            <FormHelperText sx={{ color: 'red' }}>
                {error && error}
            </FormHelperText>


            {children}
        </Box>
    );
};

export default SearchAndInputMenu;
