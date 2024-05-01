import { Search } from '@mui/icons-material';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';

const BlogSearch = ({
    handleCustomSarch
}) => {

    const [search, setSearch] = React.useState("")
    const handleChange = (e) => {
        setSearch(e.target.value)
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        handleCustomSarch(search)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleCustomSarch(search)
        }, 1000);
        return () => clearTimeout(timer);
    }, [search, handleCustomSarch])



    return (
        <Box
            sx={{
                width: '100%',

                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant='h5'>
                Search by Keywords
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    onChange={handleChange}
                    id="outlined-start-adornment"
                    fullWidth={true}
                    sx={{
                        m: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderRadius: 15,
                            },
                        },
                    }}
                    placeholder='Search by Keywords'
                    InputProps={{
                        startAdornment: <InputAdornment position="start">  <Search /></InputAdornment>,
                    }}
                />
            </form>
        </Box>
    );
};

export default BlogSearch;