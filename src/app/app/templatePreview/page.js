"use client"

import Loading from '@/app/loading';
import Button from '@/components/Common/UI/Button';
import { GET_CANDIDATE_RESUME, SINGLE_RESUME_TEMPLATE } from '@/graphql/resume/resumeQuery';
import { useLazyQuery } from '@apollo/client';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AppTemplatePreview = () => {
    const searchParams = useSearchParams();

    const [previewImg, setPreviewImg] = useState('')
    const [loading, setLoading] = useState(false)


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

    const getInit = async (data) => {
        if (typeof window !== 'undefined') {
            const html2pdf = (await import('html2pdf.js')).default
            html2pdf().from(`
            <Box id="preview" style={{ position: 'relative', width: "21cm" }}>
              ${data}
            </Box>
            `).toImg().outputImg()
                .then(res => {
                    setPreviewImg(res.src)
                    setLoading(false)
                })
        }
    }


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

    const handleDownloadPdf = async () => {
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
    };


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
                        <Button onClick={handleDownloadPdf} label="Download Resume" style={{ px: 7, py: 1, fontSize: 16, }} />
                    </Box>
                    <img src={previewImg} style={{ width: '100%', }} />
                </Box>
                :
                <Box
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}
                >
                    <Loading />

                </Box>
            }
        </Box>
    )
}

export default AppTemplatePreview




