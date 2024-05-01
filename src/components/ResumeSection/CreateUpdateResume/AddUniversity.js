import React, { useState } from 'react'
import SearchAndInputMenu from '@/common/SearchAndInputMenu'
import { ALL_UNIVERSITY_LIST } from '@/graphql/resume/resumeQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Box, Grid } from '@mui/material'
import { CREATE_UNIVERSITY } from '../graphql/mutation';
import Toaster from '@/common/Toaster';
import CInput from '@/components/companyProfile/formElement/CInput';
import CTextArea from '@/components/companyProfile/formElement/CTextArea';
import UploadProfileImg from '@/components/UploadProfileImg/UploadProfileImg';
import Button from '@/components/Common/UI/Button';
import { handleUploadMediaToBucket, validateEmail, validateUrl } from '@/utils';
import CModal from '@/common/CModal';

const AddUniversity = ({ error, setError, setPayload, payload }) => {

    const [openModal, setOpenModal] = useState(false)

    const [inputData, setInputData] = useState({
        name: "",
        contactEmail: "",
        contactPhone: "",
        website: "",
        establishedYear: "",
        address: "",
        country: "",
        city: "",
        description: "",
        logoUrl: ""
    })
    const [inputError, setInputError] = useState({})

    const [getUniversityList, { data: universityList, loading: universityLoading, refetch: refetchUniversityList }] = useLazyQuery(
        ALL_UNIVERSITY_LIST,
        {
            nextFetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
            onError: (error) => {
                Toaster({
                    type: 'error',
                    message: error.message,
                });
            },
        },
    );

    const [addUniversity, { loading: addUniversityLoading }] = useMutation(CREATE_UNIVERSITY, {
        onCompleted: (res) => {
            Toaster({ type: 'success', message: "Institute Added Successfully!" })
            refetchUniversityList()
            onUniversityOptionChange(inputData.name)
            handleModalClose()
        },
        onError: (error) => {
            if (error?.graphQLErrors[0]?.extensions?.errors) {
                setInputError(error.graphQLErrors[0].extensions.errors);
            } else {
                Toaster({
                    message: error.message,
                    type: 'error',
                });
            }
        },
    });

    const handleModalClose = () => {
        setOpenModal(false)
        setInputData({
            name: "",
            contactEmail: "",
            contactPhone: "",
            website: "",
            establishedYear: "",
            address: "",
            country: "",
            city: "",
            description: "",
            logoUrl: ""
        })
        setInputError({})
    }


    const onUniversityOptionChange = (value) => {
        setPayload({ ...payload, institution: value });

        setError({ ...error, institution: "" })
    };

    const onUniversityQueryChange = (value) => {
        getUniversityList({
            variables: {
                name_Icontains: value,
                first: 10
            },
        });

        setInputData({ ...inputData, name: value })
        setError({ ...error, institution: "" })
    };


    const handleInputChange = (e) => {
        let { name, value } = e.target

        if (name === "establishedYear" && (value < 0 || value.length > 4)) return
        if (name === "contactPhone" && value < 0) return

        setInputData({ ...inputData, [name]: value })
        setInputError({ ...inputError, [name]: '' })
    }

    const handleImageChange = (file) => {
        setInputData({ ...inputData, logoUrl: file });

    };

    const handleAddInstitution = async () => {
        if (!inputData.name) {
            setInputError({ ...inputError, name: 'This field is required.' })
            return
        }
        if (inputData.website && !validateUrl(inputData.website)) {
            setInputError({ ...inputError, website: 'Please enter a valid website URL.' })
            return
        }
        if (inputData.contactEmail && !validateEmail(inputData.contactEmail)) {
            setInputError({ ...inputError, contactEmail: 'Please enter a valid email.' })
            return
        }

        let imgUrl = inputData.logoUrl;

        if (imgUrl) {
            imgUrl = await handleUploadMediaToBucket(
                inputData.logoUrl,
                'education',
            );
        }

        let payload = {
            ...inputData,
            logoUrl: imgUrl
        }

        for (const key in payload) {

            if (!payload[key]) {
                delete payload[key]
            }
        }
        if (payload.establishedYear) {
            payload.establishedYear = +payload.establishedYear
        }

        addUniversity({
            variables: {
                input: payload
            }
        })
    }




    return (
        <Box>
            <SearchAndInputMenu
                value={payload.institution}
                label="Institute"
                placeholder="Institute"
                display="name"
                valueKey="name"
                options={universityList?.universityList?.edges?.map(
                    (el) => el.node,
                )}
                error={error?.institution}
                handleSelect={onUniversityOptionChange}
                onChange={onUniversityQueryChange}
                loading={universityLoading}
                addLoading={addUniversityLoading}
                addLabel="Add Institute"
                setOpenAddModal={setOpenModal}
            >
                <CModal maxWidth="md" title={"Add Institute"} open={openModal} onClose={handleModalClose}>
                    <UploadProfileImg
                        onChange={handleImageChange}
                    />
                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} md={6}>
                            <CInput label="Name" value={inputData.name} onChange={handleInputChange} name="name" error={inputError?.name} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput label="Email" value={inputData.contactEmail} onChange={handleInputChange} name="contactEmail" error={inputError?.contactEmail} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput label="Phone Number" type="number" value={inputData.contactPhone} onChange={handleInputChange} name="contactPhone" error={inputError?.contactPhone} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput label="Website" value={inputData.website} onChange={handleInputChange} name="website" error={inputError?.website} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput label="Established Year" type="number" value={inputData.establishedYear} onChange={handleInputChange} name="establishedYear" error={inputError?.establishedYear} />
                        </Grid>
                        <Grid item xs={12}>
                            <CInput label="Address" value={inputData.address} onChange={handleInputChange} name="address" error={inputError?.address} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput label="Country" value={inputData.country} onChange={handleInputChange} name="country" error={inputError?.country} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput label="City" value={inputData.city} onChange={handleInputChange} name="city" error={inputError?.city} />
                        </Grid>

                        <Grid item xs={12}>
                            <CTextArea label="Description" value={inputData.description} onChange={handleInputChange} name="description" error={inputError?.description} />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button label="Add Institute" style={{ width: 200, py: 1.2 }} onClick={handleAddInstitution} isLoading={addUniversityLoading} />
                    </Box>
                </CModal>
            </SearchAndInputMenu>
        </Box>
    )
}

export default AddUniversity