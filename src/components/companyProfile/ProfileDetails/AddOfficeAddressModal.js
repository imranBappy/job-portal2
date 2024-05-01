import CModal from '@/common/CModal';
import Toaster from '@/common/Toaster';
import Button from '@/components/Common/UI/Button';
import { useMutation } from '@apollo/client';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CInput from '../formElement/CInput';
import CCheckbox from '../formElement/CheckBox';
import { OFFICE_LOCATION_CU } from './graphql/mutation';

const AddOfficeAddressModal = ({
    isOpen,
    setIsOpen,
    companyId,
    setUpdateOfficeLocationData,
    updateOfficeLocationData,
    refetch,
}) => {
    const [payload, setPayload] = useState({
        country: '',
        city: '',
        completeAddress: '',
        isHeadquarter: false,
    });
    const [error, setError] = useState({});

    const [saveOfficeLocation, { loading }] = useMutation(OFFICE_LOCATION_CU, {
        onCompleted: (res) => {
            Toaster({
                message: res.officeLocationCreateUpdate.message,
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
        setPayload({
            country: '',
            city: '',
            completeAddress: '',
            isHeadquarter: false,
        });
        if (setUpdateOfficeLocationData) {
            setUpdateOfficeLocationData(null);
        }
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const handleSave = async () => {
        let errorObj = {}

        if (!payload.country) {
            errorObj.country = 'This field is required.'
        }

        if (!payload.city) {
            errorObj.city = 'This field is required.'
        }

        if (!payload.completeAddress) {
            errorObj.completeAddress = 'This field is required.'
        }

        if (Object.keys(errorObj).length > 0) {
            setError(errorObj)
            return
        }

        let input = { ...payload, company: companyId };

        if (updateOfficeLocationData) {
            input.id = updateOfficeLocationData.id;
        }
        saveOfficeLocation({ variables: { officeLocations: [input] } });
    };
    useEffect(() => {
        if (updateOfficeLocationData) {
            setPayload({
                isHeadquarter: updateOfficeLocationData?.isHeadquarter,
                completeAddress: updateOfficeLocationData?.completeAddress,
                city: updateOfficeLocationData?.city,
                country: updateOfficeLocationData?.country,
            });
        }
    }, [updateOfficeLocationData]);

    return (
        <CModal
            title={`${updateOfficeLocationData ? 'Update' : 'Add'
                } Office Location`}
            maxWidth={'md'}
            open={isOpen}
            onClose={handleModalClose}
        >
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="Country"
                            placeholder="Enter country"
                            value={payload.country}
                            onChange={handleInputChange}
                            name="country"
                            error={error?.country}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CInput
                            label="City"
                            placeholder="Enter city"
                            value={payload.city}
                            onChange={handleInputChange}
                            name="city"
                            error={error?.city}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CInput
                            label="Complete Address"
                            placeholder="Enter complete address"
                            value={payload.completeAddress}
                            onChange={handleInputChange}
                            name="completeAddress"
                            error={error?.completeAddress}
                        />
                    </Grid>
                </Grid>
                <CCheckbox
                    label="Head Quarter Office"
                    value={payload.isHeadquarter}
                    sx={{ mt: 2 }}
                    onChange={(e) =>
                        setPayload({
                            ...payload,
                            isHeadquarter: e.target.checked,
                        })
                    }
                />
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

export default AddOfficeAddressModal;
