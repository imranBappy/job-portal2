import React, { useEffect, useState } from 'react';
import CModal from '@/common/CModal';
import UploadProfileImg from '@/components/UploadProfileImg/UploadProfileImg';
import { Box, Grid } from '@mui/material';
import CInput from '../formElement/CInput';
import Button from '@/components/Common/UI/Button';
import { useMutation } from '@apollo/client';
import { COMPANY_TEAM_MEMBER_CU } from './graphql/mutation';
import Toaster from '@/common/Toaster';
import { handleUploadMediaToBucket, validateUrl } from '@/utils';

const AddTeamModal = ({
    isOpen,
    setIsOpen,
    companyId,
    setUpdateTeamMemberData,
    updateTeamMemberData,
    refetch,
}) => {
    const [payload, setPayload] = useState({
        memberName: '',
        role: '',
        imageUrl: '',
        instagram: '',
        linkdin: '',
    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const [saveTeamMember] = useMutation(COMPANY_TEAM_MEMBER_CU, {
        onCompleted: (res) => {
            Toaster({
                message: res.companyTeamMemberCreateUpdate.message,
                type: 'success',
            });
            refetch();
            handleModalClose();
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

    const handleModalClose = () => {
        setIsOpen(false);
        setError({});
        setUpdateTeamMemberData(null);
        setPayload({
            memberName: '',
            role: '',
            imageUrl: '',
            instagram: '',
            linkdin: '',
        });
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const handleSave = async () => {
        let errorObj = {}

        if (!payload.memberName) {
            errorObj.memberName = 'This field is required.'
        }
        if (!payload.role) {
            errorObj.role = 'This field is required.'
        }

        if (payload.instagram && !validateUrl(payload.instagram)) {
            errorObj.instagram = 'Please enter a valid instagram URL.'
        }

        if (payload.linkdin && !validateUrl(payload.linkdin)) {
            errorObj.linkdin = 'Please enter a valid linkdin URL.'
        }

        if (Object.keys(errorObj).length > 0) {
            setError(errorObj)
            return
        }

        setLoading(true);

        let imgUrl = payload.imageUrl;

        if (typeof payload.imageUrl === 'object') {
            imgUrl = await handleUploadMediaToBucket(
                payload.imageUrl,
                'companyTeamMember',
            );
            setPayload({ ...payload, imageUrl: imgUrl });
        }

        let input = { ...payload, imageUrl: imgUrl, company: companyId };

        if (updateTeamMemberData) {
            input.id = updateTeamMemberData.id;
        }
        saveTeamMember({ variables: { teamMembers: [input] } }).finally(() => {
            setLoading(false);
        });
    };
    useEffect(() => {
        if (updateTeamMemberData) {
            setPayload({
                memberName: updateTeamMemberData?.memberName,
                role: updateTeamMemberData?.role,
                imageUrl: updateTeamMemberData?.imageUrl,
                instagram: updateTeamMemberData?.instagram,
                linkdin: updateTeamMemberData?.linkdin,
            });
        }
    }, [updateTeamMemberData]);

    return (
        <CModal
            title={`${updateTeamMemberData ? 'Update' : 'Add'} Team Member`}
            maxWidth={'md'}
            open={isOpen}
            onClose={handleModalClose}
        >
            <Box sx={{ mt: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <UploadProfileImg
                        existingImage={payload.imageUrl}
                        onChange={(e) =>
                            setPayload({ ...payload, imageUrl: e })
                        }
                    />
                </Box>
                <Grid container spacing={3} mt={2}>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Name"
                            placeholder="Enter name"
                            value={payload.memberName}
                            onChange={handleInputChange}
                            name="memberName"
                            error={error?.memberName}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Role"
                            placeholder="Enter role"
                            value={payload.role}
                            onChange={handleInputChange}
                            name="role"
                            error={error?.role}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Instagram"
                            placeholder="Enter instagram link"
                            value={payload.instagram}
                            onChange={handleInputChange}
                            name="instagram"
                            error={error?.instagram}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="LinkedIn"
                            placeholder="Enter linkedIn link"
                            value={payload.linkdin}
                            onChange={handleInputChange}
                            name="linkdin"
                            error={error?.linkdin}
                        />
                    </Grid>
                </Grid>
                <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        style={{ fontSize: 20, px: 10 }}
                        label="Save"
                        onClick={handleSave}
                        isLoading={loading}
                    />
                </Box>
            </Box>
        </CModal>
    );
};

export default AddTeamModal;
