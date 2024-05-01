import { Box, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RecentPostCard = ({ data }) => {
    const { thumbnailUrl, title, createdOn,id
    } = data;

    return (
        <Box
            display={'flex'}
            flexDirection={'row'}
            gap={2}
        >
            <Box>
                <Image src={thumbnailUrl || '/images/default-image.jpg'} width={70} height={70} alt='blog' />
            </Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                gap={1}
            >
                <Link href={`/blog/${id}`}>
                    <Typography fontSize={18} fontWeight={700} color="#1C3E5E">
                        {title}
                    </Typography>
                </Link>
                <Typography variant='bodySmall' fontFamily={700} color="#1C3E5EBF">
                    {
                        moment(createdOn).format('DD MMM YYYY')
                    }
                </Typography>
            </Box>
        </Box>
    );
};

export default RecentPostCard;