import React, { useEffect, useState } from 'react'
import AuthWrapperContainer from '../AuthWrapperContainer'
import { Images } from '@/utils/imagePath'
import { Box, FormHelperText, Grid, IconButton, Typography } from '@mui/material'
import CInput from '@/components/companyProfile/formElement/CInput'
import CCheckbox from '@/components/companyProfile/formElement/CheckBox'
import Button from '@/components/Common/UI/Button'
import CDatePicker from '@/common/CDatePicker'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_ALL_INDUSTRY_LIST } from '@/components/companyProfile/ProfileDetails/graphql/query'
import AutoComplete from '@/common/AutoComplete'
import { setTextLength, validateUrl } from '@/utils'
import { Add, Cancel } from '@mui/icons-material'
import DocumentPicker from './DocumentPicker'
import s3BucketApiCallWrapper from '@/utils/S3BucketApi'
import Toaster from '@/common/Toaster'
import moment from 'moment'
import { SEND_RECRUITER_REQUEST } from '../graphql/mutation'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import Link from 'next/link'

const RecruiterFormComponent = () => {
    const router = useRouter()

    const [inputData, setInputData] = useState({
        companyName: "",
        website: "",
        industry: "",
        email: "",
        foundedDate: null,
        employeesCount: 0,
        country: 0,
        city: '',
        country: '',
        documentsUrl: ""
    })
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(false)

    const [isTermsAndConditionsAccept, setIsTermsAndConditionsAccept] = useState(false)
    const [error, setError] = useState({})


    const [sendRecruiterRequest] = useMutation(SEND_RECRUITER_REQUEST, {
        onCompleted: (res) => {

            router.replace("/recruiterForm/success")
        },
        onError: (error) => {
            if (error?.graphQLErrors[0]?.extensions?.errors) {
                setError(error.graphQLErrors[0].extensions.errors);
            } else {
                Toaster({
                    message: error.message,
                    type: 'error',
                });
            }
        },
    });



    const [getIndustryList, { data: industryList, loading: industryLoading }] =
        useLazyQuery(GET_ALL_INDUSTRY_LIST, {
            variables: {
                isDeleted: false,
            },
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
        });


    const onIndustryOptionChange = (event, value, reason) => {
        setInputData({ ...inputData, industry: value });
    };

    const onIndustryQueryChange = (e) => {
        getIndustryList({
            variables: {
                name_Icontains: e.target.value,
            },
        });
    };


    const handleDocumentChange = (e,) => {
        setDocuments((prev) => [...prev, e])
        setError({ ...error, documents: "" })
    }

    const handleDeleteDocument = (idx) => {
        let temp = documents.filter((item, index) => index !== idx)
        setDocuments(temp)
    }


    const handleInputChange = (e) => {
        let { name, value } = e.target

        if (name === "employeesCount" && value < 0) return

        setInputData({ ...inputData, [name]: value })
        setError({ ...error, [name]: '' })
    }

    const handleDateChange = (e) => {
        setInputData({ ...inputData, foundedDate: e })
        setError({ ...error, foundedDate: '' })
    }

    let tempMediaUrl = inputData.documentsUrl;

    const handleUploadMediaToBucket = async (file) => {
        try {
            const method = {
                apiType: "POST",
                payload: file,
                dir: "recruiterDocument",
            };
            const result = await s3BucketApiCallWrapper(method);

            tempMediaUrl = tempMediaUrl === "" ? result.location : `${tempMediaUrl} , ${result.location}`

        } catch (error) {

            Toaster({
                type: "error",
                message: "Failed to upload attachment",
            });
        }
    };

    const handleSubmit = async () => {



        if (!inputData.companyName) {
            setError({ ...error, companyName: "This field is required." });
            return
        }
        if (!inputData.email) {
            setError({ ...error, email: "This field is required." });
            return
        }
        if (inputData.website && !validateUrl(inputData.website)) {
            setError({ ...error, website: "Enter a valid URL." });
            return
        }

        if (!tempMediaUrl && documents.length === 0) {
            setError({ ...error, documents: "Atlease one document is required." });
            return
        }
        if (!isTermsAndConditionsAccept) {
            setError({ ...error, terms: "Please accpet terms & conditions." });
            return
        }
        setLoading(true)

        for (let i = 0; i < documents.length; i++) {
            const element = documents[i];
            if (element) {
                await handleUploadMediaToBucket(element);
            }
        }

        let payload = {
            ...inputData,
            documents: tempMediaUrl
        }

        delete payload.documentsUrl



        payload.foundedDate = payload.foundedDate ? moment(payload.foundedDate?.$d).format('YYYY-MM-DD') : null
        payload.industry = payload.industry ? payload.industry.name : ""
        payload.employeesCount = payload.employeesCount ? +payload.employeesCount : 0


        sendRecruiterRequest({
            variables: {
                input: payload
            }
        }).finally(() => {
            setDocuments([])
            setInputData({ ...inputData, documentsUrl: tempMediaUrl })
            setLoading(false)
        })

    }


    useEffect(() => {
        getIndustryList()
    }, [])



    return (
        <AuthWrapperContainer contentLayoutRatio={7} imageLayoutRatio={5} image={Images.LOGIN_COVER_BG}>
            <Box sx={{ my: 4 }}>

                <Typography
                    sx={{
                        fontWeight: 800,
                        color: 'text.darkBlue',
                    }}
                    variant="h5"
                >
                    Fill This Form for Recruiter
                </Typography>

            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <CInput label="Company Name" placeholder="e.g. W3kernel" value={inputData.companyName} name="companyName" onChange={handleInputChange} error={error?.companyName} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput label="Website" placeholder="e.g. https://www.google.com" value={inputData.website} name="website" onChange={handleInputChange} error={error?.website} />
                </Grid>
                <Grid item xs={12}>
                    <AutoComplete
                        value={inputData.industry}
                        onOptionChange={onIndustryOptionChange}
                        onQueryChange={onIndustryQueryChange}
                        label="Industry"
                        options={industryList?.industryList?.edges?.map(
                            (el) => el.node,
                        )}
                        getOptionLabel={(option) =>
                            option ? `${option.name}` : 'Search Industry'
                        }
                        placeholder="Industry"
                        error={error?.industry}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CInput label="Email" placeholder="e.g. saif_ulislam@w3kernel.com" value={inputData.email} name="email" onChange={handleInputChange} error={error?.email} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CDatePicker label="Founded Date" maxDate={dayjs(new Date())} value={inputData.foundedDate} onChange={handleDateChange} error={error?.foundedDate} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput label="Employees" placeholder="1000" value={inputData.employeesCount} type="number" name="employeesCount" error={error?.employeesCount} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput label="Country" placeholder="e.g. UAE" value={inputData.country} name="country" onChange={handleInputChange} error={error?.country} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput label="City" placeholder="e.g. Dubai" value={inputData.city} name="city" onChange={handleInputChange} error={error?.city} />
                </Grid>
                <Grid item xs={12} mt={2}>

                    <DocumentPicker onDocumentChange={handleDocumentChange} />

                    {documents?.map((item, key) => {
                        return <Box key={`document_${item?.name}_${key}`} sx={{ border: 1, borderRadius: 100, height: "48px", borderColor: "#c4c4c4", display: 'flex', alignItems: 'center', pl: 2, pr: 1, justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="bodySmall" color="text.grey">{item.name ? setTextLength(item.name, 90) : ""}</Typography>
                            <IconButton size="small" onClick={() => handleDeleteDocument(key)}>
                                <Cancel sx={{ fontSize: 25 }} />
                            </IconButton>
                        </Box>
                    })}

                    {error?.documents ? (
                        <FormHelperText sx={{ color: 'red' }}>
                            {error?.documents}
                        </FormHelperText>
                    ) : null}
                </Grid>

            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    mt: 3
                }}
            >
                <CCheckbox
                    label={
                        <Typography
                            sx={{ color: 'text.darkBlue' }}
                            fontSize={12}
                        >
                            By creating an account means you agree to
                            the{' '}
                            <Link href="/terms">
                                <Typography sx={{ fontWeight: 700, textDecoration: 'underline' }} variant="span">
                                    {' '}
                                    Terms & Conditions
                                </Typography>{' '}
                            </Link>
                            and our{' '}
                            <Link href="/policy">
                                <Typography sx={{ fontWeight: 700, textDecoration: 'underline' }} variant="span">
                                    Privacy Policy
                                </Typography>
                            </Link>
                        </Typography>
                    }
                    error={error?.terms}
                    value={isTermsAndConditionsAccept}
                    onChange={(e) => {
                        setIsTermsAndConditionsAccept(e.target.checked)
                        setError({ ...error, terms: "" })
                    }
                    }
                    sx={{ mt: -1 }}
                />
            </Box>

            <Button
                isLoading={loading}
                onClick={handleSubmit}
                label="Submit"
                sx={{
                    width: "100%",
                    py: 2,
                    fontSize: '16px',
                    fontWeight: 700,
                    my: { xs: 2, md: 3 },

                }}
            />
        </AuthWrapperContainer >
    )
}

export default RecruiterFormComponent