import { Box, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import CircularLoader from '../Loader/CircularLoader'
import ChangeTemplateModal from './ChangeTemplateModal'
import Image from 'next/image'

const SelectedResume = ({ selectedResumeTemplate, setTemplateId, templateId, setSelectedTemplate, templateList, loading }) => {
    const [isChangeTemplateModalOpen, setIsChangeTemplateModalOpen] = useState(false)

    const onTemplateSelect = (newTemplateData) => {
        setSelectedTemplate(newTemplateData.previewUrl)
        setTemplateId(newTemplateData.id)
    }

    if (loading) {
        return <Box sx={{ height: "50vh" }}>
            <CircularLoader />
        </Box>
    }

    return (
        <Box sx={{ textAlign: 'center', height: "75vh", }}>
            {selectedResumeTemplate ?
                <Box>
                    <Box sx={{ height: "72vh", border: 1, borderColor: "rgba(0,0,0,0.1)", position: 'relative' }}>
                        <Image layout='fill' src={selectedResumeTemplate} alt="resume template"
                            style={{
                                width: "100%", height: "100%",
                                objectFit: "cover",
                                objectPosition: "0 0",
                            }}
                        />
                    </Box>
                    <IconButton onClick={() => setIsChangeTemplateModalOpen(true)} sx={{ fontSize: "20px", fontWeight: 700, color: 'primary.main', borderRadius: 1, mt: 2 }}>Change This Templates</IconButton>
                </Box>
                : <Typography sx={{ color: 'text.grey', fontWeight: 500 }}>No Template Available</Typography>
            }
            <ChangeTemplateModal templateList={templateList} onTemplateSelect={onTemplateSelect} currentTemplate={templateId} open={isChangeTemplateModalOpen} setOpen={setIsChangeTemplateModalOpen} />
        </Box>
    )
}

export default SelectedResume