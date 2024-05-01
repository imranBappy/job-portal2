import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import GridViewIcon from '@mui/icons-material/GridView';
const FilterBar = (props) => {
    const { title, subtitle, handleOpenFilter, openFilter, setLayout, shortIsShow = true } = props;
    const [, setFilter] = props.filterState || [{}, () => { }];

    const handleFilter = (e) => {
        setFilter(e.target.value);
    };


    return (
        <Grid
            display={'flex'} justifyContent={'space-between'} mb={2}>
            <Box  >
                {
                    !openFilter && <Box display={{ xs: 'block', sm: 'block', md: 'block', lg: 'none', xl: 'none' }}>
                        <Button onClick={handleOpenFilter}>Filter</Button>
                    </Box>
                }
                <Box
                    display={{ xs: 'none', md: 'none', lg: 'block', xl: 'block' }}
                >
                    <Typography variant={'h3'}
                    >
                        {title}
                    </Typography>
                    <Typography color={'text.secondary'} variant={'subHeader3'}
                    >
                        {subtitle}
                    </Typography>
                </Box>

            </Box>


            <Box display={'flex'} alignItems={'center'} gap={3}>
                {
                    shortIsShow && <Box display={'flex'} alignItems={'center'} gap={1} >
                        <Typography color="#7C8493">Sort By : </Typography>
                        <select onChange={handleFilter} style={{
                            width: 200,
                            height: 40,
                            border: "none", fontSize: 16,
                            fontWeight: 500,
                            backgroundColor: "transparent",
                            outline: "none",
                            cursor: "pointer",

                        }}>
                            <option

                                value="newest">Newest</option>
                            <option value="most_relevant">Most Relevant</option>
                            <option value="salary_low_to_high">Low To Hight Salary</option>
                            <option value="salary_high_to_low">High To Low Salary</option>
                        </select>
                    </Box>
                }

                <Box display={'flex'}>
                    <Box>
                        <Button
                            onClick={() => setLayout('grid')}
                            sx={{
                                padding: '1',
                                minWidth: 'auto',
                            }}>
                            <GridViewIcon />
                        </Button>
                    </Box>

                    <Box
                        display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}
                    >
                        <Button
                            onClick={() => setLayout('column')}
                            sx={{
                                padding: '1',
                                minWidth: 'auto',
                            }}>
                            <ViewStreamIcon />
                        </Button>
                    </Box>

                </Box>
            </Box>

        </Grid >
    );
};

export default FilterBar;