import AutoComplete from '@/common/AutoComplete';
import CDatePicker from '@/common/CDatePicker';
import CModal from '@/common/CModal';
import SearchAndInputMenu from '@/common/SearchAndInputMenu';
import Toaster from '@/common/Toaster';
import Button from '@/components/Common/UI/Button';
import UploadProfileImg from '@/components/UploadProfileImg/UploadProfileImg';
import ProfileDetailHeader from '@/components/companyProfile/ProfileDetails/ProfileDetailHeader';
import { CUD_COMPANY_PROFILE } from '@/components/companyProfile/ProfileDetails/graphql/mutation';
import { GET_ALL_INDUSTRY_LIST } from '@/components/companyProfile/ProfileDetails/graphql/query';
import CInput from '@/components/companyProfile/formElement/CInput';
import CTextArea from '@/components/companyProfile/formElement/CTextArea';
import { ALL_COMPANY_LIST } from '@/graphql/resume/resumeQuery';
import { handleUploadMediaToBucket, validateEmail, validateUrl } from '@/utils';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Box, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';

const AddCompany = ({ payload, error, setError, setPayload }) => {

    const [openModal, setOpenModal] = useState(false)
    const [inputError, setInputError] = useState({})
    const [inputData, setInputData] = useState({
        name: '',
        logoUrl: '',
        contactEmail: '',
        contactPhone: '',
        description: '',
        employeesCount: 0,
        foundedDate: null,
        industry: '',
        website: '',
    });
    const [social, setSocial] = useState({
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
    });

    const [getCompanyList, { data: companyList, loading: loadingCompanyList, refetch: refetchCompanyList }] = useLazyQuery(
        ALL_COMPANY_LIST,
        {
            nextFetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
            onError: (error) => {
                Toaster({
                    type: 'error',
                    message: error.message,
                });
            },
        },
    );


    const [getIndustryList, { data: industryList, }] =
        useLazyQuery(GET_ALL_INDUSTRY_LIST, {
            variables: {
                isDeleted: false,
            },
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
        });

    const [addCompany, { loading: addCompanyLoading }] = useMutation(CUD_COMPANY_PROFILE, {
        onCompleted: (res) => {
            Toaster({ type: 'success', message: "Company Added Successfully!" })
            onCompanyOptionChange(inputData.name)
            refetchCompanyList()
            handleModalClose()
        },
        onError: (error) => {
            if (error?.graphQLErrors[0]?.extensions?.errors) {
                setInputError(error.graphQLErrors[0].extensions.errors);
            } else {
                Toaster({
                    message: error.message,
                    type: 'error',
                });
            }
        },
    });


    const onIndustryOptionChange = (event, value, reason) => {
        setInputData({ ...inputData, industry: value });
    };

    const onIndustryQueryChange = (e) => {
        getIndustryList({
            variables: {
                name: e.target.value,
                first: 10
            },
        });
    };


    const handleModalClose = () => {
        setOpenModal(false)
        setInputData({
            name: '',
            logoUrl: '',
            contactEmail: '',
            contactPhone: '',
            description: '',
            employeesCount: 0,
            foundedDate: null,
            industry: '',
            website: '',
        })
        setSocial({
            facebook: '',
            instagram: '',
            linkedin: '',
            twitter: '',
        })
        setInputError({})
    }

    const handleInputChange = (e) => {
        let { name, value } = e.target

        setInputData({ ...inputData, [name]: value })
        setInputError({ ...inputError, [name]: '' })
    }

    const onChangeSocial = (e) => {
        let { name, value } = e.target

        setSocial({ ...social, [name]: value });
    };

    const onCompanyOptionChange = (value) => {
        setPayload({ ...payload, company: value });
        setError({ ...error, company: '' });
    };

    const onCompanyQueryChange = (e) => {

        getCompanyList({
            variables: {
                name: e,
                first: 10,
            },
        });
        setInputData({ ...inputData, name: e })
        setError({ ...error, company: '' });
    };

    const handleSave = async () => {
        let imgUrl = payload.logoUrl;

        if (!inputData.name) {
            setInputError({ ...inputError, name: "This field is required." });
            return
        }

        if (inputData.website && !validateUrl(inputData.website)) {
            setInputError({
                ...inputError,
                website: 'Please enter a valid facebook URL.',
            });
            return;
        }
        if (social?.facebook && !validateUrl(social.facebook)) {
            setInputError({
                ...inputError,
                facebook: 'Please enter a valid facebook URL.',
            });
            return;
        }
        if (social?.instagram && !validateUrl(social.instagram)) {
            setInputError({
                ...inputError,
                instagram: 'Please enter a valid instagram URL.',
            });
            return;
        }
        if (social?.twitter && !validateUrl(social.twitter)) {
            setInputError({
                ...inputError,
                twitter: 'Please enter a valid twitter URL.',
            });
            return;
        }
        if (social?.linkedin && !validateUrl(social.linkedin)) {
            setInputError({
                ...inputError,
                linkedin: 'Please enter a valid linkedin URL.',
            });
            return;
        }

        if (inputData.contactEmail && !validateEmail(inputData.contactEmail)) {
            setInputError({ ...inputError, contactEmail: 'Please enter a valid email.' })
            return
        }


        if (typeof inputData.logoUrl === 'object') {
            imgUrl = await handleUploadMediaToBucket(
                inputData.logoUrl,
                'companyProfile',
            );
            setInputData({ ...inputData, logoUrl: imgUrl });
        }


        let input = {
            ...inputData,
            logoUrl: imgUrl,
        };

        for (const key in input) {
            if (!input[key]) {
                delete input[key]
            }
        }

        if (input.employeesCount) {
            input.employeesCount = +input.employeesCount
        }
        if (input.foundedDate) {
            input.foundedDate = moment(input?.foundedDate?.$d).format("YYYY-MM-DD")
        }
        if (input.industry) {
            input.industry = input?.industry?.id
        }

        input.socialMediaLinks = JSON.stringify(social);

        addCompany({
            variables: {
                input,
                isCandidate: true
            }
        });
    };


    useEffect(() => {
        getIndustryList({
            variables: {
                first: 10
            }
        })
    }, [])


    return (
        <Box>
            <SearchAndInputMenu
                value={payload.company}
                label="Company Name"
                placeholder="e.g. W3kernel"
                display="name"
                valueKey="name"
                options={companyList?.companyList?.edges?.map(
                    (el) => el.node,
                )}
                error={error?.company}
                onChange={onCompanyQueryChange}
                handleSelect={onCompanyOptionChange}
                addLabel="Add Company"
                addLoading={addCompanyLoading}
                loading={loadingCompanyList}
                setOpenAddModal={setOpenModal}
            >
                <CModal maxWidth="md" title={"Add Company"} open={openModal} onClose={handleModalClose}>
                    <Box>

                        <Box

                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 5,
                                gap: 2,
                                flexWrap: 'wrap'
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="subHeader3"
                                    fontWeight={600}
                                    color={'text.darkBlue'}
                                    mb={1}
                                >
                                    Company Logo
                                </Typography>
                                <Typography>
                                    This image will be shown publicly
                                    <br /> as your profile picture
                                </Typography>
                            </Box>
                            <Box>
                                <UploadProfileImg
                                    existingImage={inputData.logoUrl}
                                    onChange={(e) =>
                                        setInputData({ ...inputData, logoUrl: e })
                                    }
                                />
                            </Box>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Company Name"
                                    name="name"
                                    placeholder="e.g. Wright Talent"
                                    value={inputData?.name}
                                    onChange={handleInputChange}
                                    error={inputError?.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Website"
                                    name="website"
                                    placeholder="e.g. google.com"
                                    value={inputData.website}
                                    onChange={handleInputChange}
                                    error={inputError?.website}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
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
                                    error={inputError?.industry}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Phone"
                                    name="contactPhone"
                                    placeholder="e.g. +971123456789"
                                    type="number"
                                    value={inputData.contactPhone}
                                    onChange={handleInputChange}
                                    error={inputError?.contactPhone}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Email"
                                    name="contactEmail"
                                    placeholder="e.g. example@gmail.com"
                                    value={inputData.contactEmail}
                                    onChange={handleInputChange}
                                    error={inputError?.contactEmail}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CDatePicker
                                    label="Founded Date"
                                    name="foundedDate"
                                    placeholder="e.g. "
                                    onChange={(e) => setInputData({ ...inputData, foundedDate: e })}
                                    value={inputData.foundedDate ? dayjs(inputData.foundedDate) : null}
                                    error={inputError?.foundedDate}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="No. of Employees"
                                    name="employeesCount"
                                    placeholder="e.g. 50"
                                    value={inputData.employeesCount}
                                    type="number"
                                    onChange={handleInputChange}
                                    error={inputError?.employeesCount}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CTextArea
                                    label="Company Details"
                                    minRow={10}
                                    value={inputData.description}
                                    name="description"
                                    onChange={handleInputChange}
                                    error={inputError?.description}
                                />
                            </Grid>
                            <Grid item xs={12} mb={-4} mt={1}>
                                <ProfileDetailHeader title="Social Links" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Facebook"
                                    name="facebook"
                                    value={social?.facebook}
                                    onChange={onChangeSocial}
                                    error={inputError?.facebook}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Twitter"
                                    name="twitter"
                                    value={social?.twitter}
                                    onChange={onChangeSocial}
                                    error={inputError?.twitter}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="LinkedIn"
                                    name="linkedin"
                                    value={social?.linkedin}
                                    onChange={onChangeSocial}
                                    error={inputError?.linkedin}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Instagram"
                                    name="instagram"
                                    value={social?.instagram}
                                    onChange={onChangeSocial}
                                    error={inputError?.instagram}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                style={{ fontSize: 20, px: 10 }}
                                label="Save"
                                onClick={handleSave}
                                isLoading={addCompanyLoading}
                            />
                        </Box>
                    </Box>
                </CModal>
            </SearchAndInputMenu>
        </Box>
    )
}

export default AddCompany