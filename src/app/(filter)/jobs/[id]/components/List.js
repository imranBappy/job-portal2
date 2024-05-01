import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const List = ({ title, items = [] }) => {
    return (
        <Box>
            <Typography variant="h3" mb={2} component="h3">
                {title}
            </Typography>
            <Box>
                {items?.map((item) => (
                    <Box mb={2} display={'flex'} gap={1} key={item.id}>
                        <Image
                            alt="-"
                            src="/icons/CheckIcon.svg"
                            width={20}
                            height={20}
                        />

                        <Typography
                            color={'text.secondary'}
                            variant="body1"
                            component="p"
                        >
                            {item.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default List;
