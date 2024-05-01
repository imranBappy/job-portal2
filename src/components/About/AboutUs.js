import { Box, Typography } from '@mui/material';
import React from 'react';
import './About.css';


const AboutUs = () => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            height='100%'
            gap={5}
        >
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                height='100%'
                gap={5}
            >
                <Typography mb={7} textAlign={'center'} variant='h2' color="#505151" >
                    About Us
                </Typography>
                {/* <Typography maxWidth={1100} textAlign={'center'} variant='subHeader3' color='#505151'>
                    Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna cassowary some parrot and much as goodness some froze the sullen much connected bat wonderfully on instantaneously eel valiantly petted this along across highhandedly much.
                </Typography> */}
            </Box>

            <Box
                className='aboutUs'
                display='flex'
                flexDirection='column'
                justifyContent={
                    {
                        xs: 'start',
                        md: 'start'
                    }
                }
                alignItems='center'
                height={
                    {
                        xs: '500px',
                        md: '650px'
                    }
                }
                gap={7}
                sx={{
                    background: 'url(/images/aboutUs.png) no-repeat 100% 100%',
                    backgroundSize: 'cover'
                }}
            >
                <Typography maxWidth={700} textAlign={'center'} variant='subHeader3' color='#505151'  >
                    The innovative app designed to streamline the resume creation process and simplify job applications. Crafted for professionals at every career stage, this user-friendly application combines powerful features to help you present your best self to potential employers.
                </Typography>
            </Box>
        </Box>
    );
};

export default AboutUs;