import CModal from '@/common/CModal';
import Toaster from '@/common/Toaster';
import Button from '@/components/Common/UI/Button';
import CInput from '@/components/companyProfile/formElement/CInput';
import { EXPERIENCE_MUTATION, SINGLE_EXPERIENCE_QUERY } from '@/graphql/experiences/experiencesMutation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import JobResponsibilitiesListAndDescription from '@/components/ResumeSection/CreateUpdateResume/JobResponsibilitiesListAndDescription';
import { ALL_RESPONSIBILITIES_LIST } from '@/graphql/resume/resumeQuery';
import AddCompany from '@/components/ResumeSection/CreateUpdateResume/AddCompany';
import AddDesignation from '@/components/ResumeSection/CreateUpdateResume/AddDesignation';
import Input from '@/components/Common/Input';
import { useSearchParams } from 'next/navigation'



const EditExperiences = ({ open, onClose, data, refetch, ...props }) => {
    const [state, setState] = useState({
        responsibilitiesTitle: [],
        designationName: "",
        company: "",
        isCurrentlyWorking: false,
    });
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
    const [updateExperiences, { loading }] = useMutation(EXPERIENCE_MUTATION, {
        onCompleted: (data) => {

            refetch({
                variables: {
                    first: 3,
                }
            });

            Toaster({
                message: data?.cudExperience?.message,
                type: 'success',
            });

            onClose();
            // create state
            setState({
                responsibilitiesTitle: [],
                designationName: "",
                company: "",
                isCurrentlyWorking: false,
            });
        },
        onError: (error) => {
            Toaster({
                message: error.message,
                type: 'error',
            });
        },
    });

    const searchParams = useSearchParams()

    const [getExp, { loading: expLoading }] = useLazyQuery(SINGLE_EXPERIENCE_QUERY, {
        onCompleted: (data) => {
            setState((prev) => ({
                ...prev,
                ...data?.singleExperience,
                designationName: data?.singleExperience?.designation?.name,
                company: data?.singleExperience?.company?.name,
            }));
            if (data?.singleExperience?.responsibilities) {
                const responsibilities = data?.singleExperience?.responsibilities?.edges?.map((item) => item.node?.title);
                setState((prev) => ({
                    ...prev,
                    responsibilitiesTitle: responsibilities,
                }))
            };
        },
    })



    useEffect(() => {
        if (state?.designationName) {
            getResponsibilityTitles({
                variables: {
                    designation: state?.designationName
                },
            });
        }
    }, [state?.designationName]);

    const [errors, setErrors] = useState({
        company: '',
        country: '',
        designationName: '',
        responsibilitiesTitle: '',
        startDate: '',
    });


    const checkError = (name, value) => {

        switch (name) {
            case 'company':
                if (!value) {

                    return setErrors((prev) => ({
                        ...prev,
                        company: 'Company name required',
                    }));
                }
                return setErrors((prev) => ({
                    ...prev,
                    company: '',
                }));
            case 'country':
                if (!value) return setErrors((prev) => ({
                    ...prev,
                    country: 'Country name required',
                }));
                return setErrors((prev) => ({
                    ...prev,
                    country: '',
                }));
            case 'designationName':
                if (!value) return setErrors((prev) => ({
                    ...prev,
                    designationName: 'Designation name required',
                }));
                return setErrors((prev) => ({
                    ...prev,
                    designationName: '',
                }));
            case 'startDate':
                if (!value) return setErrors((prev) => ({
                    ...prev,
                    startDate: 'Start Date required',
                }));
                return setErrors((prev) => ({
                    ...prev,
                    startDate: '',
                }));
            case 'responsibilitiesTitle':
                if (value.length < 1) return setErrors((prev) => ({
                    ...prev,
                    responsibilitiesTitle: 'Responsibilities must be at least 1',
                }));

                return setErrors((prev) => ({
                    ...prev,
                    responsibilitiesTitle: '',
                }));
            default:
                break;
        }
    };
    const allErrors = Object.values(errors).filter((error) => error !== '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
        checkError(name, value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();


        // check all errors
        Object.keys(errors).forEach((key) => {
            checkError(key, state[key]);
        });


        if (allErrors.length === 0 && Object.keys(state).length > 4) {
            updateExperiences({
                variables: {
                    ...state,
                    company: state?.company,
                    designationName: state?.designationName,
                    responsibilitiesTitle: state.responsibilitiesTitle || [],
                    id: state.id,
                    isCurrentlyWorking: state?.isCurrentlyWorking,
                }
            });
        }
    };

    useEffect(() => {
        if (searchParams.get('expId')) {
            getExp({
                variables: {
                    id: searchParams.get('expId')
                }
            })
        } else {
            setState({
                responsibilitiesTitle: [],
                designationName: "",
                company: "",
                isCurrentlyWorking: false,
            })
        }
    }, [searchParams.get('expId')])


    return (
        <CModal maxWidth="lg"
            title=" Experience"
            onClose={onClose} open={open}>
            <Box sx={{ my: 5 }}>


                <Grid container mt={2} spacing={3}>
                    <Grid item xs={12} md={6}>
                        {/* <CInput
                            label="Designation"
                            name="designation"
                            placeholder="e.g. Software Enginner"
                            value={state?.designation?.name}
                            onChange={handleChange}
                            error={errors?.designation}
                        /> */}

                        <AddDesignation
                            label="Designation"
                            payload={state}
                            setPayload={setState}
                            error={errors}
                            setError={setErrors}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <AddCompany
                            payload={state}
                            setPayload={setState}
                            error={errors}
                            setError={setErrors}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="City"
                            name="city"
                            placeholder="e.g. Dubai"
                            value={state?.city || ''}
                            onChange={handleChange}

                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Country"
                            name="country"
                            placeholder="e.g. UAE"
                            value={state?.country || ''}
                            onChange={handleChange}
                            error={errors?.country}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Start Date"
                            name="startDate"
                            type="date"
                            value={state?.startDate}
                            onChange={handleChange}
                            error={errors?.startDate}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            onChange={handleChange}
                            label="End Date"
                            name="endDate"
                            type="date"
                            value={state?.endDate || ''}
                            disabled={state?.isCurrentlyWorking}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Input
                            label="I'm Currently working"
                            name="isCurrentlyStudying"
                            type="checkbox"
                            value={state?.isCurrentlyWorking}
                            checked={state?.isCurrentlyWorking}
                            onChange={() => setState((prev) => ({ ...prev, isCurrentlyWorking: !prev.isCurrentlyWorking }))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* <ExperiencesResponsibilitiesTitle
                            data={state}
                            handleAddResponsibleTitle={(e) => {
                                setState({
                                    ...state,
                                    responsibilitiesTitle: [...e],
                                })
                                checkError('responsibilitiesTitle', [...e]);
                            }}
                            errors={errors}
                        /> */}
                        <JobResponsibilitiesListAndDescription
                            valueName="title"
                            display="title"
                            designation={state?.designationName}
                            selectedList={state.responsibilitiesTitle || []}
                            handleAdd={(e) => {
                                setState({
                                    ...state,
                                    responsibilitiesTitle: [...e],
                                })
                                checkError('responsibilitiesTitle', [...e]);
                            }}
                            list={responsibilitiesListList?.responsibilitiesList?.edges?.map(
                                (el) => el.node,
                            )} />
                        <p
                            style={{
                                color: 'red',
                                fontSize: '0.75rem',
                            }}
                        >
                            {errors?.responsibilitiesTitle}
                        </p>
                    </Grid>
                </Grid>
            </Box>
            <Box my={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    onClick={handleSubmit}
                    label="Save"
                    disabled={expLoading || loading}
                    style={{ fontSize: 20, px: 10 }}
                />
            </Box>
        </CModal>
    );
};

export default EditExperiences;
