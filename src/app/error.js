'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Box, Button } from '@mui/material'

import Typograph from '@mui/material/Typography'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}



        >
            <Typograph variant="h1"
                sx={{
                    color: 'red',
                    fontSize: '4rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    margin: '5rem 0'
                }}
            >Something went wrong!</Typograph>
            <Button onClick={reset}

                sx={{
                    color: 'white',
                    backgroundColor: 'red',
                    padding: '1rem 2rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    borderRadius: '0.5rem',
                    margin: '0 auto',
                    display: 'block',
                    '&:hover': {
                        backgroundColor: 'red'
                    }
                }}

            >Reset</Button>

        </Box>
    )
}