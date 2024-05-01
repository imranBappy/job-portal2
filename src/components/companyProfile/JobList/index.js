import CSwitch from '@/common/CSwitch';
import DataTable from '@/common/DataTable/DataTable';
import ClearFilterButton from '@/common/FilterElements/ClearFilterButton';
import FilterDatePicker from '@/common/FilterElements/FilterDatePicker';
import { useFilterForm } from '@/common/FilterElements/FilterForm';
import FilterInput from '@/common/FilterElements/FilterInput';
import Toaster from '@/common/Toaster';
import Button from '@/components/Common/UI/Button';
import { getFilteredValue } from '@/utils';
import useDebounce from '@/utils/useDebounce';
import { useMutation, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import {
    Box,
    Divider,
    Typography
} from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { VscCalendar } from 'react-icons/vsc';
import { ACTIVE_INACTIVE_JOB } from '../graphql/mutation';
import { GET_ALL_JOB_LIST } from '../graphql/query';

const INITIAL_STATE = {
    title: { type: 'text', value: '' },
    endDate: { type: 'text', value: null },
    startDate: { type: 'text', value: null },
};

const JobList = ({ handleRedirectToJobDetail }) => {
    const router = useRouter()

    const { filter, setFilter } = useFilterForm(INITIAL_STATE);

    const [rows, setRows] = useState([]);

    const { loading, refetch, data, fetchMore } = useQuery(GET_ALL_JOB_LIST, {
        variables: {
            first: 20,
            orderBy: '-id',
        },
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
        onCompleted: (res) => {
            const tempRows = res?.recruiterPosts?.edges?.map((e) => e.node);
            setRows(tempRows);
        },
        onError: (error) => {
            Toaster({
                type: 'error',
                message: error.message,
            });
        },
    });

    const [activeInactiveJob] = useMutation(ACTIVE_INACTIVE_JOB, {
        onCompleted: (res) => {
            refetch();
        },

        onError: (error) => {
            Toaster({
                type: 'error',
                message: error.message,
            });
        },
    });

    const handleActiveInActiveJob = (e, id) => {
        activeInactiveJob({
            variables: {
                id,
                active: e.target.checked,
            },
        }).then(() => {
            Toaster({
                type: 'success',
                message: `Job ${!e.target.checked ? 'actived' : 'deactived'
                    } successfully!`,
            });
        });
    };

    const fetchMoreData = async (variables) => {
        await fetchMore({
            variables: variables,
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
            field: 'title',
            headerName: 'Job Title',
            flex: 1,
            minWidth: 250,
            renderCell: ({ row }) => {
                return (
                    <Box>
                        <Typography
                            variant="bodyNormal"
                            sx={{ fontWeight: 600, color: 'text.darkBlue' }}
                        >
                            {row?.title}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <VscCalendar fontSize={16} />
                            <Typography
                                variant="bodyNormal"
                                sx={{
                                    fontWeight: 500,
                                    color: 'text.lightBlue',
                                    fontSize: '14px',
                                }}
                            >
                                Deadline:{' '}
                                {row?.applicationDeadline
                                    ? moment(row?.applicationDeadline).format(
                                        'DD MMM, YYYY',
                                    )
                                    : '-'}
                            </Typography>
                        </Box>
                        <CSwitch
                            value={row.isActive}
                            onChange={(e) => handleActiveInActiveJob(e, row.id)}
                        />
                    </Box>
                );
            },
        },
        {
            field: 'totalApplicant',
            headerName: 'Application',
            flex: 0.5,
            minWidth: 80,
            sortable: false,
            renderCell: ({ value }) => {
                return (
                    <Typography
                        sx={{ fontWeight: 700, color: 'text.darkBlue' }}
                        variant="h4"
                    >
                        {value}
                    </Typography>
                );
            },
        },
        {
            field: 'totalShortlistCount',
            headerName: 'Shortlisted',
            flex: 0.5,
            minWidth: 80,
            sortable: false,
            renderCell: ({ value }) => {
                return (
                    <Typography
                        sx={{ fontWeight: 700, color: 'text.darkBlue' }}
                        variant="h4"
                    >
                        {value}
                    </Typography>
                );
            },
        },
        {
            field: 'totalPendingCount',
            headerName: 'Pending',
            flex: 0.5,
            sortable: false,
            minWidth: 80,
            renderCell: ({ value }) => {
                return (
                    <Typography
                        sx={{ fontWeight: 700, color: 'text.darkBlue' }}
                        variant="h4"
                    >
                        {value}
                    </Typography>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 0.5,
            sortable: false,
            minWidth: 150,
            renderCell: ({ row }) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Button
                            onClick={() =>
                                router.push(`/recruiter/job_list/${row.id}`)
                            }
                            label="View"
                            style={{ borderRadius: '0.2rem', fontWeight: 600 }}
                        />
                        <Button
                            variant="outlined"
                            onClick={() =>
                                router.push(`/recruiter/post_a_job/${row.id}`)

                            }
                            label="Edit"
                            style={{ borderRadius: '0.2rem', fontWeight: 600 }}
                        />
                    </Box>
                );
            },
        },
    ];

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: "wrap",
                    gap: 2
                }}
            >
                <Box sx={{
                    display: 'flex', alignItems: 'center', gap: 2, flexWrap: "wrap",
                }}>
                    <FilterInput
                        label="Job Title"
                        name="title"
                        value={filter['title'].value}
                        onChange={onChangeDebounce}
                    />
                    <FilterDatePicker
                        label="Deadline Start Date"
                        value={filter['startDate'].value}
                        onChange={(e) => onDateChangeDebounce(e, 'startDate')}
                    />
                    <FilterDatePicker
                        label="Deadline End Date"
                        value={filter['endDate'].value}
                        onChange={(e) => onDateChangeDebounce(e, 'endDate')}
                    />
                    <ClearFilterButton onClick={onClearFilter} />
                </Box>
                <Button
                    startIcon={<Add />}
                    label="Post a job"
                    onClick={() => router.push("/recruiter/post_a_job")}
                    style={{
                        borderRadius: 0,
                        bgcolor: 'primary.dark',
                        fontWeight: 500,
                    }}
                />
            </Box>
            <Divider sx={{ my: 3 }} />
            <DataTable
                hidePagination
                fetchMore={fetchMore}
                columns={columns}
                rows={rows}
                loading={loading}
                rowHeight={100}
                totalCount={data?.recruiterPosts?.totalCount}
            />
        </Box>
    );
};

export default JobList;
