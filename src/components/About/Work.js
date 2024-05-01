import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Work = () => {
    return (
        <Box mt={5} position={'relative'} width={'100%'} height={'100%'}>
            <Box position={'absolute'} right={'0'} zIndex={'-1'}>
                <Image
                    style={{
                        zIndex: '-1',
                    }}
                    src="/images/work-bg.svg"
                    alt="bg"
                    width={1007}
                    height={877}
                />
            </Box>

            <Container maxWidth="xl">
                <Box mt={15}>
                    <Typography
                        color="#001D68"
                        fontSize={'39px'}
                        fontWeight={700}
                        fontFamily={'Montserrat'}
                    >
                        How Its Work
                    </Typography>
                    <Box
                        mt={13}
                        display={'flex'}
                        gap={'25px'}
                        flexWrap={'wrap'}
                        justifyContent={{
                            xs: 'center',
                            md: 'space-between',
                        }}
                    >
                        <Box
                            flexGrow={1}
                            maxWidth={'450px'}
                            bgcolor={'#fff'}
                            py={'54px'}
                            px={'42px'}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            height="100%"
                            gap={4}
                            borderRadius={'8.8px'}
                            flexBasis={'382px'}
                            boxShadow={
                                ' 0px 3.44022px 86.00549px 0px rgba(0, 18, 65, 0.03)'
                            }
                        >
                            <Image
                                src="/images/work1.svg"
                                width={60.204}
                                height={60.204}
                                alt="Work"
                            />
                            <Typography
                                color="#001D68"
                                fontSize={'22px'}
                                fontWeight={700}
                                fontFamily={'Nunito'}
                            >
                                How Its Work
                            </Typography>

                            <Typography color="#687494" variant="subHeader3">
                                Functional resume template for all industries
                                that will emphasize your own strengths and work
                                experience. It can be hard to stand out from the
                                crowd, but this modern resume layout sample will
                                take care of this.
                            </Typography>
                        </Box>

                        <Box
                            flexGrow={1}
                            maxWidth={'450px'}
                            bgcolor={'#fff'}
                            py={'54px'}
                            px={'42px'}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            height="100%"
                            gap={4}
                            borderRadius={'8.8px'}
                            flexBasis={'382px'}
                            boxShadow={
                                ' 0px 3.44022px 86.00549px 0px rgba(0, 18, 65, 0.03)'
                            }
                        >
                            <Image
                                src="/images/work2.svg"
                                width={60.204}
                                height={60.204}
                                alt="Work"
                            />
                            <Typography
                                color="#001D68"
                                fontSize={'22px'}
                                fontWeight={700}
                                fontFamily={'Nunito'}
                            >
                                Job Fit Scoring
                            </Typography>

                            <Typography color="#687494" variant="subHeader3">
                                Functional resume template for all industries
                                that will emphasize your own strengths and work
                                experience. It can be hard to stand out from the
                                crowd, but this modern resume layout sample will
                                take care of this.
                            </Typography>
                        </Box>
                        <Box
                            flexGrow={1}
                            maxWidth={'450px'}
                            bgcolor={'#fff'}
                            py={'54px'}
                            px={'42px'}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            height="100%"
                            gap={4}
                            borderRadius={'8.8px'}
                            flexBasis={'382px'}
                            boxShadow={
                                ' 0px 3.44022px 86.00549px 0px rgba(0, 18, 65, 0.03)'
                            }
                        >
                            <Image
                                src="/images/work3.svg"
                                width={60.204}
                                height={60.204}
                                alt="Work"
                            />
                            <Typography
                                color="#001D68"
                                fontSize={'22px'}
                                fontWeight={700}
                                fontFamily={'Nunito'}
                            >
                                Company Analytics
                            </Typography>

                            <Typography color="#687494" variant="subHeader3">
                                Functional resume template for all industries
                                that will emphasize your own strengths and work
                                experience. It can be hard to stand out from the
                                crowd, but this modern resume layout sample will
                                take care of this.
                            </Typography>
                        </Box>
                        <Box
                            flexGrow={1}
                            maxWidth={'450px'}
                            bgcolor={'#fff'}
                            py={'54px'}
                            px={'42px'}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            height="100%"
                            gap={4}
                            borderRadius={'8.8px'}
                            flexBasis={'382px'}
                            boxShadow={
                                ' 0px 3.44022px 86.00549px 0px rgba(0, 18, 65, 0.03)'
                            }
                        >
                            <Image
                                src="/images/work4.svg"
                                width={60.204}
                                height={60.204}
                                alt="Work"
                            />
                            <Typography
                                color="#001D68"
                                fontSize={'22px'}
                                fontWeight={700}
                                fontFamily={'Nunito'}
                            >
                                Unlimited Updates
                            </Typography>

                            <Typography color="#687494" variant="subHeader3">
                                Functional resume template for all industries
                                that will emphasize your own strengths and work
                                experience. It can be hard to stand out from the
                                crowd, but this modern resume layout sample will
                                take care of this.
                            </Typography>
                        </Box>
                        <Box
                            flexGrow={1}
                            maxWidth={'450px'}
                            bgcolor={'#fff'}
                            py={'54px'}
                            px={'42px'}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            height="100%"
                            gap={4}
                            borderRadius={'8.8px'}
                            flexBasis={'382px'}
                            boxShadow={
                                ' 0px 3.44022px 86.00549px 0px rgba(0, 18, 65, 0.03)'
                            }
                        >
                            <Image
                                src="/images/work5.svg"
                                width={60.204}
                                height={60.204}
                                alt="Work"
                            />
                            <Typography
                                color="#001D68"
                                fontSize={'22px'}
                                fontWeight={700}
                                fontFamily={'Nunito'}
                            >
                                PDF & Mobile Friendly
                            </Typography>

                            <Typography color="#687494" variant="subHeader3">
                                Functional resume template for all industries
                                that will emphasize your own strengths and work
                                experience. It can be hard to stand out from the
                                crowd, but this modern resume layout sample will
                                take care of this.
                            </Typography>
                        </Box>
                        <Box
                            flexGrow={1}
                            maxWidth={'450px'}
                            bgcolor={'#fff'}
                            py={'54px'}
                            px={'42px'}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            height="100%"
                            gap={4}
                            borderRadius={'8.8px'}
                            flexBasis={'382px'}
                            boxShadow={
                                ' 0px 3.44022px 86.00549px 0px rgba(0, 18, 65, 0.03)'
                            }
                        >
                            <Image
                                src="/images/work6.svg"
                                width={60.204}
                                height={60.204}
                                alt="Work"
                            />
                            <Typography
                                color="#001D68"
                                fontSize={'22px'}
                                fontWeight={700}
                                fontFamily={'Nunito'}
                            >
                                Job Match Making
                            </Typography>

                            <Typography color="#687494" variant="subHeader3">
                                Functional resume template for all industries
                                that will emphasize your own strengths and work
                                experience. It can be hard to stand out from the
                                crowd, but this modern resume layout sample will
                                take care of this.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Work;
