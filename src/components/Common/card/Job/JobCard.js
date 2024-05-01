import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const JobCard = (props) => {
    const { job: {
        title = "",
        company,
        src = "/icons/uihut.svg",
        types = ['Full Time', 'Remote'],
        description,
        totalCandidate
    } = {}, style, ...rest } = props;
    return (
        <Box
            {...rest}
            flexGrow={1}
            flexBasis={380}
            sx={{
                border: "1px solid #1C3E5E1A"
            }}
            p={3}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            borderRadius={2}
            style={style}
        >
            <Box
                display="flex"
                alignItems="center"
                gap={3}
                borderBottom={'1px solid #1C3E5E1A'}
                pb={2}
                mb={2}
            >
                <Box>
                    <Image src={src} width={100} height={100} alt="-" />
                </Box>
                <Box>
                    <Typography variant='h4'>
                        {title}
                    </Typography>
                    <Typography mb={2} variant='body1'>
                        {company}
                    </Typography>
                </Box>
            </Box>
            <Box
                borderBottom={'1px solid #1C3E5E1A'}
                pb={2}
                mb={2}
            >
                <Typography> {description} </Typography>

                <Box
                    display={'flex'}
                    alignItems={'center'}
                    gap={3}
                    mt={2}
                >
                    {
                        types.map((type, index) => (<Typography
                            key={index}
                            variant='span'
                            color={'#1C3E5E'}
                            bgcolor={'#FEF7E3'}
                            px={1}
                            py={0.5}
                            fontWeight={600}
                            align='center'
                            fontSize={16}
                        >
                            {type}
                        </Typography>))
                    }
                </Box>

            </Box>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={3}

            >
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <Image
                        style={{
                            borderRadius: '50%'
                        }}
                        src="/icons/candidate1.svg" width={32} height={32} alt="-" />
                    <Image
                        style={{
                            borderRadius: '50%',
                            marginLeft: '-15px'
                        }}
                        src="/icons/candidate2.svg" width={32} height={32} alt="-" />
                    <Image
                        style={{
                            borderRadius: '50%',
                            marginLeft: '-15px'
                        }}
                        src="/icons/candidate3.svg" width={32} height={32} alt="-" />
                    <Box sx={{
                        borderRadius: '50%',
                        marginLeft: '-15px',
                        border: '1px solid black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} width={32} height={32} bgcolor={'orange'} >
                        <Typography
                            component={'span'}
                            color={'black'}
                            fontWeight={500}
                            fontSize={16}
                            lineHeight={'32px'}
                        >
                            3+
                        </Typography>
                    </Box>

                </Box>
                <Typography
                >
                    {totalCandidate}
                </Typography>

            </Box>
        </Box>
    );
};

export default JobCard;