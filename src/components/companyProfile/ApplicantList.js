import { Box, Popper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '../Common/UI/Button';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_ALL_JOB_APPLIED_CANDIDATE_LIST, GET_ALL_JOB_LIST } from './graphql/query';
import Toaster from '@/common/Toaster';
import moment from 'moment';
import { getFilteredValue, getMonthAndYear } from '@/utils';
import { CANDIDATE_APPLICATION_ACTION } from './graphql/mutation';
import Image from 'next/image';
import { Images } from '@/utils/imagePath';
import CommonPagination from '@/common/DataTable/CommonPagination';
import FilterInput from '@/common/FilterElements/FilterInput';
import FilterDatePicker from '@/common/FilterElements/FilterDatePicker';
import ClearFilterButton from '@/common/FilterElements/ClearFilterButton';
import useDebounce from '@/utils/useDebounce';
import { useFilterForm } from '@/common/FilterElements/FilterForm';
import AutoComplete from '@/common/AutoComplete';
import CandidateApplication from './ShortlistResume/CandidateApplication';
import CircularLoader from '../Loader/CircularLoader';

const INITIAL_STATE = {
    name: { type: 'text', value: '' },
    title: { type: 'text', value: '' },
    endDate: { type: 'text', value: null },
    startDate: { type: 'text', value: null },
};

const ApplicantList = ({ initialFilter, setTotalApplicantCount, hideFilter, isShowFilter = false }) => {
    const { filter, setFilter } = useFilterForm(INITIAL_STATE);

    const [jobRole, setJobRole] = useState(null)
    const [page, setPage] = useState(1);
    const [shortListanchorEl, setAnchorEl] = useState(null);
    const [RejectanchorEl, setRejectAnchorEl] = useState(null);
    const [applicantActionId, setApplicantActionId] = useState(null);
    const [status, setStatus] = useState('');


    const [isOpenApplication, setIsOpenApplication] = useState(false)
    const [singleCandidateId, setSingleCandidateId] = useState(null)


    const handleOpenApplication = (applicationData) => {
        setIsOpenApplication(true)
        setSingleCandidateId(applicationData)
    }


    const handleShortListClick = (event, id) => {
        setAnchorEl(shortListanchorEl ? null : event.currentTarget);
        setApplicantActionId(id);
    };
    const handleRejectClick = (event, id) => {
        setRejectAnchorEl(RejectanchorEl ? null : event.currentTarget);
        setApplicantActionId(id);
    };

    const openShortListPopup = Boolean(shortListanchorEl);
    const shortListId = openShortListPopup ? 'simple-popper' : undefined;

    const openRejectPopup = Boolean(RejectanchorEl);
    const rejectId = openRejectPopup ? 'reject-popper' : undefined;

    const { fetchMore, data, loading, refetch } = useQuery(
        GET_ALL_JOB_APPLIED_CANDIDATE_LIST,
        {
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
            variables: {
                ...initialFilter,
                ...(status && { status }),
            },
            onCompleted: (res) => {
                if (setTotalApplicantCount) {
                    setTotalApplicantCount(res?.candidateList?.totalCount);
                }
            },
            onError: (err) => {
                Toaster({
                    type: 'error',
                    message: err.message,
                });
            },
        },
    );


    const [getAllJobList, { data: jobList, loading: jobLoading }] =
        useLazyQuery(GET_ALL_JOB_LIST, {
            fetchPolicy: 'network-only',
            variables: { first: 10 },
            onError: (error) => {
                Toaster({
                    type: 'error',
                    message: error.message,
                });
            },
        });

    const [candidateApplicationAction] =
        useMutation(CANDIDATE_APPLICATION_ACTION, {
            onCompleted: (res) => {
                Toaster({
                    type: 'success',
                    message: res.candidateAction.message,
                });
                refetch();
            },
            onError: (error) => {
                Toaster({
                    type: 'error',
                    message: error.message,
                });
            },
        });

    const handleCandidateApplication = (status) => {
        candidateApplicationAction({
            variables: {
                candidateId: applicantActionId,
            },
        }).then(() => {
            if (status === 'rejected') {
                handleRejectClick();
            } else {
                handleShortListClick();
            }
        });
    };

    const fetchMoreData = async (variables) => {
        await fetchMore({
            variables: { ...variables, ...(status && { status }) },
        });
    };

    const debounceFunction = useDebounce((value) => fetchMoreData(value), 500);

    const onClearFilter = () => {
        setFilter(INITIAL_STATE);
        fetchMore({
            variables: {
                first: 20,
            },
        });
    };

    const onChangeDebounce = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'type' && value === '') {
            onClearFilter();
            return;
        }

        let key = name;
        setFilter((state) => ({
            ...filter,
            [key]: { ...state[key], value: value },
        }));

        debounceFunction(
            getFilteredValue({
                ...filter,
                [key]: { ...filter[key], value: value },
            }),
        );
    };

    const onSelectChangeDebounce = (e, type) => {
        setFilter((state) => ({
            ...filter,
            [type]: { ...state[type], value: e },
        }));

        debounceFunction(
            getFilteredValue({
                ...filter,
                [type]: { ...filter[type], value: e },
            })
        );
    };


    const onJobRoleOptionChange = (event, value, reason) => {
        setJobRole(value)
        onSelectChangeDebounce(value?.title, "title");
    };

    const onJobRoleQueryChange = (e) => {
        getAllJobList({
            variables: {
                title: e.target.value,
                first: 10
            },
        });
    };

    const onDateChangeDebounce = (e, type) => {
        setFilter((state) => ({
            ...filter,
            [type]: {
                ...state[type],
                value: moment(e?.$d).format('YYYY-MM-DD'),
            },
        }));

        debounceFunction(
            getFilteredValue({
                ...filter,
                [type]: {
                    ...filter[type],
                    value: moment(e?.$d).format('YYYY-MM-DD'),
                },
            }),
        );
    };


    useEffect(() => {
        getAllJobList()
    }, [])


    return (
        <Box>
            {!hideFilter ? <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <FilterInput
                    label="Candidate Name"
                    name="name"
                    value={filter['name'].value}
                    onChange={onChangeDebounce}
                />
                <AutoComplete
                    value={jobRole}
                    inputLabel="Job title"
                    options={jobList?.recruiterPosts?.edges?.map(
                        (el) => el.node,
                    )}
                    size="small"
                    style={{
                        width: 220, '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderRadius: 10,
                            },
                        },
                    }}
                    onOptionChange={onJobRoleOptionChange}
                    onQueryChange={onJobRoleQueryChange}
                    loading={jobLoading}
                    getOptionLabel={(option) =>
                        option ? `${option?.title}` : 'Search Job title'
                    }
                    placeholder="Job title"
                />

                {/* <FilterInput
                    label="Job Role"
                    name="jobRole"
                    value={filter['jobRole'].value}
                    onChange={onChangeDebounce}
                /> */}
                <FilterDatePicker
                    label="Applied Start Date"
                    value={filter['startDate'].value}
                    onChange={(e) => onDateChangeDebounce(e, 'startDate')}
                />
                <FilterDatePicker
                    label="Applied End Date"
                    value={filter['endDate'].value}
                    onChange={(e) => onDateChangeDebounce(e, 'endDate')}
                />
                <ClearFilterButton onClick={onClearFilter} />

            </Box> : null}
            {
                isShowFilter && (<Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        my: 3,
                        gap: 5,
                        flexWrap: 'wrap',
                    }}
                >


                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                            flexWrap={{
                                xs: 'wrap',
                                lg: 'nowrap',
                            }}
                        >
                            <Button
                                onClick={() => setStatus("")}
                                variant={status === "" ? "contained" : "outlined"}
                                color="main"
                                style={{
                                    minWidth: 150,
                                    height: 50,
                                    borderRadius: 1,
                                    marginRight: 2,
                                    fontWeight: 700,
                                    fontSize: 16,
                                    border: 2,
                                    borderColor: '#017EF3',
                                    '&:hover': {
                                        backgroundColor: '#017EF3',
                                        color: '#fff',
                                    }
                                }}
                                label="All"
                            />

                            <Button
                                onClick={() => setStatus("SELECTED")}
                                variant={status === "SELECTED" ? "contained" : "outlined"}
                                color="main"
                                style={{
                                    minWidth: 150,
                                    height: 50,
                                    borderRadius: 1,
                                    marginRight: 2,
                                    fontWeight: 700,
                                    fontSize: 16,
                                    border: 2,
                                    borderColor: '#017EF3',
                                    '&:hover': {
                                        backgroundColor: '#017EF3',
                                        color: '#fff',

                                    }
                                }}
                                label="Shortlisted"
                            />
                            <Button
                                onClick={() => setStatus("PENDING")}
                                variant={status === "PENDING" ? "contained" : "outlined"}

                                color="main"
                                style={{
                                    minWidth: 150,
                                    height: 50,
                                    borderRadius: 1,
                                    marginRight: 2,
                                    fontWeight: 700,
                                    fontSize: 16,
                                    border: 2,
                                    borderColor: '#017EF3',
                                    '&:hover': {
                                        backgroundColor: '#017EF3',
                                        color: '#fff',
                                    }
                                }}
                                label="Pending"
                            />

                            <Button
                                onClick={() => setStatus("REJECTED")}
                                variant={status === "REJECTED" ? "contained" : "outlined"}
                                color="main"
                                style={{
                                    minWidth: 150,
                                    height: 50,
                                    borderRadius: 1,
                                    marginRight: 2,
                                    fontWeight: 700,
                                    fontSize: 16,
                                    border: 2,
                                    borderColor: '#017EF3',
                                    '&:hover': {
                                        backgroundColor: '#017EF3',
                                        color: '#fff',

                                    }
                                }}
                                label="Rejected"
                            />

                        </Box>


                    </Box>
                </Box>)
            }



            {loading ?
                <Box sx={{ height: "20vh" }}>
                    <CircularLoader />
                </Box>
                : data?.candidateList?.edges?.length > 0
                    ? data?.candidateList?.edges?.map((item, key) => (
                        <Box

                            key={`applicant_list_${key}`}
                            sx={{
                                bgcolor: 'primary.extraLight',
                                p: 3,
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 2,
                                flexWrap: 'wrap',
                                gap: 2
                            }}
                        >
                            <Box
                                onClick={() => handleOpenApplication(item.node.id)}
                                sx={{
                                    display: 'flex',
                                    gap: 3,
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 64,
                                        width: 64,
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        position: 'relative',
                                    }}
                                >
                                    <Image
                                        src={
                                            item?.node?.resume?.profile?.photoUrl
                                                ? item?.node?.resume?.profile
                                                    ?.photoUrl
                                                : Images.NO_IMAGE
                                        }
                                        alt="applicant profile"
                                        layout='fill'
                                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: 'primary.main',
                                        }}
                                        variant="bodyLarge"
                                    >
                                        {item?.node?.resume?.profile?.firstName}{' '}
                                        {item?.node?.resume?.profile?.lastName ?? ''}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            mt: 0.5,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "16px",
                                                fontWeight: 600,
                                                color: 'text.darkBlue',
                                            }}
                                        >
                                            {item?.node?.job?.title ?? "-"}
                                        </Typography>
                                        {item?.node?.resume?.education?.edges
                                            ?.length > 0 ? (
                                            <Typography
                                                sx={{
                                                    color: 'text.lightBlue',
                                                }}
                                                variant="bodyNormal"
                                            >
                                                {item?.node?.resume?.education
                                                    ?.edges[0]?.node?.institution
                                                    ?.name ?? '-'}
                                            </Typography>
                                        ) : (
                                            '-'
                                        )}

                                        <Typography
                                            sx={{
                                                color: 'text.darkBlue',
                                            }}
                                            variant="bodyNormal"
                                        >
                                            Applied On:{' '}
                                            <Typography
                                                sx={{ color: 'text.lightBlue' }}
                                                variant="span"
                                            >
                                                {moment(
                                                    item?.node?.dateCreated,
                                                ).format('DD MMM, YYYY')}
                                            </Typography>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {item?.node?.resume?.experience?.edges?.length > 0 ? (
                                <Box>
                                    <Typography
                                        variant="bodyNormal"
                                        sx={{
                                            color: 'text.darkBlue',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {
                                            item?.node?.resume?.experience
                                                ?.edges[0]?.node?.company?.name
                                        }
                                    </Typography>
                                    <Box
                                        sx={{
                                            ml: 2,
                                            mt: 1,
                                            color: 'text.secondary',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 0.5,
                                        }}
                                    >
                                        <li>
                                            Experience:{' '}
                                            {getMonthAndYear(
                                                item?.node?.resume?.experience
                                                    ?.edges[0]?.node?.startDate,
                                                item?.node?.resume?.experience
                                                    ?.edges[0]?.node?.endDate,
                                            )?.years == 0
                                                ? getMonthAndYear(
                                                    item?.node?.resume
                                                        ?.experience?.edges[0]
                                                        ?.node?.startDate,
                                                    item?.node?.resume
                                                        ?.experience?.edges[0]
                                                        ?.node?.endDate,
                                                )?.months + ' Months'
                                                : getMonthAndYear(
                                                    item?.node?.resume
                                                        ?.experience?.edges[0]
                                                        ?.node?.startDate,
                                                    item?.node?.resume
                                                        ?.experience?.edges[0]
                                                        ?.node?.endDate,
                                                )?.years +
                                                'Years , ' +
                                                getMonthAndYear(
                                                    item?.node?.resume
                                                        ?.experience?.edges[0]
                                                        ?.node?.startDate,
                                                    item?.node?.resume
                                                        ?.experience?.edges[0]
                                                        ?.node?.endDate,
                                                )?.months +
                                                ' Months'}
                                        </li>
                                        <li>
                                            Location :  {
                                                item?.node?.resume?.experience
                                                    ?.edges[0]?.node?.city
                                            }
                                            {
                                                item?.node?.resume?.experience
                                                    ?.edges[0]?.node?.country
                                            }
                                        </li>
                                    </Box>
                                </Box>
                            ) : (
                                '-'
                            )}

                            {item?.node?.status === 'PENDING' ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                    }}
                                >
                                    <Button
                                        aria-describedby={shortListId}
                                        onClick={(e) =>
                                            handleShortListClick(e, item.node.id)
                                        }
                                        label="Shortlist"
                                    />
                                    <Button
                                        aria-describedby={rejectId}
                                        onClick={(e) =>
                                            handleRejectClick(e, item.node.id)
                                        }
                                        label="Reject"
                                        style={{
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
                            ) : (
                                <Typography
                                    sx={{
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        color:
                                            item?.node?.status === 'REJECTED'
                                                ? 'common.red'
                                                : '',
                                    }}
                                >
                                    {item?.node?.status}
                                </Typography>
                            )}
                        </Box>
                    ))
                    : null}

            <Popper
                id={shortListId}
                open={openShortListPopup}
                anchorEl={shortListanchorEl}
                placement="bottom-end"
            >
                <Box
                    sx={{
                        width: 400,
                        bgcolor: 'white',
                        p: 3,
                        textAlign: 'center',
                        boxShadow: '0px 18px 88px -4px #18274B24',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '18px',
                            color: 'text.darkBlue',
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
                        Are you sure?
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '12px',
                            color: 'text.grey',
                            fontWeight: 500,
                        }}
                    >
                        You want to shortlist this candidate. You cannot undo this action.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'center',
                            mt: 2,
                        }}
                    >
                        <Button
                            onClick={handleShortListClick}
                            label="Cancel"
                            style={{
                                borderRadius: '5px',
                                background: 'transparent',
                                border: '2px solid #1C3E5EBF',
                                color: 'black',
                                fontWeight: 600,
                                fontSize: '14px',
                                '&:hover': {
                                    background: 'transparent',
                                },
                            }}
                        />
                        <Button
                            onClick={() =>
                                handleCandidateApplication('selected')
                            }
                            label="ShortList"
                            style={{
                                borderRadius: '5px',
                            }}
                        />
                    </Box>
                </Box>
            </Popper>
            <Popper
                id={rejectId}
                open={openRejectPopup}
                anchorEl={RejectanchorEl}
                placement="bottom-end"
            >
                <Box
                    sx={{
                        width: 400,
                        bgcolor: 'white',
                        p: 3,
                        textAlign: 'center',
                        boxShadow: '0px 18px 88px -4px #18274B24',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '18px',
                            color: 'text.darkBlue',
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
                        Are you Sure?
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '12px',
                            color: 'text.grey',
                            fontWeight: 500,
                        }}
                    >
                        You want to reject this candidate. You cannot undo this action.
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'center',
                            mt: 2,
                        }}
                    >
                        <Button
                            onClick={handleRejectClick}
                            label="Cancel"
                            style={{
                                borderRadius: '5px',
                                background: 'transparent',
                                border: '2px solid #1C3E5EBF',
                                color: 'black',
                                fontWeight: 600,
                                fontSize: '14px',
                                '&:hover': {
                                    background: 'transparent',
                                },
                            }}
                        />
                        <Button
                            onClick={() =>
                                handleCandidateApplication('rejected')
                            }
                            label="Rejected"
                            style={{
                                borderRadius: '5px',
                                bgcolor: '#FF6550',
                                '&:hover': {
                                    bgcolor: '#FF6550',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Popper>

            <CandidateApplication
                singleCandidateId={singleCandidateId}
                setSingleCandidateId={setSingleCandidateId}
                setIsOpenApplication={setIsOpenApplication}
                isOpenApplication={isOpenApplication}
                candidateApplicationAction={candidateApplicationAction}

                refetch={refetch}
            />

            {loading ? null : data?.candidateList?.totalCount !== 0 ? (
                <CommonPagination
                    totalCount={data?.candidateList?.totalCount}
                    fetchMore={fetchMore}
                    pageSize={10}
                    setPage={setPage}
                    page={page}
                />
            ) : (
                <Typography
                    sx={{
                        textAlign: 'center',
                        color: 'grey',
                        fontSize: '18px',
                    }}
                >
                    No applicant available
                </Typography>
            )}
        </Box>
    );
};

export default ApplicantList;
