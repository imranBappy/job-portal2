import Button from '@/components/Common/UI/Button'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CarouselTemplate = ({ data, style, onTemplateSelect }) => {
    const router = useRouter()

    const [hoverButton, setHoverButton] = useState(false)

    const handleLink = () => {

        if (onTemplateSelect) {
            onTemplateSelect(data)
        } else {
            router.push(`/login?path=resume?templateId=${data.id}`)
        }
    }

    return (
        <Box
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            sx={{ width: "100%", border: 1, borderColor: "rgba(0,0,0,0.2)", mr: 5, cursor: 'pointer', position: 'relative', height: "65vh", ...style }}>

            <Image layout='fill' alt='template' src={data?.previewUrl} />


            {/* style={{ width: '100%', height: "100%" }} */}

            {hoverButton ?

                <Box
                    sx={{
                        position: "absolute", bottom: "10%", left: "50%", transform: "translate(-50%, 0)",
                        width: "80%",
                        margin: "auto"
                    }}>

                    <Button
                        onClick={handleLink}
                        label="Use This Templates" style={{ fontSize: "15px", fontWeight: 600, width: "100%", py: 1 }} />

                </Box>




                : null}
        </Box>
    )
}

export default CarouselTemplate