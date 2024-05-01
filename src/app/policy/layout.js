
import { Box, Typography } from '@mui/material';

const { default: Navbar } = require('@/components/Common/Navbar/Navbar');

function ConditionLayout({ children }) {
    return (
        <>

            <Box
                sx={{
                    backgroundImage: `url(/images/hero-bg.svg)`,
                    width: '100%',
                    height: '274px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >

                <Box
                    style={{
                        width: '100%',
                        height: 274,
                    }}
                    display={'flex'}
                    flexDirection={'colum'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                >
                    <Box flexGrow={1} alignSelf={'center'}>
                        <Typography align="center" variant="h2"

                            fontSize={{
                                xs: 'h3.fontSize',
                                sm: 'h2.fontSize',
                                md: 'h1.fontSize',
                            }}
                        >
                            Privacy And Policies
                        </Typography>
                    </Box>
                </Box>

            </Box>
            {children}

        </>
    );
}

export default ConditionLayout;
