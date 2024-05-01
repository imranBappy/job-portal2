import { Box, Typography } from '@mui/material';
import Image from 'next/image';
const ResumeSlide = ({ resume }) => {
    const { src, isFree } = resume;
    return (
        <div className="item" style={{ display: 'relative' }}>
            <Box className="shadow-effect">
                {isFree && (
                    <Typography
                        right={15}
                        sx={{
                            transform: 'rotate(-30deg)',
                        }}
                        boxShadow={'inherit'}
                        bgcolor={'#70BF55'}
                        color="white"
                        top={15}
                        fontSize={18}
                        fontWeight={'700'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        border={3}
                        borderRadius={'100%'}
                        width={70}
                        height={70}
                        position={'absolute'}
                    >
                        Free
                    </Typography>
                )}

                <Image
                    alt="-"
                    // style={{
                    // width: "100%",
                    // height: "100%"
                    // }}

                    width={500}
                    height={500}
                    className="img-circle"
                    src={src}
                />
            </Box>
        </div>
    );
};

export default ResumeSlide;
