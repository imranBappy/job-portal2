import { Box, Typography } from '@mui/material';
import React from 'react';
import Input from '../Common/Input';
import Button from '../Common/UI/Button';



const UserProfileJobListHeader = (props) => {
    const [selected, setSelected] = props.filterDateState || [];
    const [filter, setFilter] = props.filterState;

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                my: 3,
                gap: 5,
                flexWrap: 'wrap',
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Applied Jobs
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                    flexWrap={{
                        xs: 'wrap',
                        lg: 'nowrap',
                    }}
                >
                    <Button
                        onClick={() => setFilter("ALL")}
                        variant={filter === "ALL" ? "contained" : "outlined"}
                        color="main"
                        style={{
                            minWidth: 150,
                            height: 50,
                            borderRadius: 1,
                            marginRight: 2,
                            fontWeight: 700,
                            fontSize: 16,
                            border: 2,
                            borderColor: '#017EF3',
                            '&:hover': {
                                backgroundColor: '#017EF3',
                                color: '#fff',
                            }
                        }}
                        label="All"
                    />

                    <Button
                        onClick={() => setFilter("SELECTED")}
                        variant={filter === "SELECTED" ? "contained" : "outlined"}
                        color="main"
                        style={{
                            minWidth: 150,
                            height: 50,
                            borderRadius: 1,
                            marginRight: 2,
                            fontWeight: 700,
                            fontSize: 16,
                            border: 2,
                            borderColor: '#017EF3',
                            '&:hover': {
                                backgroundColor: '#017EF3',
                                color: '#fff',

                            }
                        }}
                        label="Shortlisted"
                    />
                    <Button
                        onClick={() => setFilter("PENDING")}
                        variant={filter === "PENDING" ? "contained" : "outlined"}

                        color="main"
                        style={{
                            minWidth: 150,
                            height: 50,
                            borderRadius: 1,
                            marginRight: 2,
                            fontWeight: 700,
                            fontSize: 16,
                            border: 2,
                            borderColor: '#017EF3',
                            '&:hover': {
                                backgroundColor: '#017EF3',
                                color: '#fff',
                            }
                        }}
                        label="Pending"
                    />

                    <Button
                        onClick={() => setFilter("REJECTED")}
                        variant={filter === "REJECTED" ? "contained" : "outlined"}
                        color="main"
                        style={{
                            minWidth: 150,
                            height: 50,
                            borderRadius: 1,
                            marginRight: 2,
                            fontWeight: 700,
                            fontSize: 16,
                            border: 2,
                            borderColor: '#017EF3',
                            '&:hover': {
                                backgroundColor: '#017EF3',
                                color: '#fff',

                            }
                        }}
                        label="Rejected"
                    />
                    <Input
                        borderRadius={1}
                        type="select"
                        style={{
                            minWidth: 150,
                            borderColor: '#017EF3',
                            borderWidth: 2,
                            color: '#017EF3',
                            fontWeight: 700,
                            borderRadius: 1,
                            // when hover then background color change 
                            '&:hover': {
                                backgroundColor: '#017EF3',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#017EF3',
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#fff',
                                },
                                // arrow color change
                                '& .MuiSelect-icon': {
                                    color: '#fff',
                                },
                            },

                            "&:focus": {
                                backgroundColor: '#017EF3',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#017EF3',
                                },
                                '& .MuiOutlinedInput-input': {
                                    color: '#fff',
                                },
                                // arrow color change
                                '& .MuiSelect-icon': {
                                    color: '#fff',
                                },
                            },

                        }}


                        height={50}
                        options={[
                            { value: 3, label: 'Last 3 Month' },
                            { value: 4, label: 'Last 4 Month' },
                            { value: 5, label: 'Last 5 Month' },
                            { value: 6, label: 'Last 6 Month' },
                        ]}
                        onChange={handleChange}
                        value={selected}
                    />
                </Box>


            </Box>
        </Box>
    );
};

export default UserProfileJobListHeader;
