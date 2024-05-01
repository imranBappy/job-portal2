import React, { useEffect, useState } from 'react';
import { Box, Divider, FormHelperText, Grid, InputAdornment, Typography } from '@mui/material';
import CInput from './formElement/CInput';
import CTextArea from './formElement/CTextArea';
import Button from '../Common/UI/Button';
import CSelect from '@/common/CSelect';
import {
    EXPERTISE_LEVEL_LIST,
    GENDER_LIST,
    JOB_TYPE_LIST,
    QUALIFICATION_LIST,
} from '@/utils/constant';
import CDatePicker from '@/common/CDatePicker';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES, GET_SINGLE_JOB } from './graphql/query';
import Toaster from '@/common/Toaster';
import AutoComplete from '@/common/AutoComplete';
import { GET_ME } from '@/graphql/auth/authQuery';
import SearchAbleInput from '../ResumeSection/CreateUpdateResume/SearchAbleInput';
import {
    ALL_DESIGNATION_LIST,
    ALL_RESPONSIBILITIES_LIST,
} from '@/graphql/resume/resumeQuery';
import SearchAndInputMenu from '@/common/SearchAndInputMenu';
import moment from 'moment';
import CCheckbox from './formElement/CheckBox';
import { CREATE_UPDATE_JOB } from './graphql/mutation';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import Skills from '../ResumeSection/CreateUpdateResume/Skills';
import AddOfficeAddressModal from './ProfileDetails/AddOfficeAddressModal';
import { CREATE_DESIGNATION } from '../ResumeSection/graphql/mutation';
import JobResponsibilitiesListAndDescription from '../ResumeSection/CreateUpdateResume/JobResponsibilitiesListAndDescription';
import AddDesignation from '../ResumeSection/CreateUpdateResume/AddDesignation';

const PostAJob = ({ updateId }) => {
    const router = useRouter()

    const [error, setError] = useState({});

    const [skills, setSkills] = useState([]);
    const [addressList, setAddressList] = useState([]);
    const [inputData, setInputData] = useState({
        title: '',
        description: '',
        responsibilitiesTitles: [],
        requiredSkills: [],
        minSalary: null,
        designationName: '',
        maxSalary: null,
        gender: '',
        benefits: [],
        isRemote: false,
        minExperienceYears: null,
        educationRequirements: '',
        country: '',
        jobType: '',
        city: '',
        addressId: null,
        expertiseLevel: '',
        address: null,
        vacancy: 1,
        applicationDeadline: null,
        categoryId: null,
    });
    const [openAddOfficeAddressModal, setOpenAddOfficeLocationModal] =
        useState(false);


    const [createJob, { loading: createJobLoading }] = useMutation(
        CREATE_UPDATE_JOB,
        {
            nextFetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
            onCompleted: (res) => {
                Toaster({
                    message: res?.cudJob?.message,
                    type: 'success',
                });

                router.push(updateId ? `/recruiter/job_list/${updateId}` : "/recruiter/job_list")

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
        },
    );
    const [getResponsibilityTitles, { data: responsibilitiesListList }] =
        useLazyQuery(ALL_RESPONSIBILITIES_LIST, {
            nextFetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
            onError: (error) => {
                Toaster({
                    type: 'error',
                    message: error.message,
                });
            },
        });

    const [getDesignationList, { data: designationList, loading: loadingDesignationList, refetch: refetchDesignationList }] = useLazyQuery(
        ALL_DESIGNATION_LIST,
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


    const [getAllCategories, { data: categoryList, loading: categoryLoading }] =
        useLazyQuery(GET_ALL_CATEGORIES, {
            fetchPolicy: 'network-only',
            onError: (error) => {
                Toaster({
                    type: 'error',
                    message: error.message,
                });
            },
        });

    const { data: companyData, refetch: addressRefetch, loading: addressLoading } = useQuery(GET_ME, {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
        onError: (error) => {
            Toaster({
                type: 'error',
                message: error.message,
            });
        },
        onCompleted: (res) => {
            let tempAddress = res.me.company.officeLocations?.edges?.map(
                (item) => item.node,
            );

            setAddressList(tempAddress);
        },
    });

    const [addDesignation, { loading: addDesignationLoading }] = useMutation(CREATE_DESIGNATION, {
        onCompleted: (res) => {
            refetchDesignationList()
        },
        onError: (error) => {
            Toaster({
                message: error.message,
                type: 'error',
            });

        },
    });

    const onCategoryOptionChange = (event, value, reason) => {
        setInputData({
            ...inputData,
            categoryId: value,
        });
        setError({ ...error, categoryId: '' });
    };

    const onCategoryQueryChange = (e) => {
        getAllCategories({
            variables: {
                name_Icontains: e.target.value,
            },
        });
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;

        if (name === "vacancy" && value < 0) return
        if (name === "minExperienceYears" && value < 0) return

        setInputData({ ...inputData, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const handleResponsibleTitleChange = (e) => {
        if (!inputData.designationName) {
            setError({
                ...error,
                responsibilitiesTitles:
                    'Please firstly select designation name.',
            });
            return;
        }

        setError({
            ...error,
            responsibilitiesTitles: '',
        });

        getResponsibilityTitles({
            variables: {
                title: e,
                designation: inputData.designationName,
            },
        });
    };

    const handleChangeBenefits = (e) => {
        setError({
            ...error,
            benefits: '',
        });
    };

    const onDesignationOptionChange = (value) => {
        setInputData({
            ...inputData,
            designationName: value,
            responsibilitiesTitles: [],
        });

        getResponsibilityTitles({
            variables: {
                designation: value,
            },
        });

        setError({ ...error, designationName: '' });
    };

    const onDesignationQueryChange = (e) => {
        getDesignationList({
            variables: {
                name_Icontains: e,
                first: 10,
            },
        });
        setInputData({
            ...inputData,
            responsibilitiesTitles: [],
        });
        setError({ ...error, designationName: '' });
    };

    const handleAddResponsibleTitle = (item) => {
        setInputData({ ...inputData, responsibilitiesTitles: item });
    };

    const handleAddBenefits = (item) => {
        setInputData({ ...inputData, benefits: item });
    };

    const onAddressOptionChange = (event, value, reason) => {
        setInputData({
            ...inputData,
            addressId: value,
            city: value?.city ?? '',
            country: value?.country ?? '',
        });
        setError({ ...error, addressId: '' });
    };

    const handleAddDesignation = (name) => {
        addDesignation({
            variables: {
                name
            }
        }).then(() => {
            onDesignationOptionChange(name)
        })
    }

    const [getSingleJob] = useLazyQuery(GET_SINGLE_JOB, {
        fetchPolicy: 'network-only',
        onCompleted: (res) => {
            const data = res?.singleRecruiterJob;
            setInputData({
                title: data.title,
                description: data.description,
                categoryId: data.category,
                jobType: data.jobType.toLowerCase(),
                designationName: data.designation?.name,
                expertiseLevel: data.expertiseLevel?.toLowerCase(),
                minSalary: data.minSalary,
                maxSalary: data.maxSalary,
                vacancy: data.vacancy === 0 ? 1 : data.vacancy,
                gender: data?.gender ? data?.gender?.toLowerCase() : '',
                applicationDeadline: data?.applicationDeadline,
                isRemote: data?.isRemote,
                benefits: data.benefits && JSON.parse(data.benefits) ?
                    Object.values(JSON.parse(data.benefits))?.map((item) => item)
                    : [],

                responsibilitiesTitles: data?.responsibilities?.edges?.map(
                    (item) => item.node.title,
                ),
                educationRequirements: data?.educationRequirements
                    ? data?.educationRequirements.toLowerCase()
                    : '',
                minExperienceYears: data?.minExperienceYears,
                addressId: data?.address,
                city: data?.address?.city,
                country: data?.address?.country,
            });

            if (data.designation?.name) {

                getResponsibilityTitles({
                    variables: {
                        designation: data.designation?.name,
                    },
                });
            }

            setSkills(
                data?.requiredSkills?.edges?.map((item) => item.node.name),
            );
        },
        onError: (err) => {
            Toaster({
                type: 'error',
                message: err.message,
            });
        },
    });


    const handleCreateUpdateJob = () => {

        let errorObj = {}

        if (!inputData.title) {
            errorObj.title = 'This field is required.'
        }
        if (!inputData.description) {
            errorObj.description = 'This field is required.'
        }
        if (!inputData.designationName) {
            errorObj.designationName = 'This field is required.'
        }
        if (!inputData.categoryId) {
            errorObj.categoryId = 'This field is required.'
        }
        if (inputData.responsibilitiesTitles.length < 1) {
            errorObj.responsibilitiesTitles = 'Atleast one Responsibilities Title is required.'
        }
        if (!inputData.vacancy) {
            errorObj.vacancy = 'This field is required.'
        }
        if (!inputData.jobType) {
            errorObj.jobType = 'This field is required.'
        }
        if (!inputData.expertiseLevel) {
            errorObj.expertiseLevel = 'This field is required.'
        }
        if (!inputData.addressId) {
            errorObj.addressId = 'This field is required.'
        }


        if (Object.keys(errorObj).length > 0) {
            setError(errorObj)
            return
        }



        let payload = {
            addressId: inputData?.addressId?.id,
            applicationDeadline: inputData.applicationDeadline
                ? typeof inputData.applicationDeadline === "object" ? moment(inputData.applicationDeadline?.$d).format(
                    'YYYY-MM-DDT12:00:00',
                ) : inputData.applicationDeadline
                : null,
            benefits: "{}",
            categoryId: inputData.categoryId?.id,
            city: inputData.city,
            country: inputData.country,
            description: inputData.description,
            educationRequirements: inputData.educationRequirements,
            gender: inputData.gender,
            jobType: inputData.jobType,
            maxSalary: inputData.maxSalary ? +inputData.maxSalary : null,
            minExperienceYears: inputData.minExperienceYears
                ? +inputData.minExperienceYears
                : null,
            minSalary: inputData.minSalary ? +inputData.minSalary : null,
            requiredSkills: skills,
            responsibilitiesTitles: inputData.responsibilitiesTitles,
            title: inputData.title,
            vacancy: +inputData.vacancy,
            designationName: inputData.designationName,
            expertiseLevel: inputData.expertiseLevel,
            isRemote: inputData.isRemote,
        };

        if (inputData.benefits.length > 0) {

            let tempBenfits = {}
            inputData.benefits?.map((item, key) => {
                return tempBenfits[key] = item
            })

            payload.benefits = JSON.stringify(tempBenfits)

        }

        if (updateId) {
            payload.id = updateId;
        }

        createJob({ variables: payload });
    };

    useEffect(() => {
        getAllCategories({ variables: { first: 25 } });
    }, []);

    useEffect(() => {
        if (updateId) {
            getSingleJob({ variables: { id: updateId } });
        }
    }, [updateId]);

    useEffect(() => {
        if (inputData.designationName) {
            getResponsibilityTitles({
                variables: {
                    designation: inputData.designationName,
                },
            });
        }
    }, [inputData.designationName]);

    return (
        <Box>
            <Typography color="text.darkBlue" textAlign="center" variant="h2">
                {updateId ? 'Update' : 'Post'} a Job
            </Typography>
            <Divider sx={{ mt: 2, mb: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <CInput
                    label="Job Title"
                    name="title"
                    value={inputData.title}
                    onChange={handleInputChange}
                    error={error?.title}
                />

                <CTextArea
                    label="Job Description"
                    minRow={10}
                    name="description"
                    value={inputData.description}
                    onChange={handleInputChange}
                    error={error?.description}
                    placeholder="Enter Job Description"
                />
            </Box>
            <Grid container spacing={3} mt={2}>
                <Grid item xs={12} md={6}>
                    <AutoComplete
                        value={inputData.categoryId}
                        label="Category"
                        options={categoryList?.categories?.edges?.map(
                            (el) => el.node,
                        )}
                        onOptionChange={onCategoryOptionChange}
                        onQueryChange={onCategoryQueryChange}
                        loading={categoryLoading}
                        getOptionLabel={(option) =>
                            option ? `${option?.name}` : 'Search Category'
                        }
                        placeholder="Category"
                        error={error?.categoryId}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CSelect
                        label="Job Type"
                        listData={JOB_TYPE_LIST}
                        name="jobType"
                        selectValue={inputData.jobType}
                        value="key"
                        display="display"
                        onChange={handleInputChange}
                        error={error?.jobType}
                    />
                </Grid>
                <Grid item xs={12} md={6}>

                    <AddDesignation
                        label="Designation"
                        payload={inputData}
                        setPayload={setInputData}
                        error={error}
                        setError={setError}
                    />


                </Grid>
                <Grid item xs={12} md={6}>
                    <CSelect
                        label="Expertise Level"
                        name="expertiseLevel"
                        listData={EXPERTISE_LEVEL_LIST}
                        value="key"
                        display="display"
                        onChange={handleInputChange}
                        selectValue={inputData.expertiseLevel}
                        error={error?.expertiseLevel}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        label="Minimum Salary"
                        name="minSalary"
                        type="number"
                        value={inputData.minSalary}
                        onChange={handleInputChange}
                        error={error?.minSalary}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        label="Maximum Salary"
                        name="maxSalary"
                        type="number"
                        value={inputData.maxSalary}
                        onChange={handleInputChange}
                        error={error?.maxSalary}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        label="Vacancy"
                        type="number"
                        name="vacancy"
                        value={inputData.vacancy}
                        onChange={handleInputChange}
                        error={error?.vacancy}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CSelect
                        label="Gender"
                        listData={GENDER_LIST}
                        name="gender"
                        display="display"
                        value="key"
                        selectValue={inputData.gender}
                        onChange={handleInputChange}
                        error={error?.gender}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CDatePicker
                        label="Deadline"
                        value={
                            inputData.applicationDeadline
                                ? dayjs(inputData.applicationDeadline)
                                : null
                        }
                        error={error?.applicationDeadline}
                        minDate={dayjs(new Date())}
                        onChange={(e) =>
                            setInputData({
                                ...inputData,
                                applicationDeadline: e,
                            })
                        }
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CCheckbox
                        label={<Typography fontWeight={700}>Remote Job</Typography>}
                        value={inputData.isRemote}
                        error={error?.isRemote}
                        onChange={(e) =>
                            setInputData({
                                ...inputData,
                                isRemote: e.target.checked,
                            })
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <SearchAbleInput
                        label="Benefits"
                        list={[]}
                        valueName="title"
                        display="title"
                        placeholder="Type benefit and press enter"
                        selectedList={inputData.benefits}
                        handleAdd={handleAddBenefits}
                        onChange={handleChangeBenefits}
                        error={error?.benefits}
                        isEnter
                    />
                </Grid>
                <Grid item xs={12}>
                    <JobResponsibilitiesListAndDescription
                        designation={inputData.designationName}
                        selectedList={inputData.responsibilitiesTitles}
                        handleAdd={handleAddResponsibleTitle}
                        list={responsibilitiesListList?.responsibilitiesList?.edges?.map(
                            (el) => el.node,
                        )}
                        label="Job Responsibility"
                        errorMessage="Please select designation"
                        clearError={() => {
                            console.log('hello')
                            setError({ ...error, responsibilitiesTitles: "" })
                        }}
                    />
                    {
                        error?.responsibilitiesTitles ?
                            <FormHelperText sx={{ color: 'red' }}>{error?.responsibilitiesTitles}</FormHelperText>
                            : null
                    }

                </Grid>
            </Grid>

            <Typography
                mt={7}
                color="text.darkBlue"
                textAlign="center"
                variant="h3"
            >
                Skill & Experience
            </Typography>

            <Grid container spacing={3} mt={2}>
                <Grid item xs={12}>
                    <Skills
                        setSkillsList={setSkills}
                        skillsList={skills}
                        error={error}
                        setError={setError}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CSelect
                        listData={QUALIFICATION_LIST}
                        display="display"
                        value="key"
                        label="Qualification"
                        name="educationRequirements"
                        selectValue={inputData.educationRequirements}
                        onChange={handleInputChange}
                        error={error?.educationRequirements}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        label="Experience"
                        name="minExperienceYears"
                        type="number"
                        value={inputData.minExperienceYears}
                        onChange={handleInputChange}
                        error={error?.minExperienceYears}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    Year
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <Typography
                mt={7}
                color="text.darkBlue"
                textAlign="center"
                variant="h3"
            >
                Address
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button label="Add Address" onClick={() => setOpenAddOfficeLocationModal(true)} />
            </Box>

            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <AutoComplete
                        value={inputData.addressId}
                        label="Address"
                        options={addressList}
                        loading={addressLoading}
                        onOptionChange={onAddressOptionChange}
                        getOptionLabel={(option) =>
                            option
                                ? `${option?.completeAddress}`
                                : 'Search Address'
                        }
                        placeholder="Address"
                        error={error?.addressId}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        label="Country"
                        name="country"
                        value={inputData.country}
                        onChange={handleInputChange}
                        error={error?.country}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        label="City"
                        name="city"
                        value={inputData.city}
                        onChange={handleInputChange}
                        error={error?.city}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                <Button
                    label={updateId ? 'Update Post' : 'Post Now'}
                    style={{ fontSize: 20, px: 10 }}
                    onClick={handleCreateUpdateJob}
                    isLoading={createJobLoading}
                />
            </Box>

            <AddOfficeAddressModal
                isOpen={openAddOfficeAddressModal}
                setIsOpen={setOpenAddOfficeLocationModal}
                companyId={companyData?.me?.company?.id}
                refetch={addressRefetch}
            />

        </Box>
    );
};

export default PostAJob;
