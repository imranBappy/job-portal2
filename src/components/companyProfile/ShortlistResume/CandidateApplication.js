import CModal from '@/common/CModal'
import Button from '@/components/Common/UI/Button'
import CircularLoader from '@/components/Loader/CircularLoader'
import { SINGLE_RESUME_DETAILS } from '@/graphql/resume/resumeQuery'
import { getMonthAndYear } from '@/utils'
import { Images } from '@/utils/imagePath'
import { useLazyQuery } from '@apollo/client'
import { Box, Grid, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { BsPhone } from 'react-icons/bs'
import { MdOutlineLocationOn } from 'react-icons/md'
import { GET_SINGLE_CANDIDATE } from '../graphql/query'

const dotStyle = { height: 5, width: 5, bgcolor: 'grey', borderRadius: 5 }

const SectionContainer = ({ children, title }) => {
    return <Box sx={{ border: "1px solid #D6DDEB", p: 3, mb: 2.4 }}>

        {title ? <Typography sx={{ fontWeight: 600, color: 'text.darkBlue', mb: 2 }} variant='h6'>{title}</Typography> : null}
        {children}</Box>
}

const CandidateApplication = ({ singleCandidateId, setSingleCandidateId, setIsOpenApplication, isOpenApplication, refetch, ...props }) => {

    const [previewImg, setPreviewImg] = useState('')
    const [resumeLoading, setResumeLoading] = useState(false)
    const [singleCandidateDetail, setSingleCandidateDetail] = useState({})

    const [getResumeData, { loading }] = useLazyQuery(GET_SINGLE_CANDIDATE, {
        fetchPolicy: 'network-only',
        onCompleted: (res) => {

            getInit(res?.singleCandidate?.resume?.generatedTemplate)
            setSingleCandidateDetail(res?.singleCandidate)
        },
        onError: (err) => {
            router.push("/candidate/my_resume")
            Toaster({ type: 'error', message: err.message });
        },
    });


    const handleCloseApplication = () => {
        setIsOpenApplication(false)
        setSingleCandidateId(null)
        setPreviewImg('')
    }

    const handleRedirect = (link) => {
        window.open(link, '_blank')
    }

    const template = (data) => {
        return `<Box id="preview" style={{ position: 'relative', width: "21cm" }}>
         ${data}
        </Box>`
    }

    const getInit = async (data) => {
        if (typeof window !== 'undefined') {
            const html2pdf = (await import('html2pdf.js')).default
            html2pdf().from(template(data)).toImg().outputImg()
                .then(res => {
                    setPreviewImg(res.src)
                    setResumeLoading(false)
                })
        }
    }

    const handlePreview = async () => {

        if (previewImg) {
            const newWindow = window.open();
            newWindow.document.write(`<div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center"><img src="${previewImg}" style="width:100%;height:100%;object-fit:contain" /></div>`);
            newWindow.document.close();
        }
    };


    useEffect(() => {
        if (singleCandidateId) {
            getResumeData({
                variables: {
                    id: singleCandidateId
                }
            })
        }
    }, [singleCandidateId])

    const handleAction = (status) => {
        props.candidateApplicationAction({
            variables: {
                status,
                candidateId: singleCandidateDetail.id,
            },
        })
        refetch()
        handleCloseApplication()
    }


    return (
        <CModal maxWidth="lg" title="Candidate Detail" open={isOpenApplication} onClose={handleCloseApplication} style={{ px: 3 }}>
            {loading ?
                <Box sx={{ height: "50vh" }}>
                    <CircularLoader />
                </Box>
                :

                <Grid container spacing={3}>
                    <Grid item xs={12} md={7.5}>
                        <SectionContainer>
                            <Box sx={{ height: 110, width: 110, borderRadius: "50%", overflow: 'hidden', position: 'relative' }}>
                                <Image src={singleCandidateDetail?.resume?.profile?.photoUrl ? singleCandidateDetail?.resume?.profile?.photoUrl : Images.NO_IMAGE} style={{ height: "100%", width: "100%", objectFit: 'cover' }} layout='fill' alt="profile" />
                            </Box>
                            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 0.2 }}>
                                <Typography variant='h5' sx={{ color: "text.darkBlue", fontWeight: 700 }}>{singleCandidateDetail?.resume?.profile?.firstName ?? ""} {singleCandidateDetail?.resume?.profile?.lastName ?? ""}</Typography>
                                {singleCandidateDetail?.resume?.experience?.edges?.length > 0 ?
                                    <>
                                        <Typography variant='bodyLarge' sx={{ color: "text.secondary" }}>{singleCandidateDetail?.resume?.experience?.edges[0]?.node?.designation?.name ?? ""} at <Typography variant='span' sx={{ fontWeight: 500, color: 'text.darkBlue' }}>{singleCandidateDetail?.resume?.experience?.edges[0]?.node?.company?.name ?? ""}</Typography ></Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <MdOutlineLocationOn fontSize={20} color="grey" />
                                            <Typography variant='bodyLarge' sx={{ color: "text.secondary" }}>{`${singleCandidateDetail?.resume?.experience?.edges[0]?.node?.city ? `${singleCandidateDetail?.resume?.experience?.edges[0]?.node?.city} , ` : ""}`}{singleCandidateDetail?.resume?.experience?.edges[0]?.node?.country}</Typography>
                                        </Box>
                                    </>
                                    : null}


                            </Box>
                        </SectionContainer>

                        <SectionContainer title="Experiences">

                            {singleCandidateDetail?.resume?.experience?.edges?.length > 0 ?
                                singleCandidateDetail?.resume?.experience?.edges?.map((item, key) => (
                                    <Box key={`experience_list_${key}`} sx={{ display: 'flex', gap: 2, borderBottom: 1, pb: 2, borderColor: '#D6DDEB', mb: 2 }}>
                                        <Box sx={{ height: 50, minWidth: 50, borderRadius: 10, overflow: 'hidden' }}>
                                            <Image src={item?.node?.company?.logoUrl ? item?.node?.company?.logoUrl : Images.NO_IMAGE} style={{ height: "100%", width: "100%", objectFit: 'cover' }} />
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                            <Typography variant="bodyLarge" sx={{ color: "text.darkBlue", fontWeight: 600 }}>{item?.node?.designation?.name}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                                                <Typography sx={{ fontSize: "16px", fontWeight: 500, color: 'text.darkBlue', }}>{item?.node?.company?.name}</Typography> <Box sx={dotStyle} />
                                                <Typography>Full time</Typography><Box sx={dotStyle} />
                                                <Typography >{item?.node?.startDate ? moment(item?.node?.startDate).format("YYYY") : ""} - {item?.node?.endDate ? moment(item?.node?.endDate).format("YYYY") : item?.node?.isCurrentlyWorking ? "Present" : ""}</Typography>  <Typography>({getMonthAndYear(
                                                    item?.node?.startDate,
                                                    item?.node?.endDate,
                                                )?.years == 0
                                                    ? getMonthAndYear(
                                                        item?.node?.startDate,
                                                        item?.node?.endDate,
                                                    )?.months + ' Months'
                                                    : getMonthAndYear(
                                                        item?.node?.startDate,
                                                        item?.node?.endDate,
                                                    )?.years +
                                                    'Years , ' +
                                                    getMonthAndYear(
                                                        item?.node?.startDate,
                                                        item?.node?.endDate,
                                                    )?.months +
                                                    ' Months'})</Typography>
                                            </Box>
                                            <Typography variant="bodyLarge" sx={{ fontSize: "14px", mb: 1, color: "text.grey" }}>{item?.node?.city ? `${item?.node?.city} , ` : ""} {item?.node?.country}</Typography>
                                            {item?.node?.responsibilities?.edges?.map((item, key) => (
                                                <Typography variant="bodyLarge" key={Math.random()} sx={{ fontSize: "14px" }}>{item.node?.title}</Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                ))
                                : null}

                        </SectionContainer>
                        <SectionContainer title="Educations">
                            {singleCandidateDetail?.resume?.education?.edges?.length > 0 ?
                                singleCandidateDetail?.resume?.education?.edges?.map((item, key) => {
                                    return <Box key={`education_list_${key}`} sx={{ display: 'flex', gap: 2, borderBottom: 1, pb: 2, borderColor: '#D6DDEB', mb: 1 }}>
                                        <Box sx={{ height: 50, width: 50, borderRadius: 10, overflow: 'hidden' }}>

                                            <Image src={item?.node?.institution?.logoUrl ? item?.node?.company?.logoUrl : Images.NO_IMAGE} style={{ height: "100%", width: "100%", objectFit: 'cover' }} />
                                        </Box>
                                        <Box>

                                            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                                <Typography variant="bodyLarge" sx={{ color: "text.darkBlue", fontWeight: 600 }}>{item?.node?.institution?.name}</Typography>

                                                <Typography variant="bodyLarge" sx={{ fontSize: "14px" }}>{item?.node?.degree}</Typography>
                                                <Typography variant="bodyLarge" sx={{ fontSize: "14px" }}>{item?.node?.startDate ? moment(item?.node?.startDate).format("YYYY") : ""} - {item?.node?.endDate ? moment(item?.node?.endDate).format("YYYY") : item?.node?.isCurrentlyStudying ? "Present" : ""}</Typography>
                                            </Box>
                                            {item.node.activities && JSON.parse(item.node.activities) ?
                                                <Typography variant="bodyLarge" sx={{ fontSize: "14px" }}>{JSON.parse(item.node.activities)?.allActivity}</Typography>
                                                : null}
                                        </Box>
                                    </Box>


                                }) : null}

                        </SectionContainer>
                        <SectionContainer title="Skills">
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                {singleCandidateDetail?.resume?.skills?.edges?.length > 0 ?
                                    singleCandidateDetail?.resume?.skills?.edges?.map((item) => {
                                        return <Box key={`skills_${item.node.name}`} sx={{ bgcolor: "primary.light", p: 1, color: 'primary.dark' }}>{item.node.name}</Box>
                                    })
                                    : null}

                            </Box>
                        </SectionContainer>



                    </Grid>
                    <Grid item xs={12} md={4.5}>
                        <SectionContainer title="Additional Details">
                            <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                                <AiOutlineMail />
                                <Box sx={{ mt: -0.5 }}>
                                    <Typography sx={{ color: 'grey' }}>Email</Typography>
                                    <Typography sx={{ color: 'text.darkBlue' }}>{singleCandidateDetail?.resume?.profile?.user?.email ?? ""}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <BsPhone />
                                <Box sx={{ mt: -0.5 }}>
                                    <Typography sx={{ color: 'grey' }}>Phone Number</Typography>
                                    <Typography sx={{ color: 'text.darkBlue' }}>{singleCandidateDetail?.resume?.profile?.phoneNumber ?? ""}</Typography>
                                </Box>
                            </Box>

                        </SectionContainer>
                        <SectionContainer title="Social Links">
                            {singleCandidateDetail?.resume?.socialMediaLinks?.edges?.length > 0 ?
                                singleCandidateDetail?.resume?.socialMediaLinks?.edges?.map((item, key) => {
                                    return <Box key={`social_media_link_${key}`} onClick={() => handleRedirect(item?.node?.urlLink)}>
                                        <Typography sx={{ color: 'grey' }}>{item?.node?.name}</Typography>
                                        <Typography sx={{ color: 'primary.main', cursor: 'pointer' }}>{item?.node?.urlLink}</Typography>
                                    </Box>
                                })
                                : null}
                        </SectionContainer>
                        <Typography sx={{ fontWeight: 600, color: 'text.darkBlue', my: 2 }} variant='h6'>
                            Resume
                        </Typography>

                        <Box sx={{ height: 500, width: "100%", border: 1, borderColor: "rgba(0,0,0,0.2)", overflow: 'hidden', mb: 2 }}>
                            {resumeLoading ?
                                <CircularLoader />
                                :
                                previewImg ? <img src={previewImg} style={{ width: '100%', }} /> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100%" }}>  <Typography sx={{ textAlign: 'center', }}>No Resume Available</Typography></Box>
                            }
                        </Box>
                        {previewImg ?
                            <>
                                <Typography variant='subHeader1' sx={{ color: "text.darkBlue", fontWeight: 700 }}>Resume of {singleCandidateDetail?.resume?.profile?.firstName ?? ""} {singleCandidateDetail?.resume?.profile?.lastName ?? ""}</Typography>
                                <Button onClick={handlePreview} label="Preview" style={{ px: 7, py: 1.5, fontSize: 16, width: "100%", mt: 2 }} />
                            </>
                            : null}
                    </Grid>
                </Grid>
            }

            <Box

                sx={{
                    display: 'flex',
                    gap: 1,
                    margin: 5,
                    justifyContent: 'center',
                }}
            >
                <Button
                    style={{
                        width: "150px",
                    }}
                    label="Shortlist"
                    onClick={() => handleAction("selected")}
                />
                <Button
                    onClick={() => handleAction("rejected")}
                    label="Reject"
                    style={{
                        width: "150px",
                        border: 2,
                        borderColor: 'common.red',
                        bgcolor: 'transparent',
                        color: 'common.red',
                        fontWeight: 600,
                        '&:hover': {
                            bgcolor: 'common.red',
                            color: 'white',
                        },
                    }}
                />
            </Box>
        </CModal>
    )
}

export default CandidateApplication