import { Images } from '@/utils/imagePath';
import { Delete, Edit } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { CiLinkedin } from 'react-icons/ci';
import AddTeamModal from './AddTeamModal';
import ProfileDetailHeader from './ProfileDetailHeader';
import { DELETE_RESUME_ITEM } from '@/graphql/resume/resumeMutation';
import { useMutation } from '@apollo/client';
import Toaster from '@/common/Toaster';
import DeleteModal from '@/common/DeleteModal';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

const TeamCard = ({ handleOpeUpdateTeamModal, data, refetch }) => {


    const [openDeleteModal, setOpenDeleteModal] = useState(false);


    const handleLinkClick = (link) => {
        window.open(link, '_blank');
    };
    const [deleteTeamMember] = useMutation(DELETE_RESUME_ITEM, {
        onCompleted: (res) => {
            Toaster({
                type: 'success',
                message: res.deleteItem.message,
            });
            refetch();
        },
        onError: (err) => {
            Toaster({
                message: err.message,
                type: 'error',
            });
        },
    });

    const handleDeleteTeamMember = () => {
        deleteTeamMember({
            variables: {
                ids: [data.id],
                modelName: 'companyteammember',
            },
        });
    };

    return (
        <>
            <Box
                sx={{
                    border: 1,
                    width: "95%",
                    py: 2.6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#D6DDEB',
                    borderRadius: 1,
                    position: 'relative',
                    height: 250,
                    margin: "auto"
                }}
            >
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
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
                        onClick={() => handleOpeUpdateTeamModal(data)}
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
                <Box
                    sx={{
                        mb: 2,
                        height: 80,
                        width: 80,
                        borderRadius: '50%',
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        src={data?.imageUrl ? data?.imageUrl : Images.NO_IMAGE}
                        alt="team profile"
                        height={80}
                        width={80}
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </Box>
                <Typography
                    sx={{ fontWeight: 600, color: 'text.darkBlue' }}
                    variant="bodyLarge"
                >
                    {data?.memberName}
                </Typography>
                <Typography sx={{ color: 'text.grey' }} variant="bodyNormal">
                    {data?.role}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 2,
                        alignItems: 'center',
                        color: 'text.grey',
                    }}
                >
                    {data.instagram ? (
                        <IconButton
                            onClick={() => handleLinkClick(data.instagram)}
                        >
                            <BsInstagram fontSize={20} />
                        </IconButton>
                    ) : null}
                    {data.linkdin ? (
                        <IconButton
                            onClick={() => handleLinkClick(data.linkdin)}
                        >
                            <CiLinkedin fontSize={25} />
                        </IconButton>
                    ) : null}
                </Box>
            </Box>
            <DeleteModal
                isOpen={openDeleteModal}
                setIsOpen={setOpenDeleteModal}
                handleDelete={handleDeleteTeamMember}
                message="this team member"
            />
        </>
    );
};

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1350 },
        items: 3
    },
    smallDesktop: {
        breakpoint: { max: 1350, min: 1150 },
        items: 2.5
    },
    laptop: {
        breakpoint: { max: 1150, min: 900 },
        items: 2
    },
    tablet: {
        breakpoint: { max: 900, min: 740 },
        items: 3
    },
    smallTablet: {
        breakpoint: { max: 740, min: 600 },
        items: 2.5
    },
    mobile: {
        breakpoint: { max: 600, min: 480 },
        items: 2
    },
    smallMobile: {
        breakpoint: { max: 480, min: 0 },
        items: 1
    },
};


const Teams = ({ data, refetch }) => {
    const [openAddTeamModal, setOpenAddTeamModal] = useState(false);
    const [updateTeamMemberData, setUpdateTeamMemberData] = useState(null);

    const handleAddTeamModal = (singleData) => {
        setOpenAddTeamModal(true);
        setUpdateTeamMemberData(singleData);
    };
    return (
        <Box>
            <ProfileDetailHeader
                title="Teams"
                showAdd
                handleAdd={() => handleAddTeamModal(null)}
            />
            {data?.teamMembers?.edges ? <Carousel showDots={true}
                responsive={responsive}>
                {data?.teamMembers?.edges.map((item, idx) => {
                    return (
                        <TeamCard
                            data={item.node}
                            key={`${item.node.id}_teamMember-${idx}`}
                            handleOpeUpdateTeamModal={handleAddTeamModal}
                            refetch={refetch}
                        />
                    );
                })}
            </Carousel> : null}


            <AddTeamModal
                isOpen={openAddTeamModal}
                setIsOpen={setOpenAddTeamModal}
                companyId={data?.id}
                updateTeamMemberData={updateTeamMemberData}
                setUpdateTeamMemberData={setUpdateTeamMemberData}
                refetch={refetch}
            />


            <Divider sx={{ my: 3 }} />
        </Box>
    );
};

export default Teams;
