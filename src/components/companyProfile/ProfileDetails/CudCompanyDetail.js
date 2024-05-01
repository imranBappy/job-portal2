import Modal from '@/components/Common/UI/Modal';
import UploadProfileImg from '@/components/UploadProfileImg/UploadProfileImg';
import { CloseOutlined } from '@mui/icons-material';
import {
    Box,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CInput from '../formElement/CInput';
import CTextArea from '../formElement/CTextArea';
import Button from '@/components/Common/UI/Button';
import ProfileDetailHeader from './ProfileDetailHeader';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CUD_COMPANY_PROFILE } from './graphql/mutation';
import Toaster from '@/common/Toaster';
import AutoComplete from '@/common/AutoComplete';
import { GET_ALL_INDUSTRY_LIST } from './graphql/query';
import { handleUploadMediaToBucket, validateUrl } from '@/utils';
import CModal from '@/common/CModal';
import moment from 'moment';
import CDatePicker from '@/common/CDatePicker';
import dayjs from 'dayjs';

const style = {
    borderRadius: 5,
};

const CudCompanyDetail = ({ open, onClose, data, refetch, userId }) => {

    const [payload, setPayload] = useState({
        name: '',
        logoUrl: '',
        contactEmail: '',
        contactPhone: '',
        description: '',
        employeesCount: 0,
        foundedDate: null,
        industry: '',
        website: '',
    });
    const [social, setSocial] = useState({
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
    });
    const [error, setError] = useState({});

    const [getIndustryList, { data: industryList, loading: industryLoading }] =
        useLazyQuery(GET_ALL_INDUSTRY_LIST, {
            variables: {
                isDeleted: false,
            },
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
        });

    const [updateCompany, { loading }] = useMutation(CUD_COMPANY_PROFILE, {
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
        onCompleted: (res) => {
            Toaster({
                message: 'Profile Updated!',
                type: 'success',
            });
            refetch();
            setError({});
            onClose();
        },
    });

    const onChangePayload = (key, e) => {
        setPayload({ ...payload, [key]: e.target.value });
    };
    const onChangeSocial = (key, e) => {
        setSocial({ ...social, [key]: e.target.value });
    };

    const onIndustryOptionChange = (event, value, reason) => {
        setPayload({ ...payload, industry: value });
    };

    const onIndustryQueryChange = (e) => {
        getIndustryList({
            variables: {
                name_Icontains: e.target.value,
            },
        });
    };

    const handleSave = async () => {
        let imgUrl = payload.logoUrl;


        if (payload.website && !validateUrl(payload.website)) {
            setError({
                ...error,
                website: 'Please enter a valid facebook URL.',
            });
            return;
        }
        if (social?.facebook && !validateUrl(social.facebook)) {
            setError({
                ...error,
                facebook: 'Please enter a valid facebook URL.',
            });
            return;
        }
        if (social?.instagram && !validateUrl(social.instagram)) {
            setError({
                ...error,
                instagram: 'Please enter a valid instagram URL.',
            });
            return;
        }
        if (social?.twitter && !validateUrl(social.twitter)) {
            setError({
                ...error,
                twitter: 'Please enter a valid twitter URL.',
            });
            return;
        }
        if (social?.linkedin && !validateUrl(social.linkedin)) {
            setError({
                ...error,
                linkedin: 'Please enter a valid linkedin URL.',
            });
            return;
        }


        if (typeof payload.logoUrl === 'object') {
            imgUrl = await handleUploadMediaToBucket(
                payload.logoUrl,
                'companyProfile',
            );
            setPayload({ ...payload, logoUrl: imgUrl });
        }


        let input = {
            name: payload?.name ? payload?.name : '',
            logoUrl: imgUrl,
            contactEmail: payload?.contactEmail ? payload?.contactEmail : '',
            contactPhone: payload?.contactPhone ? payload?.contactPhone.toString() : '',
            description: payload?.description ? payload?.description : '',
            employeesCount: payload?.employeesCount
                ? +payload?.employeesCount
                : 0,
            foundedDate: payload?.foundedDate ? typeof payload.foundedDate === "object" ? moment(payload?.foundedDate?.$d).format("YYYY-MM-DD") : payload?.foundedDate : null,
            industry: payload?.industry?.id ?? '',
            website: payload?.website ? payload?.website : '',
        };

        input.socialMediaLinks = JSON.stringify(social);
        updateCompany({ variables: { input, isCandidate: false, userId } });
    };

    useEffect(() => {
        if (data != null) {

            setPayload({
                name: data?.name,
                logoUrl: data?.logoUrl,
                contactEmail: data?.contactEmail,
                contactPhone: data?.contactPhone ? +data?.contactPhone : "",
                description: data?.description,
                employeesCount: data?.employeesCount,
                foundedDate: data?.foundedDate,
                industry: data?.industry,
                website: data?.website,
            });
            setSocial(JSON.parse(data?.socialMediaLinks));
        }
    }, [data]);
    useEffect(() => {
        if (open) {
            getIndustryList({ variables: { first: 20 } });
        }
    }, [open]);

    return (
        <CModal
            open={open}
            onClose={onClose}
            maxWidth="lg"
            title="Edit Company Profile"
        >
            <Box>

                <Box

                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 5,
                        gap: 2,
                        flexWrap: 'wrap'
                    }}
                >
                    <Box>
                        <Typography
                            variant="subHeader3"
                            fontWeight={600}
                            color={'text.darkBlue'}
                            mb={1}
                        >
                            Company Logo
                        </Typography>
                        <Typography>
                            This image will be shown publicly
                            <br /> as your profile picture
                        </Typography>
                    </Box>
                    <Box>
                        <UploadProfileImg
                            existingImage={payload.logoUrl}
                            onChange={(e) =>
                                setPayload({ ...payload, logoUrl: e })
                            }
                        />
                    </Box>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Company Name"
                            name="name"
                            placeholder="e.g. Wright Talent"
                            value={payload?.name}
                            onChange={(e) => onChangePayload('name', e)}
                            error={error?.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Website"
                            name="website"
                            placeholder="e.g. google.com"
                            value={payload.website}
                            onChange={(e) => onChangePayload('website', e)}
                            error={error?.website}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <AutoComplete
                            value={payload.industry}
                            onOptionChange={onIndustryOptionChange}
                            onQueryChange={onIndustryQueryChange}
                            label="Industry"
                            options={industryList?.industryList?.edges?.map(
                                (el) => el.node,
                            )}
                            getOptionLabel={(option) =>
                                option ? `${option.name}` : 'Search Industry'
                            }
                            placeholder="Industry"
                            error={error?.industry}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Phone"
                            name="contactPhone"
                            placeholder="e.g. +971123456789"
                            type="number"
                            value={payload.contactPhone}
                            onChange={(e) => onChangePayload('contactPhone', e)}
                            error={error?.contactPhone}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Email"
                            name="contactEmail"
                            placeholder="e.g. example@gmail.com"
                            value={payload.contactEmail}
                            onChange={(e) => onChangePayload('contactEmail', e)}
                            error={error?.contactEmail}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CDatePicker
                            label="Founded Date"
                            name="foundedDate"
                            placeholder="e.g. "
                            onChange={(e) => setPayload({ ...payload, foundedDate: e })}

                            value={payload.foundedDate ? dayjs(payload.foundedDate) : null}


                            error={error?.foundedDate}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="No. of Employees"
                            name="employeesCount"
                            placeholder="e.g. 50"
                            value={payload.employeesCount}
                            type="number"
                            onChange={(e) =>
                                onChangePayload('employeesCount', e)
                            }
                            error={error?.employeesCount}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CTextArea
                            label="Company Details"
                            minRow={10}
                            value={payload.description}
                            onChange={(e) => onChangePayload('description', e)}
                            error={error?.description}
                        />
                    </Grid>
                    <Grid item xs={12} mb={-4} mt={1}>
                        <ProfileDetailHeader title="Social Links" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Facebook"
                            name="facebook"
                            value={social?.facebook}
                            onChange={(e) => onChangeSocial('facebook', e)}
                            error={error?.facebook}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Twitter"
                            name="twitter"
                            value={social?.twitter}
                            onChange={(e) => onChangeSocial('twitter', e)}
                            error={error?.twitter}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="LinkedIn"
                            name="linkedin"
                            value={social?.linkedin}
                            onChange={(e) => onChangeSocial('linkedin', e)}
                            error={error?.linkedin}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Instagram"
                            name="instagram"
                            value={social?.instagram}
                            onChange={(e) => onChangeSocial('instagram', e)}
                            error={error?.instagram}
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

export default CudCompanyDetail;
