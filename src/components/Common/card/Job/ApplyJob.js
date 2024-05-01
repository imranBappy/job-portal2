import CTextArea from '@/components/companyProfile/formElement/CTextArea';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '../../UI/Button';
import LabeledSelectField from '../../Input/LabeledSelectField';
import { useMutation, useQuery } from '@apollo/client';
import { APPLY_JOB_MUTATION } from '@/graphql/jobApply/jobMutation';
import Toaster from '@/common/Toaster';
import { ALL_RESUME_LIST } from '@/graphql/resume/resumeQuery';
import Image from 'next/image';
import CModal from '@/common/CModal';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const ApplyJob = ({ data, open, setOpen, handleRefetch = () => { } }) => {

    const { data: resumeData } = useQuery(ALL_RESUME_LIST,
        {
            fetchPolicy: 'cache-and-network',
        });
    const resumeList = resumeData?.resumeList?.edges?.map((edge) => ({
        name: edge.node.name,
        value: edge.node.id,
    }));
    const [apply, setApply] = useState({
        resume: '',
        coverLetter: '',
    });



    const pathname = usePathname();

    useEffect(() => {
        if (resumeList?.length) {
            setApply({
                resume: resumeList[0]?.value,
                coverLetter: '',
            });
        }
    }, [resumeData?.resumeList?.edges]);


    const [applyJob, { data: applyData, loading, error }] = useMutation(APPLY_JOB_MUTATION, {
        onCompleted: () => {
            setOpen(false);
            handleRefetch();
        },
        onError: (error) => {
            Toaster({
                message: error.message,
                type: 'error',
            });
        },
    });

    useEffect(() => {
        if (applyData?.applyJob?.message) {
            Toaster({
                message: applyData.applyJob.message,
                type: 'success',
            });
        }
    }, [applyData?.applyJob?.message]);

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        setApply({ ...apply, [e.target.name]: e.target.value });
    };
    const handleSubmit = () => {
        applyJob({
            variables: {
                jobId: data.id,
                resumeId: apply.resume,
            },
        });
    };



    return (
        <CModal
            onClose={handleClose}
            open={open}
            setOpen={setOpen}
        >
            <Box display={'flex'} flexDirection={'column'} gap={1} p={1}>
                {
                    resumeList?.length === 0 ? (
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: ' 50px 0',
                                }}
                            >
                                <Image src="/images/NotFound.svg" width={100} height={100} alt='NotFound' />
                            </Box>
                            <Typography align='center' variant="body1">
                                You have no resume. Please create a resume to apply for this job.
                            </Typography>
                            <Link
                                href={`/resume?path=${pathname}?jobId=${data?.id || ''}`}
                            >
                                <Button
                                    label="Create Resume"
                                    sx={{
                                        width: '100%',
                                        borderRadius: 20,
                                        padding: '10px 0',
                                        marginTop: 10,
                                    }}
                                />
                            </Link>
                        </Box>
                    ) :
                        <>
                            <Box>
                                <Typography variant="h6">Apply</Typography>
                                <Typography variant="body1">
                                    Are you sure you want to apply for this job?
                                </Typography>
                            </Box>

                            <LabeledSelectField
                                type="select"
                                label="Select Resume"
                                onChange={handleChange}
                                name="resume"
                                value={apply.resume}
                                options={resumeList || []}
                            ></LabeledSelectField>

                            <Box>
                                <Typography variant="h6">Cover letter</Typography>
                                <CTextArea
                                    onChange={handleChange}
                                    minRow={5}
                                    name="coverLetter"
                                    p={10}
                                ></CTextArea>
                            </Box>

                            <Button
                                isLoading={loading}
                                onClick={handleSubmit}
                                label="Apply"
                                sx={{
                                    width: '100%',
                                    borderRadius: 20,
                                    padding: '10px 0',
                                    marginTop: 10,
                                }}
                            />
                        </>}
            </Box>
        </CModal>
    );
};

export default ApplyJob;
