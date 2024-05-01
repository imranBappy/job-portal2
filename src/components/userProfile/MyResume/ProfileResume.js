"use client";

import Button from '@/components/Common/UI/Button';
import { Images } from '@/utils/imagePath';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RenameResume from './RenameResume';


const ProfileResume = ({ data, refetch }) => {
    const router = useRouter();

    const [menuAnchor, setMenuAnchor] = useState(null);
    const [openRenameModal, setOpenRenameModal] = useState(false)
    const [renameTemplateId, setRenameTemplateId] = useState(null)
    const [isError, setIsError] = useState(false);

    const openMenu = Boolean(menuAnchor);
    const handleClick = (event) => {
        setMenuAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setMenuAnchor(null);
    };

    const handleEditRedirect = (id) => {
        router.push(`/resume/${id}`);
    };

    const handleRenamResume = (id) => {
        setRenameTemplateId(id)
        setOpenRenameModal(true)
    }

    const handlePreview = (id) => {
        router.push(`/resume_preview?id=${id}`)
    };





    return (
        <Box>
            <Box
                sx={{
                    width: { xs: "100%", sm: 350 },
                    height: 450,
                    mb: 2,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {isError ?
                    <Box
                        sx={{
                            width: { xs: '100%', sm: 350 },
                            height: 450,
                            border: "2px solid rgba(28, 62, 94, 0.50)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: 'center'
                        }}

                    >
                        <Button
                            onClick={() => handlePreview(data.id)}
                            style={{
                                height: 50,
                                width: "80%"
                            }}
                        >
                            Complate your resume
                        </Button>
                    </Box> : <Image
                        src={data?.generatedTemplatePreview || Images.RESUME_PREVIEW}
                        layout="fill"
                        objectFit="cover"
                        alt="resume"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: '0 0',
                        }}
                        onError={() => setIsError(true)}
                    />
                }

                <Button
                    onClick={handleClick}
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        borderRadius: '5px',
                        backgroundColor: 'rgba(50, 59, 76, 0.20)',
                        [':hover']: {
                            backgroundColor: 'rgba(50, 59, 76, 0.20)',
                        },
                    }}
                >
                    <MoreHorizIcon
                        style={{
                            color: '#1C3E5E',
                        }}
                    />
                </Button>
                <Menu
                    anchorEl={menuAnchor}
                    id="account-menu"
                    open={openMenu}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            mt: 1.5,
                            width: 180,
                            bgcolor: "#E9EBFD",
                            color: "black",
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                                bgcolor: "#E9EBFD",
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem sx={{ display: 'flex', alignItems: 'center', gap: 1, }} onClick={() => handleEditRedirect(data.id)}>
                        <Image src={Images.RESUME_EDIT_ICON} height={16} width={16} alt="icon" />  Edit
                    </MenuItem>
                    <MenuItem sx={{ display: 'flex', alignItems: 'center', gap: 1, }} onClick={() => handleRenamResume(data.id)}>
                        <Image src={Images.RENAME_ICON} height={16} width={16} alt="icon" />  Rename
                    </MenuItem>
                    <MenuItem sx={{ display: 'flex', alignItems: 'center', gap: 1, }} onClick={() => handleDownloadPdf(data)}>
                        <Image src={Images.DOWNLOAD_ICON} height={16} width={16} alt="icon" />  Download
                    </MenuItem>
                    <MenuItem sx={{ display: 'flex', alignItems: 'center', gap: 1, }} onClick={() => handlePreview(data.id)}>
                        <Image src={Images.EYE_ICON} height={20} width={20} alt="icon" />  Preview
                    </MenuItem>

                </Menu>

            </Box>
            <Box>
                <Typography fontSize={16} fontWeight={600} color="text.primary">
                    {data?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Last updated:{' '}
                    {data?.updatedOn
                        ? moment(data?.updatedOn).calendar()
                        : moment(data?.createdOn).calendar()}
                </Typography>
            </Box>
            <RenameResume refetch={refetch} open={openRenameModal} setOpen={setOpenRenameModal} setRenameTemplateId={setRenameTemplateId} renameTemplateId={renameTemplateId} />
        </Box>
    );
};

export default ProfileResume;
