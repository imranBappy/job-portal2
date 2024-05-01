import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import AddOfficeAddressModal from './AddOfficeAddressModal';
import ProfileDetailHeader from './ProfileDetailHeader';
import { DELETE_RESUME_ITEM } from '@/graphql/resume/resumeMutation';
import { useMutation } from '@apollo/client';
import Toaster from '@/common/Toaster';
import DeleteModal from '@/common/DeleteModal';

const CountryList = ({ data, handleOpeUpdateOfficeLocationModal, refetch }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [deleteAddress] = useMutation(DELETE_RESUME_ITEM, {
        onCompleted: (res) => {
            Toaster({
                type: 'success',
                message: res.deleteItem.message,
            });
            refetch();
            setOpenDeleteModal(false)
        },
        onError: (err) => {
            Toaster({
                message: err.message,
                type: 'error',
            });
        },
    });

    const handleDeleteTeamMember = () => {
        deleteAddress({
            variables: {
                ids: [data.id],
                modelName: 'officelocation',
            },
        });
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    mb: 1,
                    justifyContent: 'space-between',
                    flexWrap: "wrap"
                }}
            >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {/* <Box sx={{ height: 35, width: 40 }}>
                <Image
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                    }}
                    src={Images.FLAG_ICON}
                    alt="flag"
                    />
                </Box> */}
                    <Typography
                        variant="bodyNormal"
                        color="black"
                        fontWeight={600}
                    >
                        {data?.country} {','} {data?.city}
                    </Typography>
                    {data?.isHeadquarter ? (
                        <Box
                            sx={{
                                py: 1,
                                px: 2,
                                borderRadius: 5,
                                bgcolor: 'primary.light',
                            }}
                        >
                            <Typography
                                variant="bodySmall"
                                color="text.blue"
                                fontWeight={600}
                            >
                                Head Quarters
                            </Typography>
                        </Box>
                    ) : null}
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton
                        sx={{
                            height: 35,
                            width: 35,
                            border: 2,
                            borderColor: 'primary.light',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1,
                            mb: 1,
                        }}
                        onClick={() => handleOpeUpdateOfficeLocationModal(data)}
                    >
                        <Edit
                            sx={{ fontSize: 20, color: 'primary.dark' }}
                            color={'primary.dark'}
                        />
                    </IconButton>
                    <IconButton
                        sx={{
                            height: 35,
                            width: 35,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 1,
                            bgcolor: 'rgba(255,77,79,.2)',
                            '&:hover': {
                                bgcolor: 'rgba(255,77,79,.3)',
                            },
                        }}
                        onClick={() => setOpenDeleteModal(true)}
                    >
                        <Delete sx={{ fontSize: 20, color: 'common.red' }} />
                    </IconButton>
                </Box>
            </Box>
            <DeleteModal
                isOpen={openDeleteModal}
                setIsOpen={setOpenDeleteModal}
                handleDelete={handleDeleteTeamMember}
                message="this office location"
            />
        </>
    );
};

const OfficeLocation = ({ data, refetch }) => {
    const [openAddOfficeAddressModal, setOpenAddOfficeLocationModal] =
        useState(false);
    const [updateOfficeLocationData, setUpdateOfficeLocationData] =
        useState(null);

    const handleAddOfficeLocationModal = (singleData) => {
        setOpenAddOfficeLocationModal(true);
        setUpdateOfficeLocationData(singleData);
    };

    return (
        <Box>
            <ProfileDetailHeader
                title="Office Locations"
                showAdd
                handleAdd={() => handleAddOfficeLocationModal(null)}
            />

            {data?.officeLocations?.edges &&
                data?.officeLocations?.edges?.length > 0
                ? data?.officeLocations?.edges?.map((item, key) => (
                    <CountryList
                        key={`office_list_${key}`}
                        data={item.node}
                        handleOpeUpdateOfficeLocationModal={
                            handleAddOfficeLocationModal
                        }
                        refetch={refetch}
                    />
                ))
                : null}

            <AddOfficeAddressModal
                isOpen={openAddOfficeAddressModal}
                setIsOpen={setOpenAddOfficeLocationModal}
                companyId={data?.id}
                updateOfficeLocationData={updateOfficeLocationData}
                setUpdateOfficeLocationData={setUpdateOfficeLocationData}
                refetch={refetch}
            />
        </Box>
    );
};

export default OfficeLocation;
