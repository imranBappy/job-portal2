import CustomContainer from '@/common/CustomContainer'
import Toaster from '@/common/Toaster'
import { SINGLE_RESUME_DETAILS } from '@/graphql/resume/resumeQuery'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Box, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Button from '../Common/UI/Button'
import CircularLoader from '../Loader/CircularLoader'
import { handleUploadMediaToBucket } from '@/utils'
import { RESUME_PREVIEW_ADD } from '@/graphql/resume/resumeMutation'

const ResumePreviewComponent = () => {
    const ref = useRef()
    const router = useRouter()
    const params = useSearchParams()
    const DIR_NAME = 'generated-resume'

    const [getResumeData, { loading, data: resumeData }] = useLazyQuery(SINGLE_RESUME_DETAILS, {
        fetchPolicy: 'network-only',
        onCompleted: (res) => {
            getInit(res?.singleResume.generatedTemplate)
        },
        onError: (err) => {
            router.push("/candidate/my_resume")
            Toaster({ type: 'error', message: err.message });
        },
    });
    const [addResumePreview,] = useMutation(RESUME_PREVIEW_ADD, {
        onError: (err) => {
            Toaster({ type: 'error', message: err.message });
        },
    })


    const [previewImg, setPreviewImg] = useState('')
    const [downloadLoading, setDownloadLoading] = useState(false)
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    const getInit = async (data) => {
        if (typeof window !== 'undefined') {
            const html2pdf = (await import('html2pdf.js')).default
            html2pdf().from(`
            <Box id="preview" style={{ position: 'relative', width: "21cm" }}>
              ${data}
            </Box>
            `).toImg().outputImg()
                .then(async (res) => {
                    if (res.src) {
                        const file = dataURLtoFile(res.src, "resume.png")
                        const imgUrl = await handleUploadMediaToBucket(file, DIR_NAME);
                        addResumePreview({ variables: { imgUrl, resumeId: params.get("id") } })
                        setPreviewImg(imgUrl)
                    }
                })
        }
    }




    const handleDownloadPdf = async () => {
        setDownloadLoading(true);
        if (typeof window !== 'undefined') {
            const html2pdf = (await import('html2pdf.js')).default
            html2pdf().from(`
            <Box id="preview" style={{ position: 'relative', width: "21cm" }}>
                ${resumeData?.singleResume?.generatedTemplate}
            </Box>
            `).save(resumeData?.singleResume?.name ?? "Untitle")
        }
        setDownloadLoading(false);
    };

    useEffect(() => {
        let id = params.get("id")
        if (id) {
            getResumeData({ variables: { id } })
        }
    }, [])



    return (
        <CustomContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                <Box sx={{ mt: 10, mb: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 600, }}>
                    {loading ?
                        <CircularLoader />
                        : <>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: "100%", mb: 3 }}>
                                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{resumeData?.singleResume?.name}</Typography>
                                <Button isLoading={downloadLoading} onClick={handleDownloadPdf} label="Download Resume" style={{ px: 7, py: 1, fontSize: 16, }} />
                            </Box>
                            <Box sx={{ height: "auto", border: 1, borderColor: "rgba(0,0,0,0.1)", width: 600, }}>
                                <img ref={ref} src={previewImg} style={{ width: '100%', }} />
                            </Box>
                        </>}

                </Box>
            </Box>
        </CustomContainer>
    )
}

export default ResumePreviewComponent