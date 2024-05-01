"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { GET_CANDIDATE_RESUME, SINGLE_RESUME_TEMPLATE } from '@/graphql/resume/resumeQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import Loading from '@/app/loading';
import Button from '@/components/Common/UI/Button';
import { RESUME_PREVIEW_ADD } from '@/graphql/resume/resumeMutation';
import Toaster from '@/common/Toaster';
import { handleUploadMediaToBucket } from '@/utils';

const Preview = () => {
    const searchParams = useSearchParams();
    const DIR_NAME = 'generated-resume'

    const [previewImg, setPreviewImg] = useState('')
    const [loading, setLoading] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)

    const [getResumeData, { data: resumeData }] = useLazyQuery(SINGLE_RESUME_TEMPLATE, {
        fetchPolicy: 'network-only',
        onCompleted: (res) => {
            getInit(res?.singleResume.generatedTemplate)
        },
        onError: (err) => {
            Toaster({ type: 'error', message: err.message });
            setLoading(false)
        },
    });

    const [getcandidateResumeData] = useLazyQuery(GET_CANDIDATE_RESUME, {
        fetchPolicy: 'network-only',
        onCompleted: (res) => {
            getInit(res?.singleCandidate?.resume?.generatedTemplate)
        },
        onError: (err) => {

            Toaster({ type: 'error', message: err.message });
            setLoading(false)
        },
    });

    const [addResumePreview,] = useMutation(RESUME_PREVIEW_ADD, {
        onError: (err) => {
            Toaster({ type: 'error', message: err.message });
        },
    })

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
                .then(async res => {
                    const file = dataURLtoFile(res.src, `resume-${searchParams.get("templateId")}.png`)
                    const imgUrl = await handleUploadMediaToBucket(file, DIR_NAME);
                    addResumePreview({ variables: { imgUrl, resumeId: searchParams.get("templateId") } })
                    setPreviewImg(res.src)
                    setLoading(false)
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
            `).toPdf().outputPdf('datauristring')
                .then((res) => {
                    // let finalData = res.replace("data:application/pdf;base64,", "")
                    window.ReactNativeWebView.postMessage(JSON.stringify({ blobString: res }))
                })
        }
        setDownloadLoading(false);
    };

    const handleCallResumeData = () => {
        let token = searchParams.get("token")

        Cookies.set("token", token)
        let getToken = Cookies.get("token")
        if (getToken) {
            setLoading(true)

            if (searchParams.get("type") === "candidate") {
                getResumeData({ variables: { id: searchParams.get("templateId") } })
            }

            if (searchParams.get("type") === "recruiter") {
                getcandidateResumeData({ variables: { id: searchParams.get("templateId") } })
            }

        }
    }

    useEffect(() => {
        let token = searchParams.get("token")

        if (token) {
            handleCallResumeData()
        }

    }, [])

    return (
        <Box sx={{ height: "100vh", width: "100%" }}>
            {!loading && previewImg ?
                <Box sx={{ height: "auto", border: 1, borderColor: "rgba(0,0,0,0.1)", width: "100%", }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "10px" }}>
                        <Button isLoading={downloadLoading} onClick={handleDownloadPdf} label="Download Resume" style={{ px: 7, py: 1, fontSize: 16, }} />
                    </Box>
                    <img src={previewImg} style={{ width: '100%' }} />
                </Box>
                :
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "95%"
                    }}
                >
                    <Loading />
                </Box>
            }
        </Box>
    )
}

export default Preview