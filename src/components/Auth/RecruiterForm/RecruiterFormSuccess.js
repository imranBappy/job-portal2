import React from 'react'
import { Box, Typography } from '@mui/material'
import CustomContainer from '@/common/CustomContainer'
import Image from 'next/image'
import { Images } from '@/utils/imagePath'
import Button from '@/components/Common/UI/Button'
import { useRouter } from 'next/navigation'

const RecruiterFormSuccessComponent = () => {
    const router = useRouter()

    const handleRedirect = () => {
        router.push("/")
    }
    return (
        <CustomContainer>
            <Box sx={{ my: 3.3 }}>

                <Box onClick={handleRedirect} sx={{ cursor: "pointer", position: 'relative', height: 60, width: 150, display: 'inline-block' }}>
                    <Image
                        style={{ height: "100%", width: "100%" }}
                        layout='fill'
                        src="/icons/logo.svg"
                        alt="random"
                    />
                </Box>

            </Box>
            <Box sx={{ height: "80vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Box sx={{ width: 650, textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 5 }}>
                    <Box sx={{ height: "300px", width: "300px", position: 'relative' }}>
                        <Image src={Images.RECRUITER_SUCCESS_BG} style={{ height: "100%", width: "100%", objectFit: 'cover' }}
                            layout='fill' />
                    </Box>
                    <Typography variant='h3' color="#3C4946">{`We will review your form, and when it's done, we will send you a confirmation email.`}</Typography>

                    <Button onClick={handleRedirect} label="Go Home" style={{ width: "50%", py: 1.5, fontSize: "16px", fontWeight: 700 }} />
                </Box>

            </Box>
        </CustomContainer >
    )
}

export default RecruiterFormSuccessComponent