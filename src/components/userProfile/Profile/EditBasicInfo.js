import CModal from '@/common/CModal';
import CSelect from '@/common/CSelect';
import Toaster from '@/common/Toaster';
import Button from '@/components/Common/UI/Button';
import UploadProfileImg from '@/components/UploadProfileImg/UploadProfileImg';
import CInput from '@/components/companyProfile/formElement/CInput';
import CTextArea from '@/components/companyProfile/formElement/CTextArea';
import { PROFILE_MUTATION } from '@/graphql/resume/resumeMutation';
import {
    handleDeleteAttachmentFromS3,
    handleUploadMediaToBucket,
} from '@/utils';
import { GENDER_LIST } from '@/utils/constant';
import { phoneValidator, zipCodeValidator } from '@/utils/validator';
import { useMutation } from '@apollo/client';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';


const checkError = (name, value) => {
    let errors = {};
    let isError = false;
    switch (name) {
        case 'firstName':
            if (value === '') {
                errors.firstName = 'First name is required';
                isError = true;
            } else {
                errors.firstName = '';
            }
            break;
        case 'lastName':
            if (value === '') {
                errors.lastName = 'Last name is required';
                isError = true;
            } else {
                errors.lastName = '';
            }
            break;
        case 'phoneNumber':
            if (!value) {
                errors.phoneNumber = '';
            } else if (phoneValidator(value)) {
                errors.phoneNumber = 'Invalid phone number';
                isError = true;
            } else {
                errors.phoneNumber = '';
            }
            break;
        case 'zipCode':
            if (!value) {
                errors.zipCode = '';
            }
            else if (zipCodeValidator(value)) {
                errors.zipCode = 'Invalid zip code';
                isError = true;
            } else {
                errors.zipCode = '';
            }
            break;
        default:
            break;
    }
    return { isError, errors };
}




const EditBasicInfo = ({ open, onClose, data, refetch }) => {
    const [me, setMe] = useState({});

    useEffect(() => {
        setMe({ ...data?.me?.profile, email: data?.me?.email });
    }, [data]);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        zipCode: '',
    });

    const [updateProfile, { loading }] = useMutation(PROFILE_MUTATION, {
        onCompleted: (data) => {
            Toaster({
                message: 'Successfully updated',
                type: 'success',
            });
            refetch();
            onClose();
        },
        onError: (error) => {
            Toaster({
                message: error.message,
                type: 'error',
            });
        },
    });


    const handleFileChange = async (file) => {
        const photoUrl = await handleUploadMediaToBucket(file, 'profile');
        if (me.photoUrl) {
            await handleDeleteAttachmentFromS3(me.photoUrl, 'profile');
        }
        setMe((prev) => ({
            ...prev,
            photoUrl,
        }));
    };
    const {
        firstName,
        lastName,
        profession,
        photoUrl,
        city,
        country,
        zipCode,
        phoneNumber,
        dateOfBirth,
        address,
        bio,
        email,
        gender
    } = me || {};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMe((prev) => ({
            ...prev,
            [name]: value,
        }));

        const { errors } = checkError(name, value);
        setErrors((prev) => ({
            ...prev,
            ...errors,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        let error = false
        Object.keys(me).forEach((key) => {
            const { errors, isError } = checkError(key, me[key]);
            setErrors((prev) => ({
                ...prev,
                ...errors,
            }));
            error = isError || error;
        });
        if (error) return;


        updateProfile({
            variables: {
                input: {
                    firstName,
                    lastName,
                    profession,
                    photoUrl,
                    city,
                    country,
                    zipCode,
                    phoneNumber,
                    dateOfBirth,
                    address,
                    bio,
                    gender: gender?.toLowerCase()
                },
            },
        });

    };



    return (
        <CModal
            maxWidth="lg"
            title="Edit Profile"
            onClose={onClose} open={open}

        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 5,
                    flexWrap: 'wrap',
                    gap: 5
                }}
            >
                <Box>
                    <Typography
                        variant="subHeader3"
                        sx={{
                            fontWeight: 600,
                            color: 'text.darkBlue',
                            mb: 1,
                        }}
                    >
                        Profile Picture
                    </Typography>
                    <Typography>
                        This image will be shown publicly as your profile
                        picture, <br /> it will help recruiters recognize you!
                        as your profile picture
                    </Typography>
                </Box>
                <Box>
                    <UploadProfileImg
                        existingImage={photoUrl}
                        onChange={handleFileChange}
                    />
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <CInput
                        onChange={handleChange}
                        label="First Name"
                        name="firstName"
                        placeholder="e.g. Imran"
                        value={firstName}
                        error={errors.firstName}
                        helperText={errors.firstName}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        onChange={handleChange}
                        label="Last Name"
                        name="lastName"
                        placeholder="e.g. Hossen"
                        value={lastName}
                        error={errors.lastName}
                        helperText={errors.lastName}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        onChange={handleChange}
                        label="Profession"
                        name="profession"
                        placeholder="e.g. Engineer"
                        value={profession}
                        error={errors.profession}
                        helperText={errors.profession}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        onChange={handleChange}
                        label="Email"
                        name="email"
                        value={email}
                        error={errors.profession}
                        helperText={errors.profession}
                        disabled={true}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <CInput
                        onChange={handleChange}
                        label="Address"
                        name="address"
                        placeholder="Address"
                        value={address}
                        error={errors.address}
                        helperText={errors.address}
                    />
                </Grid>


                <Grid item xs={12} md={6}>
                    <CInput
                        onChange={handleChange}
                        label="City"
                        name="city"
                        placeholder="e.g. Khulna"
                        value={city}
                        error={errors?.city}
                        helperText={errors?.city}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CInput
                        onChange={handleChange}
                        label="Country"
                        name="country"
                        placeholder="e.g. Bangladesh"
                        value={country}
                        error={errors?.country}
                        helperText={errors?.country}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        onChange={handleChange}
                        label="Zip Code"
                        name="zipCode"
                        placeholder="e.g. 9000"
                        value={zipCode}
                        error={errors?.zipCode}
                        helperText={errors?.zipCode}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CInput
                        onChange={handleChange}
                        label="Phone"
                        name="phoneNumber"
                        placeholder="e.g. +880 123456789"
                        value={phoneNumber}
                        error={errors.phoneNumber}
                        helperText={errors.phoneNumber}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CInput
                        onChange={handleChange}
                        label="Date Of Birth"
                        placeholder="e.g. 1990-01-01"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        type="date"
                        error={errors?.dateOfBirth}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CSelect
                        onChange={handleChange}
                        listData={GENDER_LIST}
                        name="gender"
                        label="Gender"
                        error={errors?.gender}
                        placeholder="gender"
                        selectValue={gender?.toLowerCase()}
                        value="key"
                        display="display"
                    />
                </Grid>


                <Grid item xs={12}>
                    <CTextArea
                        onChange={handleChange}
                        name="bio"
                        value={bio}
                        label="Description"
                        minRow={10}
                        error={errors?.bio}
                    />
                </Grid>
            </Grid>
            <Box my={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    isLoading={loading}
                    onClick={handleSubmit}
                    label="Save"
                    style={{ fontSize: 20, px: 10 }}
                />
            </Box>
        </CModal>
    );
};

export default EditBasicInfo;
