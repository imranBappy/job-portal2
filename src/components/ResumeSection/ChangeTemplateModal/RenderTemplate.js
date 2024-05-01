import { Add, Done } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

const RenderTemplate = ({ data, onTemplateSelect, currentTemplate, style }) => {

    const [hoverButton, setHoverButton] = useState(false)

    return (
        <Box
            onClick={() => onTemplateSelect(data)}
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            sx={{ height: 420, width: "100%", border: 1, borderColor: "rgba(0,0,0,0.2)", mr: 5, cursor: 'pointer', position: 'relative', ...style }}>
            <Image layout='fill' alt="template" src={data?.previewUrl} style={{ width: '100%', height: "100%" }} />
            {hoverButton || currentTemplate === data.id ?
                <>

                    <Box sx={{ position: 'absolute', top: 0, height: "100%", width: "100%", bgcolor: 'rgba(0,0,0,0.3)', transition: "all 0.3s", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            currentTemplate === data.id ?
                                <IconButton sx={{ height: 60, width: 60, bgcolor: "#20bf55", color: 'white', "&:hover": { bgcolor: "#20bf55" } }}>
                                    <Done fontSize='large' />
                                </IconButton> :
                                <IconButton sx={{ height: 60, width: 60, bgcolor: "primary.main", color: 'white', "&:hover": { bgcolor: "primary.dark" } }}>
                                    <Add />
                                </IconButton>
                        }


                    </Box>

                </>
                : null}
        </Box>
    )
}

export default RenderTemplate