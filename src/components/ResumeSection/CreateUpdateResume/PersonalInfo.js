import { Box, FormHelperText, Grid, Typography } from '@mui/material';
import UploadProfileImg from '../../UploadProfileImg/UploadProfileImg';
import { Save } from '@mui/icons-material';
import Button from '../../Common/UI/Button';
import CInput from '../../companyProfile/formElement/CInput';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '@/graphql/auth/authQuery';
import Toaster from '@/common/Toaster';
import CSelect from '../../../common/CSelect';
import { GENDER_LIST } from '@/utils/constant';
import CDatePicker from '@/common/CDatePicker';
import { POST_PERSONAL_INFO } from '@/graphql/resume/resumeMutation';
import moment from 'moment';
import dayjs from 'dayjs';
import AddLink from '@/app/(resume)/resume/components/AddLink/AddLink';
import CircularLoader from '../../Loader/CircularLoader';
import { ALL_SOCIAL_MEDIA_LINKS } from '@/graphql/resume/resumeQuery';
import { handleUploadMediaToBucket } from '@/utils';
import ResumeNameModal from '@/app/(resume)/resume/components/ResumeNameModal';
import { useEffect, useState } from 'react';

const PersonalInfo = ({
    error,
    payload,
    setPayload,
    setError,
    setIsPersonalInfoChange,
    isPersonalInfoChange,
    setSocialMediaLinksId,
    setSocialMediaLinks,
    socialMediaLinks,
    setResumeName,
    resumeName
}) => {
    const handleInputChange = (e) => {
        let { name, value } = e.target;

        if (name === "zipCode" && value < 0) return
        setPayload({ ...payload, [name]: value });
        setError({ ...error, [name]: '' });
        setIsPersonalInfoChange(true);
    };

    const handleDateChange = (e) => {
        setPayload({ ...payload, dateOfBirth: e });
        setError({ ...error, dateOfBirth: '' });
        setIsPersonalInfoChange(true);
    };

    const [openResumeModal, setOpenResumeModal] = useState(false);

    useQuery(ALL_SOCIAL_MEDIA_LINKS, {
        onCompleted: (res) => {
            let socialLinks = [];
            let socialLinksId = [];

            res?.socialMediaLinksList?.edges?.forEach((item) => {
                socialLinks.push({
                    name: item.node.name,
                    urlLink: item.node.urlLink,
                    id: item.node.id,
                });

                socialLinksId.push(item?.node?.id);
            });

            setSocialMediaLinksId(socialLinksId);
            setSocialMediaLinks(socialLinks);
        },
        onError: (error) => {
            Toaster({ type: 'error', message: error.message });
        },
    });

    const { loading: personalInfoLoading } = useQuery(GET_ME, {
        fetchPolicy: 'network-only',
        onCompleted: (res) => {

            setPayload({
                firstName: res?.me?.profile?.firstName ?? "",
                lastName: res?.me?.profile?.lastName ?? "",
                profession: res?.me?.profile?.profession ?? "",
                city: res?.me?.profile?.city ?? "",
                country: res?.me?.profile?.country ?? "",
                zipCode: res?.me?.profile?.zipCode ?? "",
                phoneNumber: res?.me?.profile?.phoneNumber
                    ?? '',
                dateOfBirth: res?.me?.profile?.dateOfBirth ?? null,
                gender: res?.me?.profile?.gender
                    ? res?.me?.profile?.gender.toLowerCase()
                    : '',
                address: res?.me?.profile?.address ?? "",
                bio: res?.me?.profile?.bio ?? "",
                email: res?.me?.email,
                existingPhotoUrl: res?.me?.profile?.photoUrl ?? "",
            });

        },
        onError: (error) => {
            Toaster({ type: 'error', message: error.message });
        },
    });

    const [updatePersonalInfo, { loading }] = useMutation(POST_PERSONAL_INFO, {
        onCompleted: (res) => {
            Toaster({
                message: res?.userProfileCreateUpdate?.message,
                type: 'success',
            });
            setIsPersonalInfoChange(false);
            setError({ ...error, personalInfo: '' });
            setPayload({ ...payload, photoUrl: '' });
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

    const handleImageChange = (file) => {
        setPayload({ ...payload, photoUrl: file });
        setIsPersonalInfoChange(true);
    };

    const handleSavePersonalInfo = async () => {
        if (!payload.firstName) {
            setError({ ...error, firstName: 'This field is required.' });
            return;
        }
        if (!payload.lastName) {
            setError({ ...error, lastName: 'This field is required.' });
            return;
        }
        if (!payload.profession) {
            setError({ ...error, profession: 'This field is required.' });
            return;
        }
        if (!payload.phoneNumber) {
            setError({
                ...error,
                phoneNumber: 'This field is required.',
            });
            return;
        }

        let imgUrl = payload.existingPhotoUrl;

        if (payload.photoUrl) {
            imgUrl = await handleUploadMediaToBucket(
                payload.photoUrl,
                'profile',
            );
        }

        let input = { ...payload, photoUrl: imgUrl };

        delete input.email;
        delete input.existingPhotoUrl;

        input.phoneNumber = input.phoneNumber.toString();
        input.dateOfBirth = input.dateOfBirth
            ?
            typeof input.dateOfBirth === "object" ?
                moment(input.dateOfBirth?.$d).format('YYYY-MM-DD') : input.dateOfBirth
            : null;


        updatePersonalInfo({ variables: { input } });
    };

    useEffect(() => {
        if (resumeName === 'Untitle') {
            setOpenResumeModal(true)
        }
    }, [])


    return (
        <>
            {personalInfoLoading ? (
                <CircularLoader />
            ) : (
                <>
                    <Box
                        style={{
                            marginTop: 10,
                        }}
                    >
                        {/*   Profile Images Secion  */}
                        <Box
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            gap={2}
                            mb={2}
                        >
                            <Box>
                                <Typography
                                    align="center"
                                    variant="h6"
                                    maxWidth={500}
                                >
                                    Profile Photo
                                </Typography>
                            </Box>
                            <Box>
                                <UploadProfileImg
                                    existingImage={payload.existingPhotoUrl}
                                    onChange={handleImageChange}
                                />
                            </Box>
                        </Box>

                        <Grid container spacing={2.4}>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    onChange={handleInputChange}
                                    name="firstName"
                                    label="First Name"
                                    value={payload?.firstName}
                                    error={error?.firstName}
                                    placeholder="First Name"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    onChange={handleInputChange}
                                    name="lastName"
                                    value={payload?.lastName}
                                    label="Last Name"
                                    error={error?.lastName}
                                    placeholder="Last Name"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    onChange={handleInputChange}
                                    error={error?.profession}
                                    label="Profession"
                                    value={payload?.profession}
                                    name="profession"
                                    placeholder="Profession"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    disabled={true}
                                    label="Email"
                                    value={payload?.email}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <CInput
                                    onChange={handleInputChange}
                                    name="address"
                                    label="Address"
                                    error={error?.address}
                                    value={payload?.address}
                                    placeholder="Address"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <CInput
                                    onChange={handleInputChange}
                                    name="city"
                                    label="City"
                                    error={error?.city}
                                    value={payload?.city}
                                    placeholder="City"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <CInput
                                    onChange={handleInputChange}
                                    name="country"
                                    label="Country"
                                    error={error?.country}
                                    value={payload?.country}
                                    placeholder="Country"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <CInput
                                    onChange={handleInputChange}
                                    name="zipCode"
                                    label="Zip Code"
                                    error={error?.zipCode}
                                    value={payload?.zipCode}
                                    placeholder="Postal Code"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <CInput
                                    onChange={handleInputChange}
                                    name="phoneNumber"
                                    label="Phone Number"
                                    error={error?.phoneNumber}
                                    value={payload?.phoneNumber}
                                    placeholder="Phone"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <CDatePicker
                                    label="Date Of Birth"
                                    error={error?.dateOfBirth}
                                    value={
                                        payload?.dateOfBirth
                                            ? dayjs(payload?.dateOfBirth)
                                            : null
                                    }
                                    maxDate={dayjs(new Date())}
                                    onChange={handleDateChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <CSelect
                                    onChange={handleInputChange}
                                    listData={GENDER_LIST}
                                    name="gender"
                                    label="Gender"
                                    error={error?.gender}
                                    placeholder="gender"
                                    selectValue={payload?.gender}
                                    value="key"
                                    display="display"
                                />
                            </Grid>

                        </Grid>
                    </Box>

                    <AddLink
                        setSocialMediaLinks={setSocialMediaLinks}
                        socialMediaLinks={socialMediaLinks}
                        setSocialMediaLinksId={setSocialMediaLinksId}
                    />

                    <Box mt={4}>
                        <Button
                            style={{
                                padding: '10px 20px',
                            }}
                            disabled={!isPersonalInfoChange}
                            onClick={handleSavePersonalInfo}
                            color="primary"
                            variant="outlined"
                            isLoading={loading}
                        >
                            <Save />
                            <Typography ml={2}>
                                Save Personal Information
                            </Typography>
                        </Button>
                        {error?.personalInfo ? (
                            <FormHelperText sx={{ color: 'red' }}>
                                {error?.personalInfo}
                            </FormHelperText>
                        ) : null}
                    </Box>
                </>
            )}
            <ResumeNameModal
                open={openResumeModal}
                setOpen={setOpenResumeModal}
                setResumeName={setResumeName}
                resumeName={resumeName}
            />
        </>
    );
};

export default PersonalInfo;
