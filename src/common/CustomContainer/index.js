import { Box } from '@mui/material'
import React from 'react'

const CustomContainer = ({ children }) => {
    return (
        <Box maxWidth={1600} width="87%" mx="auto">{children}</Box>
    )
}

export default CustomContainer