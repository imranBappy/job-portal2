"use client"

import Toaster from '@/common/Toaster';
import CONTACT_MUTATION from '@/graphql/Contact/contactMutation';
import { useMutation } from '@apollo/client';
import { Box, Button, Container, Grid, Input, TextField, Typography } from '@mui/material';
import React from 'react';

const page = () => {

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')

    const [sendMessage,] = useMutation(CONTACT_MUTATION, {
        onCompleted: () => {

            setName('')
            setEmail('')
            setMessage('')
            Toaster({
                type: 'success',
                message: 'Message sent successfully'
            })

            // clear the fields

        },
        onError: () => {
            Toaster({
                type: 'error',
                message: 'Message sent failed'
            })
        }
    })

    const [error, setError] = React.useState({
        name: false,
        email: false,
        message: false
    })


    const validate = () => {
        let isError = false
        let error = {
            name: false,
            email: false,
            message: false
        }

        if (name === '') {
            isError = true
            error.name = true
        }

        if (email === '') {
            isError = true
            error.email = true
        }

        if (message === '') {
            isError = true
            error.message
        }

        setError(error)
        return isError
    }






    const handleSubmit = () => {
        if (!validate()) {
            sendMessage({
                variables: {
                    name,
                    email,
                    message
                }
            })
        } else {
            Toaster({
                type: 'error',
                message: 'Please fill all the fields'
            })
        }

    }


    return (
        <Container maxWidth='xl'>
            <Grid container spacing={10} mt={{
                xs: 0,
                md: 15
            }}>
                <Grid item xs={12} md={8} >
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                        height='100%'
                        gap={{
                            xs: 3,
                            md: 5
                        }}
                    >
                        <Box>
                            <Typography variant='h6' color="#282B38" mb={2}>
                                Address
                            </Typography>
                            <Typography variant='subHeader3' color='#282B3860'>
                                St. Juliana. 7 Flor building, Sojhu 5656 Jakarta Selatan, Dubai, UAE
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6' color="#282B38" mb={2}>
                                Email
                            </Typography>
                            <Typography variant='subHeader3' color='#282B3860'>
                                email@mail.com
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6' color="#282B38" mb={2}>
                                Phone
                            </Typography>
                            <Typography variant='subHeader3' color='#282B3860'>
                                +97 (012) 345-6789
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6' color="#282B38" mb={2}>
                                Branch Office
                            </Typography>
                            <Typography variant='subHeader3' color='#282B3860'>
                                <span
                                    style={{
                                        fontWeight: 700
                                    }}
                                >
                                    London
                                </span>, United Kingdom |
                                <span
                                    style={{
                                        fontWeight: 700
                                    }}
                                >
                                    Washington
                                </span>
                                , USA | Jakarta, Indonesia | Berlin, Germany |
                                <span
                                    style={{
                                        fontWeight: 700
                                    }}
                                >
                                    Abu Dhabi
                                </span>
                                , UEA
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                        height='100%'
                        gap={3}
                    >
                        <TextField
                            value={name}
                            error={error.name}
                            onChange={
                                (e) => {
                                    setName(e.target.value)
                                }
                            } fullWidth={true} label='Full Name' />
                        <TextField
                            value={email}
                            error={error.email}
                            onChange={
                                (e) => {
                                    setEmail(e.target.value)
                                }
                            }
                            fullWidth={true} label='Email' />

                        <TextField
                            value={message}
                            error={error.message}
                            onChange={
                                (e) => {
                                    setMessage(e.target.value)
                                }
                            }
                            fullWidth
                            multiline
                            label='Message'
                            InputProps={{
                                rows: 5,
                                style: {
                                    minHeight: '200px',
                                }

                            }}
                        />
                        <Button

                            onClick={handleSubmit}
                            variant='contained' sx={{
                                bgcolor: "#0079D1",
                                textTransform: 'none',
                                py: 2,
                                fontSize: '16px',
                            }} color='primary' fullWidth>
                            Send Message
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default page;