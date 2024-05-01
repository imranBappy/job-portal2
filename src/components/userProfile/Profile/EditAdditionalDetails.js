import CModal from '@/common/CModal';
import Toaster from '@/common/Toaster';
import LabeledSelectField from '@/components/Common/Input/LabeledSelectField';
import LabeledTextField from '@/components/Common/Input/LabeledTextField';
import Button from '@/components/Common/UI/Button';
import { SOCIAL_LINK_MUTATION } from '@/graphql/socialLink/socialLinkMutation';
import { useMutation } from '@apollo/client';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
const options = [
    { name: 'Facebook', value: 'Facebook' },
    { name: 'LinkedIn', value: 'LinkedIn' },
    { name: 'Twitter', value: 'Twitter' },
    { name: 'Instagram', value: 'Instagram' },
    { name: 'Youtube', value: 'Youtube' },
    { name: 'Website', value: 'Website' },
    { name: 'StackOverflow', value: 'StackOverflow' },
    { name: 'Github', value: 'Github' },
];
const EditProfileSocialLinks = ({
    open,
    onClose,
    refetch,
}) => {
    const [socialLink, setSocialLink] = useState({
        name: '',
        urlLink: '',
    });

    const [addLink, { loading, error }] = useMutation(SOCIAL_LINK_MUTATION, {
        onCompleted: (data) => {
            Toaster({
                message: 'Successfully Added',
                type: 'success',
            });
            refetch();
            onClose();
            setSocialLink({
                name: '',
                urlLink: '',
            });

        },
        onError: (error) => {
            Toaster({
                message: error.message,
                type: 'error',
            });
        },
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setSocialLink({ ...socialLink, name: value, urlLink: socialLink.urlLink });
        } else {
            setSocialLink({ ...socialLink, name: socialLink.name, urlLink: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (socialLink.name === '' || socialLink.urlLink === '') {
            return Toaster({
                message: 'Please fill all the fields',
                type: 'error',
            });

        }
        addLink({
            variables: {
                input: {
                    id: socialLink.id,
                    name: socialLink.name,
                    urlLink: socialLink.urlLink,
                },
            },
        });
    };


    return (
        <CModal onClose={onClose} open={open}
            title="Add Social Link"
        >
            <form>
                <Box >
                    <Grid container >
                        <Grid item xs={12} md={12}>
                            <LabeledSelectField
                                label={'Social Network'}
                                name="name"
                                placeholder="e.g. UI/UX Designer"
                                options={options}
                                onChange={handleChange}
                                value={socialLink.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <LabeledTextField
                                onChange={handleChange}
                                fullWidth={true}
                                label="Link"
                                name="urlLink"
                                placeholder="e.g. github.com/username"
                                value={socialLink.urlLink}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={handleSubmit}
                        label="Save"
                        style={{ fontSize: 20, px: 10 }}
                    />
                </Box>
            </form>
        </CModal>
    );
};

export default EditProfileSocialLinks;