'use client';
import AddNewSecion from '@/app/(resume)/resume/components/AddNewSecion/AddNewSecion';
import CDatePicker from '@/common/CDatePicker';
import Toaster from '@/common/Toaster';
import {
    POST_EXPERIENCE
} from '@/graphql/resume/resumeMutation';
import {
    ALL_RESPONSIBILITIES_LIST
} from '@/graphql/resume/resumeQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Add, Save } from '@mui/icons-material';
import { Box, FormHelperText, Grid } from '@mui/material';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { ImLocation } from 'react-icons/im';
import { MdOutlineWorkOutline } from 'react-icons/md';
import Button from '../../Common/UI/Button';
import CInput from '../../companyProfile/formElement/CInput';
import CCheckbox from '../../companyProfile/formElement/CheckBox';
import AddCompany from './AddCompany';
import AddDesignation from './AddDesignation';
import JobResponsibilitiesListAndDescription from './JobResponsibilitiesListAndDescription';
import ResumeDetailCard from './ResumeDetailCard';
import ResumeDetailList from './ResumeDetailList';

const Experience = ({
    error,
    setError,
    setWorkExperienceIds,
    workExperienceIds,
    experienceList,
    refetchWorkExperienceList
}) => {
    const [showResponsibilities, setShowResponsibilities] = useState(false)
    const [payload, setPayload] = useState({
        designationName: '',
        city: '',
        company: '',
        country: '',
        subject: '',
        startDate: null,
        endDate: null,
        isCurrentlyWorking: false,
        responsibilitiesTitle: [],
    });
    const [showAddForm, setShowAddForm] = useState(false)

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
        setError({ ...error, [name]: '' });
    };
    const handleDateChange = (value, name) => {
        setPayload({ ...payload, [name]: value });
        setError({ ...error, [name]: '' });
    };
    const handleCheckBoxChange = (e) => {
        setPayload({ ...payload, isCurrentlyWorking: e.target.checked });
        setError({ ...error, isCurrentlyWorking: '', endDate: "" });
    };


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



    const [addWorkExperience, { loading }] = useMutation(POST_EXPERIENCE, {
        onCompleted: (res) => {
            Toaster({
                message: res?.cudExperience?.message,
                type: 'success',
            });
            setError({ ...error, workExperience: '' });

            let workExperienceId = res?.cudExperience?.obj?.id;

            if (!payload.id) {
                setWorkExperienceIds((prev) => [...prev, workExperienceId]);

            }

            setPayload({
                designationName: '',
                city: '',
                company: '',
                country: '',
                subject: '',
                startDate: null,
                endDate: null,
                isCurrentlyWorking: false,
                responsibilitiesTitle: [],
            });

            refetchWorkExperienceList()
            setShowAddForm(false)
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

    const handleSaveData = () => {
        if (!payload.designationName) {
            setError({ ...error, designationName: 'This field is required.' });
            return;
        }
        if (!payload.company) {
            setError({ ...error, company: 'This field is required.' });
            return;
        }
        if (!payload.country) {
            setError({ ...error, country: 'This field is required.' });
            return;
        }
        if (!payload.startDate) {
            setError({ ...error, startDate: 'This field is required.' });
            return;
        }

        if (!payload.isCurrentlyWorking && !payload.endDate) {
            setError({ ...error, endDate: 'This field is required.' });
            return;
        }
        if (payload.responsibilitiesTitle.length === 0) {
            setError({
                ...error,
                responsibilitiesTitle: 'Atleast one Responsibilities Title is required.',
            });
            return;
        }

        let input = { ...payload };


        input.startDate = typeof input.startDate === "object" ? moment(input?.startDate?.$d).format('YYYY-MM-DD') : input.startDate
        input.endDate = input.endDate
            ?
            typeof input.endDate === "object" ?
                moment(input.endDate?.$d).format('YYYY-MM-DD') : input.endDate
            : null;

        input.isCurrentlyWorking = input.endDate ? false : true;
        addWorkExperience({ variables: input });
    };

    const handleEditWorkExperience = (singleData) => {
        if (payload.id) {
            Toaster({
                type: 'error',
                message: "Please save previous work experience data."
            })
            return
        }

        setPayload({
            designationName: singleData?.designation?.name ?? "",
            city: singleData?.city ?? "",
            company: singleData?.company?.name ?? "",
            country: singleData?.country ?? "",
            startDate: singleData?.startDate,
            endDate: singleData?.endDate,
            isCurrentlyWorking: singleData?.isCurrentlyWorking,
            responsibilitiesTitle: singleData?.responsibilities?.edges?.map((item) => item?.node?.title),
            id: singleData.id
        });
        setShowAddForm(true)

    };

    const handleAddResponsibleTitle = (item) => {
        setPayload({ ...payload, responsibilitiesTitle: item });
        setError({ ...error, responsibilitiesTitle: "" })
    };


    const handleSelectExperience = (id) => {
        if (workExperienceIds.includes(id)) {
            setWorkExperienceIds((prev) => prev.filter((item) => item !== id))
        }
        else {
            setWorkExperienceIds((prev) => [...prev, id])
        }
    }


    useEffect(() => {
        if (payload.designationName) {
            getResponsibilityTitles({
                variables: {
                    designation: payload.designationName
                },
            });
        }
    }, [payload]);

    return (
        <>
            {experienceList.length > 0
                ? experienceList?.map((item, key) => (
                    <ResumeDetailCard
                        data={item}
                        key={`workExperience_list_${key}`}
                        handleEdit={handleEditWorkExperience}
                    >
                        <CCheckbox value={workExperienceIds.includes(item.id)} onChange={() => handleSelectExperience(item.id)} />
                        <Box>
                            <ResumeDetailList
                                icon={<MdOutlineWorkOutline fontSize={20} />}
                                label={item.designation?.name}
                            />
                            <ResumeDetailList
                                icon={<ImLocation fontSize={20} />}
                                label={`${item.city ? `${item.city} , ` : ''} ${item.country ? item.country : ''
                                    }`}
                            />
                            <ResumeDetailList
                                icon={<HiOutlineNewspaper fontSize={20} />}
                                label={item.company?.name}
                            />
                        </Box>
                    </ResumeDetailCard>
                ))
                : null}
            {showAddForm || experienceList?.length === 0
                ?
                <>
                    <Grid container spacing={2.4} mt={2}>
                        <Grid item xs={12} md={6}>
                            <AddDesignation
                                payload={payload}
                                setPayload={setPayload}
                                error={error}
                                setError={setError}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <AddCompany
                                payload={payload}
                                setPayload={setPayload}
                                error={error}
                                setError={setError}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                name="city"
                                label="City"
                                value={payload.city}
                                error={error?.city}
                                onChange={handleInputChange}
                                placeholder="e.g. Dubai"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                name="country"
                                label="Country"
                                value={payload.country}
                                error={error?.country}
                                onChange={handleInputChange}
                                placeholder="e.g. UAE"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CDatePicker
                                views={['year', 'month']}
                                label="Start Date"
                                value={
                                    payload.startDate ? dayjs(payload.startDate) : null
                                }
                                error={error?.startDate}
                                maxDate={dayjs(new Date())}
                                onChange={(e) => handleDateChange(e, 'startDate')}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CDatePicker
                                views={['year', 'month']}
                                label="End Date"
                                disabled={payload.isCurrentlyWorking}
                                value={payload.endDate ? dayjs(payload.endDate) : null}
                                minDate={
                                    payload.startDate ? dayjs(payload.startDate) : null
                                }
                                maxDate={dayjs(new Date())}
                                error={error?.endDate}
                                onChange={(e) => handleDateChange(e, 'endDate')}
                            />
                        </Grid>
                    </Grid>
                    <CCheckbox
                        value={payload.isCurrentlyWorking}
                        onChange={handleCheckBoxChange}
                        sx={{ mt: 2, mb: 4 }}
                        label="I'm Currently working"
                    />

                    <AddNewSecion
                        openLinks={showResponsibilities}
                        setOpenLinks={setShowResponsibilities}
                        label="Add description to this section"
                    />

                    {showResponsibilities ?
                        <JobResponsibilitiesListAndDescription
                            designation={payload.designationName}
                            selectedList={payload.responsibilitiesTitle}
                            handleAdd={handleAddResponsibleTitle}
                            list={responsibilitiesListList?.responsibilitiesList?.edges?.map(
                                (el) => el.node,
                            )}
                            clearError={() => {
                                console.log('hello')
                                setError({ ...error, responsibilitiesTitle: "" })
                            }}
                        />
                        : null}

                    {error?.responsibilitiesTitle ?
                        <FormHelperText sx={{ color: 'red' }}>{error?.responsibilitiesTitle}</FormHelperText>
                        : null}


                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            mt: 4,
                            flexDirection: 'column',
                        }}
                    >
                        <Button
                            isLoading={loading}
                            onClick={handleSaveData}
                            startIcon={<Save />}
                            style={{
                                padding: '10px 25px',
                                fontSize: '20px',
                            }}
                            variant="contained"
                            color="primary"
                            label="Save & add more work experience"
                        />
                        {error?.workExperience ? (
                            <FormHelperText sx={{ color: 'red' }}>
                                {error?.workExperience}
                            </FormHelperText>
                        ) : null}
                    </Box>

                </>
                : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={() => setShowAddForm(true)}
                        color="inherit"
                        variant="outlined"
                        sx={{
                            fontSize: '22px',
                            fontWeight: 700,
                            margin: "auto"
                        }}
                        startIcon={<Add />}
                        label="Add Another Work Experience"
                    />
                </Box>}
        </>
    );
};

export default Experience;
