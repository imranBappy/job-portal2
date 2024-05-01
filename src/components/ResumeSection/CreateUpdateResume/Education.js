import AddNewSecion from '@/app/(resume)/resume/components/AddNewSecion/AddNewSecion';
import CDatePicker from '@/common/CDatePicker';
import CSelect from '@/common/CSelect';
import Toaster from '@/common/Toaster';
import {
    POST_EDUCATION
} from '@/graphql/resume/resumeMutation';
import {
    ALL_EDUCATIONAL_ACTIVITIES,
    ALL_UNIVERSITY_LIST,
} from '@/graphql/resume/resumeQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Add, Save } from '@mui/icons-material';
import { Box, FormHelperText, Grid } from '@mui/material';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BsBuilding } from 'react-icons/bs';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { ImLocation } from 'react-icons/im';
import Button from '../../Common/UI/Button';
import CInput from '../../companyProfile/formElement/CInput';
import CCheckbox from '../../companyProfile/formElement/CheckBox';
import ActivitiesList from './ActivitiesList';
import ResumeDetailCard from './ResumeDetailCard';
import ResumeDetailList from './ResumeDetailList';
import { CREATE_UNIVERSITY } from '../graphql/mutation';
import AddUniversity from './AddUniversity';

const DEGREE_TYPE = [
    { display: 'Online', key: 'online' },
    { display: 'On Campus', key: 'on_campus' },
];


const Education = ({
    error,
    setError,
    setEducationIds,
    educationIds,
    educationList,
    refetchEducationList
}) => {
    const [payload, setPayload] = useState({
        institution: '',
        city: '',
        country: '',
        degree: '',
        degreeType: '',
        subject: '',
        startDate: null,
        endDate: null,
        isCurrentlyStudying: false,
        activities: [],
    });
    const [showActivity, setShowActivity] = useState(false)
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
        setPayload({ ...payload, isCurrentlyStudying: e.target.checked });
        setError({ ...error, isCurrentlyStudying: '', endDate: "" });

    };

    const [getActivities, { data: activityList }] = useLazyQuery(ALL_EDUCATIONAL_ACTIVITIES, {
        nextFetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
        onError: (error) => {
            Toaster({
                type: 'error',
                message: error.message,
            });
        },
    });
    const [getUniversityList, { data: universityList, loading: universityLoading, refetch: refetchUniversityList }] = useLazyQuery(
        ALL_UNIVERSITY_LIST,
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

    const [addEducation, { loading }] = useMutation(POST_EDUCATION, {
        onCompleted: (res) => {
            Toaster({
                message: res?.cudEducation?.message,
                type: 'success',
            });
            setError({ ...error, education: '' });

            let educationId = res?.cudEducation?.obj?.id;

            if (!payload.id) {
                setEducationIds((prev) => [...prev, educationId]);

            }
            setPayload({
                institution: '',
                city: '',
                degree: '',
                degreeType: '',
                subject: '',
                startDate: null,
                country: '',
                endDate: null,
                isCurrentlyStudying: false,
                activities: [],
            });

            refetchEducationList()
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

        let errorObj = {}

        if (!payload.institution) {
            errorObj.institution = 'This field is required.'
        }
        if (!payload.degree) {
            errorObj.degree = 'This field is required.'
        }
        if (!payload.degreeType) {
            errorObj.degreeType = 'This field is required.'
        }
        if (!payload.startDate) {
            errorObj.startDate = 'This field is required.'
        }
        if (!payload.isCurrentlyStudying && !payload.endDate) {
            errorObj.endDate = 'This field is required.'
        }

        if (Object.keys(errorObj).length > 0) {
            setError(errorObj)
            return
        } else {
            setError({})
        }

        let input = { ...payload };


        input.startDate = typeof input.startDate === "object" ? moment(input?.startDate?.$d).format('YYYY-MM-DD') : input.startDate
        input.endDate = input.endDate
            ?
            typeof input.endDate === "object" ?
                moment(input.endDate?.$d).format('YYYY-MM-DD') : input.endDate
            : null;


        input.activities = input.activities?.map((item, key) => {
            return { [key]: item }
        })

        input.activities = JSON.stringify(input.activities)


        input.isCurrentlyStudying = input.endDate ? false : true;

        addEducation({ variables: { input } });
    };


    const handleEditEducation = (singleData) => {
        if (payload.id) {
            Toaster({
                type: 'error',
                message: "Please save previous education data."
            })
            return
        }
        setPayload({
            institution: singleData?.institution?.name ?? "",
            city: singleData?.city ?? "",
            degree: singleData?.degree ?? "",
            degreeType: singleData?.degreeType ? singleData?.degreeType?.toLowerCase() : "",
            subject: singleData?.subject ?? "",
            startDate: singleData?.startDate,
            country: singleData?.country ?? "",
            endDate: singleData?.endDate,
            isCurrentlyStudying: singleData?.isCurrentlyStudying,
            activities: singleData?.activities && JSON.parse(singleData?.activities) ?
                JSON.parse(singleData?.activities)?.map((item) => Object.values(item)[0])
                : [],
            id: singleData?.id
        });
        setShowAddForm(true)
    };


    const handleAddActivity = (item) => {
        setPayload({ ...payload, activities: item });
    };


    const handleSelectEducation = (id) => {
        if (educationIds.includes(id)) {
            setEducationIds((prev) => prev.filter((item) => item !== id))
        }
        else {
            setEducationIds((prev) => [...prev, id])
        }
        setError({ ...error, education: "" })
    }

    useEffect(() => {
        getActivities()
    }, []);

    return (
        <Box sx={{ mt: 3 }}>
            {educationList.length > 0
                ? educationList?.map((item, key) => (
                    <ResumeDetailCard
                        data={item}
                        key={`education_list_${key}`}
                        handleEdit={handleEditEducation}
                    >
                        <CCheckbox value={educationIds.includes(item.id)} onChange={() => handleSelectEducation(item.id)} />
                        <Box>
                            <ResumeDetailList
                                icon={<BsBuilding fontSize={20} />}
                                label={item.institution?.name ?? "-"}
                            />
                            <ResumeDetailList
                                icon={<ImLocation fontSize={20} />}
                                label={`${item.city ? `${item.city} ,` : ''} ${item.country ? item.country : ''
                                    }`}
                            />
                            <ResumeDetailList
                                icon={<HiOutlineNewspaper fontSize={20} />}
                                label={item.degree}
                            />
                        </Box>
                    </ResumeDetailCard>
                ))
                : null}

            {showAddForm || educationList?.length === 0 ?
                <Box sx={{ mt: 5 }}>
                    <Grid container spacing={2.4} >
                        <Grid item xs={12} md={6}>
                            <AddUniversity
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
                                onChange={handleInputChange}
                                value={payload.city}
                                error={error?.city}
                                placeholder="e.g. Dubai"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                name="country"
                                label="Country"
                                onChange={handleInputChange}
                                value={payload.country}
                                error={error?.country}
                                placeholder="e.g. Country"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                name="degree"
                                label="Degree"
                                value={payload.degree}
                                error={error?.degree}
                                onChange={handleInputChange}
                                placeholder="e.g. Berkeley"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CSelect
                                listData={DEGREE_TYPE}
                                name="degreeType"
                                label="Degree Type"
                                value="key"
                                display="display"
                                selectValue={payload.degreeType}
                                error={error?.degreeType}
                                placeholder="e.g. Berkeley"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                name="subject"
                                label="Subject"
                                value={payload.subject}
                                error={error?.subject}
                                onChange={handleInputChange}
                                placeholder="e.g. Human Interface"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CDatePicker
                                name="institute"
                                label="Start Date"
                                views={['year', 'month']}
                                value={
                                    payload.startDate ? dayjs(payload.startDate) : null
                                }
                                error={error?.startDate}
                                maxDate={dayjs(new Date())}
                                onChange={(e) => handleDateChange(e, 'startDate')}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <CDatePicker
                                name="institute"
                                views={['year', 'month']}
                                disabled={payload.isCurrentlyStudying}
                                label="End Date"
                                value={payload.endDate ? dayjs(payload.endDate) : null}
                                maxDate={dayjs(new Date())}
                                minDate={
                                    payload.startDate ? dayjs(payload.startDate) : null
                                }
                                error={error?.endDate}
                                onChange={(e) => handleDateChange(e, 'endDate')}
                            />
                        </Grid>
                    </Grid>
                    <CCheckbox
                        value={payload.isCurrentlyStudying}
                        onChange={handleCheckBoxChange}
                        sx={{ mt: 2 }}
                        label="I'm Currently studing"
                    />

                    <Box sx={{ mt: 4 }}>
                        <AddNewSecion
                            openLinks={showActivity}
                            setOpenLinks={setShowActivity}
                            label="Add description to this section"
                        />

                        {showActivity ?
                            <ActivitiesList
                                selectedList={payload.activities}
                                handleAdd={handleAddActivity}
                                list={activityList?.educationalActivities?.edges?.map(
                                    (el) => el.node,
                                )} />
                            : null}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            mt: "48px",
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
                            label="Save & add more education"
                        />

                    </Box>
                </Box>
                : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={() => setShowAddForm(true)}
                        variant="outlined"
                        sx={{
                            fontSize: '22px',
                            fontWeight: 700,
                            margin: "auto"
                        }}
                        startIcon={<Add />}
                        label="Add Another Education "
                    />
                </Box>}
            {error?.education ? (
                <FormHelperText sx={{ color: 'red', textAlign: 'center', mt: 2 }}>
                    {error?.education}
                </FormHelperText>
            ) : null}
        </Box>
    );
};

export default Education;
