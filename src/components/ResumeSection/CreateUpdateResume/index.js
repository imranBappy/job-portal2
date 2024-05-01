import StepperFooter from '@/app/(resume)/resume/components/StepperFooter';
import StepperHeader from '@/app/(resume)/resume/components/StepperHeader';
import Title from '@/app/(resume)/resume/components/Title';
import Toaster from '@/common/Toaster';
import { CREATE_RESUME_MUTATION } from '@/graphql/resume/resumeMutation';
import { SINGLE_RESUME_DETAILS } from '@/graphql/resume/resumeQuery';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Article } from '@mui/icons-material';
import { Box, Drawer, Fab, Grid, useMediaQuery } from '@mui/material';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SelectedResume from '../SelectedResume';
import { GET_ALL_BASE_TEMPLATE_LIST } from '../graphql/query';
import Education from './Education';
import Experience from './Experience';
import MoreOption from './MoreOption';
import PersonalInfo from './PersonalInfo';
import Skills from './Skills';
import Summary from './Summary';
import { EDUCATION_QUERY } from '@/graphql/education/educationQuery';
import { QUERY_EXPERIENCES } from '@/graphql/experiences/experiencesQuery';
import Button from '@/components/Common/UI/Button';
import { Typography } from '@mui/material';
import RightArrow from '@mui/icons-material/ArrowForward';
import BackArrow from '@mui/icons-material/ArrowBack';
import { SKILLS_QUERY } from '@/graphql/skill/skillQuery';
import { GET_ME } from '@/graphql/auth/authQuery';
import { handleDeleteAttachmentFromS3 } from '@/utils';

const steps = [
    'Heading',
    'Education',
    'Work History',
    'Skills',
    'Summary',
    'Finalize',
];

const stepsTitle = {
    0: {
        title: 'Personal Details',
        subTitle: 'We suggest including an email and phone number.',
    },
    1: {
        title: 'Education details',
        subTitle: `Include every school, even if you're still there or didn't graduate.`,
    },
    2: {
        title: 'Work Experience',
        subTitle: `Start with your most recent job and work backward.`,
    },
    3: {
        title: 'Skills',
        subTitle: `Employers scan skills for relevant keywords. We’ll help you choose the best ones`,
    },
    4: {
        title: 'Summary',
        subTitle: `Briefly tell us about your background`,
    },
    5: {
        title: 'Add More Option',
        subTitle: `These sections are optional.`,
    },
};

const CreateUserResume = () => {
    const pathname = usePathname();
    const params = useSearchParams()
    const router = useRouter();

    const isResponsive = useMediaQuery("(max-width:1100px)")
    const DIR_NAME = 'generated-resume'


    const [resumeName, setResumeName] = useState('Untitle');
    const [currentResumeTemplate, setCurrentResumeTemplate] = useState('');
    const [resumeTemplateId, setResumeTemplateId] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState({});

    const [openTemplateViewModal, setOpenTemplateViewModal] = useState(false);
    const [isPersonalInfoChange, setIsPersonalInfoChange] = useState(false);
    const [socialMediaLinksId, setSocialMediaLinksId] = useState([]);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        profession: '',
        address: '',
        city: '',
        country: '',
        zipCode: '',
        phoneNumber: '',
        dateOfBirth: null,
        gender: '',
        photoUrl: '',
        existingPhotoUrl: '',
    });

    const [educationIds, setEducationIds] = useState([]);
    const [templateList, setTemplateList] = useState([]);
    const [educationList, setEducationList] = useState([])

    const [experienceList, setExperienceList] = useState([])
    const [workExperienceIds, setWorkExperienceIds] = useState([]);

    const [skills, setSkills] = useState([]);

    const [summary, setSummary] = useState('');
    const searchParams = useSearchParams()

    const [generatedTemplatePreview, setGeneratedTemplatePreview] = useState('')


    const getInit = async (template) => {
        if (typeof window !== 'undefined') {
            const html2pdf = (await import('html2pdf.js')).default
            html2pdf().from(`
            <div id="preview" style={{ position: 'relative', width: "21cm"}}>
               ${template} 
            </div>
            `).toImg().outputImg()
                .then(res => {
                    setCurrentResumeTemplate(res.src)
                })
        }
    }

    const { refetch: refetchEducationList } = useQuery(EDUCATION_QUERY, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: { orderBy: "id" },
        onCompleted: (res) => {
            let temp = res?.educationList?.edges?.map((item) => item.node)
            setEducationList(temp)
            if (pathname.split('/').length !== 3) {
                const educationIds = res?.educationList?.edges?.map((item) => item.node.id)
                setEducationIds(educationIds)
            }
        },
        onError: (err) => {
            Toaster({
                message: err.message,
                type: 'error',
            });
        },
    });


    const { refetch: refetchWorkExperienceList } = useQuery(QUERY_EXPERIENCES, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: { orderBy: "id" },
        onCompleted: (res) => {
            let temp = res?.experienceList?.edges?.map((item) => item.node)
            setExperienceList(temp)
            if (pathname.split('/').length !== 3) {
                const workExperienceIds = res?.experienceList?.edges?.map((item) => item.node.id)
                setWorkExperienceIds(workExperienceIds)
            }
        },
        onError: (err) => {
            Toaster({
                message: err.message,
                type: 'error',
            });
        },
    });

    useQuery(SKILLS_QUERY, {
        onCompleted: (res) => {
            let temp = res?.me?.profile?.skills?.edges?.map((item) => item.node.name)
            setSkills(temp)
        }
    });

    useQuery(GET_ME, {
        fetchPolicy: 'network-only',
        onCompleted: (res) => {
            setSummary(res?.me?.profile?.bio ?? "")
        },
        onError: (error) => {
            Toaster({ type: 'error', message: error.message });
        },
    });



    const [getResume, { loading: templateLoading }] = useLazyQuery(GET_ALL_BASE_TEMPLATE_LIST, {
        fetchPolicy: 'network-only',
        onError: (error) => {
            Toaster({
                type: 'error',
                message: error.message
            })
        },
        onCompleted: (res) => {
            let templateId = params.get("templateId")
            let temp = res?.baseTemplateList?.edges?.map((item) => item.node)


            if (temp.length > 0 && pathname.split('/').length !== 3) {
                if (templateId) {
                    let template = temp.filter((item) => item.id === templateId)
                    setCurrentResumeTemplate(template[0].previewUrl)
                    setResumeTemplateId(template[0].id)
                }
                else {
                    setCurrentResumeTemplate(temp[0].previewUrl)
                    setResumeTemplateId(temp[0].id)
                }
            }

            setTemplateList(temp)
        }
    })



    const [getResumeData] = useLazyQuery(SINGLE_RESUME_DETAILS, {
        fetchPolicy: 'network-only',
        onCompleted: (res) => {

            let tempEducationIds = [];

            let tempWorkExperienceIds = [];

            let tempSkills = [];

            res?.singleResume?.education?.edges?.forEach((item) => {
                tempEducationIds.push(item.node?.id);
            });

            res?.singleResume?.experience?.edges?.forEach((item) => {
                tempWorkExperienceIds.push(item.node?.id);
            });

            res?.singleResume?.skills?.edges?.forEach((item) => {
                tempSkills.push(item?.node?.name);
            });

            setEducationIds(tempEducationIds);
            setWorkExperienceIds(tempWorkExperienceIds);
            setSkills(tempSkills);
            setSummary(res?.singleResume?.summary);
            setResumeName(res?.singleResume?.name);
            getInit(res?.singleResume?.generatedTemplate);
            setResumeTemplateId(res?.singleResume?.template?.id ?? "");
            setGeneratedTemplatePreview(res?.singleResume?.generatedTemplatePreview)
        },
        onError: (err) => {
            Toaster({ type: 'error', message: err.message });
        },
    });



    const [createUpdateResume, { loading }] = useMutation(
        CREATE_RESUME_MUTATION,
        {
            onCompleted: async (res) => {
                Toaster({
                    message: res?.cudResume?.message,
                    type: 'success',
                });
                const path = searchParams.get('path')
                if (path && path !== "undefined") {
                    router.push(path)
                } else {
                    router.push(`/resume_preview?id=${res?.cudResume?.obj?.id}`)
                }
                if (pathname.split('/').length === 3) {
                    if (generatedTemplatePreview) {
                        await handleDeleteAttachmentFromS3(generatedTemplatePreview, DIR_NAME);
                    }
                }
            },
            onError: (error) => {
                Toaster({
                    message: error.message,
                    type: 'error',
                });
            },
        },
    );

    const handlePersonalInfo = () => {
        if (isPersonalInfoChange) {
            Toaster({
                type: "error",
                message: 'Firstly save the personal information changes.'
            })
            return;
        }
        if (!personalInfo.firstName) {
            setError({ ...error, firstName: 'This field is required.' });
            return;
        }
        if (!personalInfo.lastName) {
            setError({ ...error, lastName: 'This field is required.' });
            return;
        }
        if (!personalInfo.profession) {
            setError({ ...error, profession: 'This field is required.' });
            return;
        }
        if (!personalInfo.phoneNumber) {
            setError({ ...error, phoneNumber: 'This field is required.' });
            return;
        }

        setActiveStep(1);
    };

    const handleEducation = () => {
        if (educationIds.length === 0) {
            setError({
                ...error,
                education: 'Atleast one education is required to select',
            });
            return;
        }

        setError({ ...error, education: '' });

        setActiveStep(2);
    };

    const handleSkills = () => {
        if (skills.length === 0) {
            setError({
                ...error,
                skills: 'Atleast one skill is required',
            });
            return;
        }
        setError({ ...error, skills: '' });
        setActiveStep(4);
    };
    const handleSummary = () => {
        let tempSummary = summary.trim()

        if (!tempSummary) {
            setError({
                ...error,
                summary: 'This field is required.',
            });
            return;
        }
        setError({ ...error, summary: '' });

        setSummary(tempSummary);
        setActiveStep(5);
    };

    const handleCreateResume = async () => {
        let payload = {
            educationIds: educationIds,
            experienceIds: workExperienceIds,
            hobbieNames: [],
            languageNames: [],
            name: resumeName,
            skillsNames: skills,
            socialMediaLinksIds: socialMediaLinksId,
            summary: summary,
            template: resumeTemplateId,
            generatedTemplatePreview: generatedTemplatePreview
        };

        if (pathname.split('/').length === 3) {
            payload.id = pathname.split('/')[2];
        }
        createUpdateResume({ variables: payload });
    };
    const handleNextStep = () => {
        if (activeStep === 0) {
            handlePersonalInfo();
        }
        if (activeStep === 1) {
            handleEducation();
        }
        if (activeStep === 2) {
            setActiveStep(3);
        }
        if (activeStep === 3) {
            handleSkills();
        }
        if (activeStep === 4) {
            handleSummary();
        }
        if (activeStep === 5) {
            handleCreateResume();
        }
    };
    const handlePreviousStep = () => {

        setActiveStep(activeStep - 1);
    };

    useEffect(() => {
        if (pathname && pathname.split('/').length === 3) {
            getResumeData({ variables: { id: pathname.split('/')[2] } });
        }
    }, [pathname]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeStep]);

    useEffect(() => {
        getResume({
            variables: {
                orderBy: "id"
            }
        })
    }, [])

    // setResumeTemplateId

    const templatedId = searchParams.get('templatedId')
    useEffect(() => {
        if (templatedId) {
            setResumeTemplateId(templatedId)
            setCurrentResumeTemplate(templateList.filter((item) => item.id === templatedId)[0].previewUrl)
        }
    }, [])


    return (
        <Box sx={{ position: 'relative', }}>
            <StepperHeader activeStep={activeStep} steps={steps} setResumeName={setResumeName} resumeName={resumeName} />
            <Box sx={{
                width: '90%', margin: 'auto', my: 4,

            }}>
                <Box
                    sx={{
                        position: 'fixed',
                        width: '90%',
                        backgroundColor: 'white',
                        zIndex: 1000,
                    }}
                    top={{
                        xs: '173px',
                        sm: '173px',
                        md: '124px',
                        lg: '71px',
                        xl: '71px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '15px 0px',
                            width: '100%',

                        }}
                    >
                        <Button
                            color="inherit"
                            variant="outlined"
                            sx={{
                                mr: 1,
                                padding: '10px 20px',
                                width: 150
                            }}
                            disabled={activeStep === 0}
                            onClick={handlePreviousStep}
                        >
                            <BackArrow />
                            <Typography
                                ml={2}
                                sx={{
                                    fontFamily: 'Nunito',
                                    fontSize: '22px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: 'normal',
                                }}
                            >
                                Back
                            </Typography>
                        </Button>
                        <Title
                            title={stepsTitle[activeStep].title}
                            subTitle={stepsTitle[activeStep].subTitle}
                        />
                        <Button
                            sx={{
                                padding: '10px 20px',
                                width: activeStep === steps.length - 1 ? 280 : 150
                            }}
                            onClick={handleNextStep}
                            isLoading={loading}


                        >
                            <Typography
                                mr={2}
                                sx={{
                                    fontFamily: 'Nunito',
                                    fontSize: '22px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: 'normal',
                                }}
                            >
                                {activeStep === steps.length - 1 ? 'Finish & Save' : 'Next'}
                            </Typography>
                            <RightArrow />
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        paddingTop: 20
                    }}
                />


                <Grid container spacing={5} >
                    <Grid item xs={12} md={isResponsive ? 12 : 8.5}

                    >
                        {activeStep === 0 ? (
                            <PersonalInfo
                                setIsPersonalInfoChange={
                                    setIsPersonalInfoChange
                                }
                                isPersonalInfoChange={isPersonalInfoChange}
                                steps={steps}
                                error={error}
                                setError={setError}
                                payload={personalInfo}
                                setPayload={setPersonalInfo}
                                socialMediaLinks={socialMediaLinks}
                                setSocialMediaLinks={setSocialMediaLinks}
                                setSocialMediaLinksId={setSocialMediaLinksId}
                                setResumeName={setResumeName}
                                resumeName={resumeName}
                            />
                        ) : null}
                        {activeStep === 1 ? (
                            <Education
                                error={error}
                                setError={setError}
                                setEducationIds={setEducationIds}
                                educationIds={educationIds}
                                refetchEducationList={refetchEducationList}
                                educationList={educationList}
                                setEducationList={setEducationList}
                            />
                        ) : null}
                        {activeStep === 2 ? (
                            <Experience
                                error={error}
                                setError={setError}
                                setWorkExperienceIds={setWorkExperienceIds}
                                workExperienceIds={workExperienceIds}
                                setExperienceList={setExperienceList}
                                experienceList={experienceList}
                                refetchWorkExperienceList={refetchWorkExperienceList}
                            />
                        ) : null}
                        {activeStep === 3 ? (
                            <Skills
                                setSkillsList={setSkills}
                                skillsList={skills}
                                error={error}
                                setError={setError}
                            />
                        ) : null}
                        {activeStep === 4 ? (
                            <Summary
                                summary={summary}
                                setSummary={setSummary}
                                error={error}
                                setError={setError}
                            />
                        ) : null}
                        {activeStep === 5 ? <MoreOption /> : null}
                    </Grid>
                    {isResponsive ?
                        <Drawer
                            anchor={'right'}
                            open={openTemplateViewModal}
                            onClose={() => setOpenTemplateViewModal(false)}
                            PaperProps={{
                                sx: {
                                    width: { xs: "90vw", sm: "70vw" },
                                    p: 2
                                }
                            }}
                        >
                            <SelectedResume
                                setTemplateId={setResumeTemplateId}
                                templateId={resumeTemplateId}
                                selectedResumeTemplate={currentResumeTemplate} setSelectedTemplate={setCurrentResumeTemplate}
                                loading={templateLoading}
                                templateList={templateList}
                            />

                        </Drawer> :
                        <Grid item xs={12} md={isResponsive ? 0 : 3.5}>
                            <SelectedResume
                                setTemplateId={setResumeTemplateId}
                                templateId={resumeTemplateId}
                                selectedResumeTemplate={currentResumeTemplate}
                                setSelectedTemplate={setCurrentResumeTemplate}
                                loading={templateLoading}
                                templateList={templateList}
                            />
                        </Grid>}

                </Grid>
                <StepperFooter
                />

            </Box>
            {isResponsive ? <Box sx={{ position: 'fixed', bottom: 30, right: 50, zIndex: 99 }}>
                <Fab color="primary" aria-label="add" onClick={() => setOpenTemplateViewModal(true)}>
                    <Article />
                </Fab>
            </Box> : null}
        </Box>
    );
};

export default CreateUserResume;
