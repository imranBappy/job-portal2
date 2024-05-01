import AutoComplete from '@/common/AutoComplete';
import DataTable from '@/common/DataTable/DataTable';
import ClearFilterButton from '@/common/FilterElements/ClearFilterButton';
import FilterDatePicker from '@/common/FilterElements/FilterDatePicker';
import { useFilterForm } from '@/common/FilterElements/FilterForm';
import FilterInput from '@/common/FilterElements/FilterInput';
import Toaster from '@/common/Toaster';
import Button from '@/components/Common/UI/Button';
import { getFilteredValue } from '@/utils';
import { Images } from '@/utils/imagePath';
import useDebounce from '@/utils/useDebounce';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GET_ALL_JOB_LIST, GET_ALL_SHORTLIST_RESUME_LIST } from '../graphql/query';
import CandidateApplication from './CandidateApplication';



const INITIAL_STATE = {
    name: { type: 'text', value: '' },
    title: { type: 'text', value: '' },
    endDate: { type: 'text', value: null },
    startDate: { type: 'text', value: null },
};

const ShortlistResume = () => {
    const { filter, setFilter } = useFilterForm(INITIAL_STATE);
    const [rows, setRows] = useState([]);
    const [isOpenApplication, setIsOpenApplication] = useState(false)
    const [singleCandidateId, setSingleCandidateId] = useState(null)
    const [jobRole, setJobRole] = useState(null)

    const handleOpenApplication = (applicationId) => {
        setIsOpenApplication(true)
        setSingleCandidateId(applicationId)
    }


    const { loading, refetch, data, fetchMore } = useQuery(
        GET_ALL_SHORTLIST_RESUME_LIST,
        {
            variables: {
                first: 20,
                orderBy: '-id',
                status: 'SELECTED',
            },
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
            onCompleted: (res) => {
                const tempRows = res?.candidateList?.edges?.map((e) => e.node);
                console.log(tempRows)
                setRows(tempRows);
            },
            onError: (error) => {
                Toaster({
                    type: 'error',
                    message: error.message,
                });
            },
        },
    );
    const fetchMoreData = async (variables) => {
        await fetchMore({
            variables: variables,
        });
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

    const columns = [
        {
            field: 'resume__profile__first_name',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 200,
            renderCell: ({ row }) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                            sx={{
                                height: 40,
                                width: 40,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                position: 'relative'
                            }}
                        >
                            <Image
                                src={
                                    row?.resume?.profile?.photoUrl
                                        ? row?.resume?.profile?.photoUrl
                                        : Images.NO_IMAGE
                                }
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                                layout='fill'
                                alt="user profile"
                            />
                        </Box>
                        <Typography
                            variant="bodyNormal"
                            sx={{ fontWeight: 600, color: 'text.darkBlue' }}
                        >
                            {row?.resume?.profile?.firstName}{' '}
                            {row?.resume?.profile?.lastName}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'date_created',
            headerName: 'Applied Date',
            flex: 0.5,
            minWidth: 120,
            renderCell: ({ row }) => {
                return (
                    <Typography
                        variant="bodyNormal"
                        sx={{ fontWeight: 600, color: 'text.darkBlue' }}
                    >
                        {moment(row?.dateCreated).format('DD MMM, YYYY')}
                    </Typography>
                );
            },
        },
        {
            field: 'job__title',
            headerName: 'Job Title',
            flex: 0.5,
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <Typography
                        variant="bodyNormal"
                        sx={{ fontWeight: 600, color: 'text.darkBlue' }}
                    >
                        {row?.job?.title}
                    </Typography>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 0.5,
            sortable: false,
            minWidth: 200,
            renderCell: ({ row }) => {
                return (
                    <Button
                        onClick={() => handleOpenApplication(row.id)}
                        label="See Application"
                        style={{
                            borderRadius: '0.2rem',
                            fontWeight: 600,
                            color: 'primary.dark',
                            border: 1,
                            borderColor: 'primary.dark',
                            bgcolor: 'primary.light',
                            '&:hover': {
                                bgcolor: 'primary.extraLight',
                                boxShadow: 'none',
                            },
                        }}
                    />


                );
            },
        },
    ];

    useEffect(() => {
        getAllJobList()
    }, [])

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5, flexWrap: 'wrap' }}>
                <FilterInput
                    label="Name"
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


                <FilterDatePicker
                    label="Start Date"
                    value={filter['startDate'].value}
                    onChange={(e) => onDateChangeDebounce(e, 'startDate')}
                />
                <FilterDatePicker
                    label="End Date"
                    value={filter['endDate'].value}
                    onChange={(e) => onDateChangeDebounce(e, 'endDate')}
                />
                <ClearFilterButton onClick={onClearFilter} />
            </Box>

            <DataTable
                hidePagination
                fetchMore={fetchMore}
                columns={columns}
                rows={rows}
                loading={loading}
                rowHeight={70}
                totalCount={data?.candidateList?.totalCount}
            />
            <CandidateApplication singleCandidateId={singleCandidateId} setSingleCandidateId={setSingleCandidateId} setIsOpenApplication={setIsOpenApplication} isOpenApplication={isOpenApplication} />
        </Box>
    );
};

export default ShortlistResume;
