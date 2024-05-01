import CModal from '@/common/CModal'
import Toaster from '@/common/Toaster';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/UI/Button';
import { CREATE_RESUME_MUTATION } from '@/graphql/resume/resumeMutation';
import { SINGLE_RESUME_DETAILS } from '@/graphql/resume/resumeQuery';
import { Images } from '@/utils/imagePath';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Box, Dialog, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const RenameResume = ({ open, setOpen, setRenameTemplateId, renameTemplateId, refetch }) => {
    const [resumeName, setResumeName] = useState('')
    const [resumeData, setResumeData] = useState({
        educationIds: [],
        experienceIds: [],
        hobbieNames: [],
        languageNames: [],
        skillsNames: [],
        socialMediaLinksIds: [],
        summary: '',
        template: '',
        generatedTemplatePreview: ''
    })

    const [getResumeData] = useLazyQuery(SINGLE_RESUME_DETAILS, {
        fetchPolicy: 'network-only',
        onCompleted: (res) => {

            let educationIds = res?.singleResume?.education?.edges?.map((item) => item.node.id)
            let experienceIds = res?.singleResume?.experience?.edges?.map((item) => item.node.id)
            let skillsNames = res?.singleResume?.skills?.edges?.map((item) => item.node.name)
            let socialMediaLinksIds = res?.singleResume?.socialMediaLinks?.edges?.map((item) => item.node.id)
            let generatedTemplatePreview = res?.singleResume?.generatedTemplatePreview;

            setResumeName(res?.singleResume?.name)
            setResumeData({
                educationIds,
                experienceIds,
                hobbieNames: [],
                languageNames: [],
                skillsNames,
                socialMediaLinksIds,
                summary: res?.singleResume?.summary,
                template: res?.singleResume?.template?.id,
                generatedTemplatePreview
            })
        },
        onError: (err) => {
            Toaster({ type: 'error', message: err.message });
        },
    });


    const [createUpdateResume, { loading }] = useMutation(
        CREATE_RESUME_MUTATION,
        {
            onCompleted: (res) => {
                Toaster({
                    message: res?.cudResume?.message,
                    type: 'success',
                });
                refetch({
                    variables: {
                        orderBy: '-createdOn',
                    }
                })
                handleModalClose()
            },
            onError: (error) => {
                Toaster({
                    message: error.message,
                    type: 'error',
                });
            },
        },
    );




    const handleRename = () => {
        let payload = {
            ...resumeData,
            name: resumeName,
            id: renameTemplateId,
        };
        createUpdateResume({ variables: payload });
    }
    const handleModalClose = () => {
        setOpen(false)
        setRenameTemplateId(null)
        setResumeName("")
    }

    useEffect(() => {
        if (renameTemplateId) {
            getResumeData({ variables: { id: renameTemplateId } })
        }
    }, [renameTemplateId])


    return (
        <Dialog
            open={open}
            onClose={handleModalClose}
            fullWidth={true}
            maxWidth={'sm'}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    width: '60rem',
                    p: 3,
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        height: 80,
                        width: 80,
                        marginBottom: 2,
                        position: 'relative',
                    }}
                >
                    <Image
                        alt="delete icon"
                        src={Images.EDIT}
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box>

                <Box sx={{ width: "90%" }}>
                    <Typography variant="h5">
                        You can rename the resume template name
                    </Typography>
                    <Input label="Name" value={resumeName ?? ""} onChange={(e) => setResumeName(e.target.value)} style={{ width: "100%", my: 3 }} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '90%',
                        gap: '2rem',
                        marginTop: 0,
                    }}
                >
                    <Button
                        style={{
                            borderRadius: '0.5rem',
                            backgroundColor: '#f8f8f8',
                            border: 'none',
                            width: '100%',
                            borderRadius: '10rem',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                boxShadow: 'none',
                            },
                        }}
                        label="Cancel"
                        className="cancel_btn"
                        onClick={handleModalClose}
                    />
                    <Button
                        isLoading={loading}
                        label="Rename"
                        style={{
                            width: '100%',
                        }}
                        onClick={handleRename}
                    />
                </Box>
            </Box>
        </Dialog>
    )
}

export default RenameResume