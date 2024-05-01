import Toaster from '@/common/Toaster';
import CircularLoader from '@/components/Loader/CircularLoader';
import { useQuery } from '@apollo/client';
import ProfileCreateResume from './ProfileCreateResume';
import ProfileResume from './ProfileResume';
import { GET_ALL_MY_RESUME } from './graphql/query';
import { useEffect, useState } from 'react';
import ResumeTemplatesModal from '@/components/ResumeTemplates/ResumeTemplatesModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Pagination, Stack } from '@mui/material';

const MyResume = () => {
    const PAGE_SIZE = 7;
    const { data, loading, refetch } = useQuery(GET_ALL_MY_RESUME, {
        fetchPolicy: 'network-only',
        onError: (error) => {
            Toaster({ type: 'error', message: error.message });
        },
        variables: {
            orderBy: '-createdOn',
            offset: 0,
            first: PAGE_SIZE,
        }
    });
    const searchParams = useSearchParams()
    const isOpen = searchParams.get('isOpen')

    const router = useRouter();
    const [openTemplateModal, setOpenTemplateModal] = useState(false);
    const onClose = () => {
        setOpenTemplateModal(false);
    };
    const handleCreateResume = (selectedTemplate) => {
        router.push(`/resume?templateId=${selectedTemplate.id}`);
    };

    const changePage = (page) => {
        refetch({
            offset: (page - 1) * PAGE_SIZE,
            first: PAGE_SIZE,
            orderBy: '-createdOn',
        });
    }

    useEffect(() => {
        if (isOpen === "true") {
            setOpenTemplateModal(true)
        }
    }, [isOpen])



    return (
        <Box>
            {loading ? (
                <Box sx={{ height: '80vh' }}>
                    <CircularLoader />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    <Box
                        sx={{
                            width: { xs: '100%', sm: 350 },
                            height: 450,
                        }}
                    >
                        <Box onClick={() => setOpenTemplateModal(true)}>
                            <ProfileCreateResume />
                        </Box>
                    </Box>

                    {data?.resumeList?.edges &&
                        data?.resumeList?.edges?.length > 0
                        ? data?.resumeList?.edges?.map((item, key) => {
                            return (
                                <Box key={`my_resume_${key}`}>
                                    <ProfileResume
                                        data={item.node}
                                        refetch={refetch}
                                    />
                                </Box>
                            );
                        })
                        : null}
                </Box>
            )}

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: ' 50px 0',
                }}
            >
                <Stack spacing={2}>
                    <Pagination
                        color="primary"
                        count={Math.ceil(data?.resumeList?.totalCount / PAGE_SIZE) || 1}
                        shape="rounded"
                        defaultPage={1}
                        onChange={(e, value) => changePage(value)}
                    />
                </Stack>
            </Box>
            <ResumeTemplatesModal
                open={openTemplateModal}
                onClose={onClose}
                onTemplateSelect={handleCreateResume}
            />
        </Box>
    );
};

export default MyResume;
