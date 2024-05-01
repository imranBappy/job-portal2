import { Box, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../Common/UI/Button'
import Image from 'next/image'

const RenderResumeTemplate = ({ data, }) => {
    const router = useRouter()
    const [hoverButton, setHoverButton] = useState(false)

    const handleRedirectToCreateResume = (id) => {
        let token = Cookies.get('token');
        token ? router.push(`/resume?templateId=${id}`) : router.push(`/login?path=resume?templateId=${id}`)
    }

    return (

        <Box >
            <Box
                onMouseEnter={() => setHoverButton(true)}
                onMouseLeave={() => setHoverButton(false)}
                sx={{
                    width: { xs: "100%", sm: 360 },
                    height: 460,
                    border: 1, borderColor: "rgba(0,0,0,0.1)", overflow: 'hidden', position: "relative", mb: 2, cursor: "pointer",
                }}>
                <Image src={data?.previewUrl} alt="template" layout='fill' style={{ width: '100%', height: "100%" }} />
                {hoverButton ? <Box
                    sx={{
                        position: "absolute", bottom: "10%", left: "50%", transform: "translate(-50%, 0)",
                        width: "80%",
                        margin: "auto"
                    }}>

                    <Button onClick={() => handleRedirectToCreateResume(data.id)} label="Use This Templates" style={{ fontSize: "16px", fontWeight: 600, width: "100%", py: 1.5 }} />

                </Box> : null}

            </Box>
            <Typography variant="h6" sx={{ textAlign: "start", color: "text.darkBlue" }}>{data.name}</Typography>
        </Box>

    )
}

export default RenderResumeTemplate