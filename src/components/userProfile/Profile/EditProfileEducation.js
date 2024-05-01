"use client"

import CModal from '@/common/CModal';
import CSelect from '@/common/CSelect';
import Toaster from '@/common/Toaster';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/UI/Button';
import CInput from '@/components/companyProfile/formElement/CInput';
import { EDUCATION_MUTATION, SINGLE_EDUCATION_QUERY } from '@/graphql/education/educationMutation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EducationActivitiesSocieties from './EducationActivitiesSocieties';
import { activitiesConverter } from '@/utils/converter';
import AddUniversity from '@/components/ResumeSection/CreateUpdateResume/AddUniversity';
import { useSearchParams, } from 'next/navigation'


const DEGREE_TYPE = [
    { display: 'Online', key: 'online' },
    { display: 'On Campus', key: 'on_campus' },
];



const EditProfileEducation = ({ open, onClose, refetch }) => {
    const [education, setEducation] = useState({
        institution: "",
        subject: '',
        degree: '',
        city: '',
        country: '',
        startDate: '',
        endDate: '',
        isCurrentlyStudying: false,
        degreeType: 'on_campus',
        activities: [],
    });
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [getEdu] = useLazyQuery(
        SINGLE_EDUCATION_QUERY,
        {
            onCompleted: ({ singleEducation }) => {
                const newData = {
                    id: singleEducation?.id || '',
                    activities: activitiesConverter(singleEducation?.activities),
                    degreeType: singleEducation?.degreeType?.toLowerCase(),
                    institution: singleEducation?.institution?.name || '',
                    subject: singleEducation?.subject || '',
                    degree: singleEducation?.degree || '',
                    city: singleEducation?.city || '',
                    country: singleEducation?.country || '',
                    startDate: singleEducation?.startDate || '',
                    endDate: singleEducation?.endDate || '',
                    isCurrentlyStudying: singleEducation?.isCurrentlyStudying || false,
                };
                setEducation(newData);
                setIsLoading(false);
            },
            onError: (error) => {
                setIsLoading(false);
                Toaster({
                    message: 'Something went wrong',
                    type: 'error',
                });
            }
        }

    )

    const [updateEducation, { loading }] = useMutation(EDUCATION_MUTATION, {
        onCompleted: (res) => {
            Toaster({
                message: res?.cudEducation?.message,
                type: 'success',
            });
            refetch();
            onClose();
            // clear state
            setEducation({
                institution: "",
                subject: '',
                degree: '',
                city: '',
                country: '',
                startDate: '',
                endDate: '',
                isCurrentlyStudying: false,
                degreeType: 'on_campus',
                activities: [],
            });
        },
        onError: (error) => {
            Toaster({
                message: error.message,
                type: 'error',
            });
        },
    });

    const [errors, setErrors] = useState({
        degree: '',
        startDate: '',
        institution: '',
    });



    const checkError = (name, value) => {
        switch (name) {
            case 'degree':
                if (!value) return setErrors({
                    ...errors,
                    degree: 'Degree is required',
                });
                return setErrors((errors) => ({
                    ...errors,
                    degree: '',
                }));
            case 'startDate':
                if (!value) return setErrors((errors) => ({
                    ...errors,
                    startDate: 'Start date is required',
                }));
                const startDate = new Date(value);
                const currentDate = new Date();
                if (startDate > currentDate) return setErrors((errors) => ({
                    ...errors,
                    startDate: 'Please enter validate date!',
                }))
                return setErrors((errors) => ({
                    ...errors,
                    startDate: '',
                }));

            case 'endDate':
                const eduStartDate = new Date(education?.startDate);
                const endDate = new Date(value);
                if (eduStartDate > endDate) return setErrors((errors) => ({
                    ...errors,
                    endDate: 'Please enter validate date!',
                }))
                return setErrors((errors) => ({
                    ...errors,
                    endDate: '',
                }));

            case 'institution':
                if (!value) return setErrors((errors) => ({
                    ...errors,
                    institution: 'Institution is required',
                }));
                return setErrors((errors) => ({
                    ...errors,
                    institution: '',
                }));
            default:
                break;
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'isCurrentlyStudying') {
            setEducation({
                ...education,
                [name]: e.target.checked,
                endDate: e.target.checked ? '' : education?.endDate,
            });
            return;
        }

        setEducation({
            ...education,
            [name]: value,
        });

        checkError(name, value);
    };




    const handleSubmit = () => {
        // check error
        Object.keys(errors).forEach((key) => {
            checkError(key, education[key]);
        });


        const newEducation = {
            ...education,
            activities: activitiesConverter(education?.activities),
            isCurrentlyStudying: education.endDate ? false : true,
            institution: education?.institution,
            degreeType: education?.degreeType ? education?.degreeType?.toLowerCase() : "on_campus"
        }


        // remove empty fields
        Object.keys(newEducation).forEach((key) => {
            if (!newEducation[key]) {
                delete newEducation[key];
            }
        });

        if (
            newEducation.institution && newEducation.degree && newEducation.startDate
        ) {
            updateEducation({
                variables: {
                    input: newEducation,
                },
            });
        }
    };


    useEffect(() => {
        if (searchParams.get('eduId')) {
            setIsLoading(true);
            getEdu({
                variables: {
                    id: searchParams.get('eduId')
                }
            })
        } else {
            setIsLoading(false);
            // clear state
            setEducation({
                institution: "",
                subject: '',
                degree: '',
                city: '',
                country: '',
                startDate: '',
                endDate: '',
                isCurrentlyStudying: false,
                degreeType: 'on_campus',
                activities: [],
            });
        }

    }, [searchParams])




    return (
        <CModal

            maxWidth="lg"
            title="Education"
            onClose={onClose} open={open}

        >
            <Box sx={{ my: 5 }}>

                <Grid container mt={2} spacing={3}>
                    <Grid item xs={12} md={6}>


                        <AddUniversity
                            payload={education}
                            setPayload={setEducation}
                            error={errors}
                            setError={setErrors}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Subject"
                            name="subject"
                            placeholder="e.g. Software Enginnering"
                            value={education?.subject}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Degree"
                            name="degree"
                            placeholder="e.g. Bachelors"
                            value={education?.degree}
                            onChange={handleChange}
                            error={errors?.degree}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <CSelect
                            listData={DEGREE_TYPE}
                            name="degreeType"
                            label="Degree Type"
                            value="key"
                            display="display"
                            selectValue={education.degreeType}
                            error={errors?.degreeType}
                            placeholder="e.g. Berkeley"
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <CInput
                            label="City"
                            name="city"
                            placeholder="e.g. Dubai"
                            value={education?.city || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Country"
                            name="country"
                            placeholder="e.g. UAE"
                            value={education?.country || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Start Date"
                            name="startDate"
                            type="date"
                            value={education?.startDate}
                            onChange={handleChange}
                            error={errors?.startDate}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="End Date"
                            name="endDate"
                            type="date"
                            value={education?.endDate || ''}
                            onChange={handleChange}
                            error={errors?.endDate || ''}
                            disabled={education?.isCurrentlyStudying}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Input
                            label="Are you currently studing"
                            name="isCurrentlyStudying"
                            type="checkbox"
                            value={education?.isCurrentlyStudying}
                            checked={education?.isCurrentlyStudying}
                            onChange={handleChange}
                        />
                    </Grid>

                    <EducationActivitiesSocieties data={education} setEducation={setEducation} />


                    {/* <Grid item xs={12}>
                        <CTextArea
                            onChange={handleChange}
                            name="activities"
                            value={education?.activities || ''}
                            label="Activities"
                            minRow={6}
                        />
                    </Grid> */}
                </Grid>
            </Box>
            <Box my={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    onClick={handleSubmit}
                    isLoading={loading || isLoading}
                    label="Save"
                    style={{ fontSize: 20, px: 10 }}
                />
            </Box>
        </CModal>
    );
};

export default EditProfileEducation;
