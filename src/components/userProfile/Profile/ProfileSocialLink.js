import Button from '@/components/Common/UI/Button';
import {
    Edit,
    Facebook,
    GitHub,
    Instagram,
    Language,
    LinkedIn,
    Twitter,
    YouTube,
} from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';
import React from 'react';
import { BsStackOverflow } from 'react-icons/bs';
import EditProfileSocialLink from './EditProfileSocialLink';

const ProfileSocialLink = ({ data, refetch }) => {
    const { name, urlLink } = data;
    const iconsProps = { color: '#7C8493' };
    const [open, setOpen] = React.useState(false);
    const handleClone = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    let icon = null;
    if (name === 'Github') {
        icon = <GitHub style={iconsProps} />;
    } else if (name === 'LinkedIn') {
        icon = <LinkedIn style={iconsProps} />;
    } else if (name === 'Facebook') {
        icon = <Facebook style={iconsProps} />;
    } else if (name === 'Twitter') {
        icon = <Twitter style={iconsProps} />;
    } else if (name === 'Instagram') {
        icon = <Instagram style={iconsProps} />;
    } else if (name === 'Youtube') {
        icon = <YouTube style={iconsProps} />;
    } else if (name === 'Website') {
        icon = <Language style={iconsProps} />;
    } else if (name === 'StackOverflow') {
        icon = <BsStackOverflow style={iconsProps} />;
    } else {
        icon = <Icon style={iconsProps} />;
    }

    return (
        <>
            <EditProfileSocialLink
                refetch={refetch}
                data={data}
                open={open}
                onClose={handleClone}
            />
            <Box
                mt={1}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={2}
                gap={2}
            >
                <Box mt={2} display={'flex'} gap={1}>
                    <Box>{icon}</Box>
                    <Box>
                        <Typography variant="body1" color={'text.secondary'}>
                            {name}
                        </Typography>
                        <Typography variant="body1" color="primary">
                            {urlLink}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Button
                        onClick={handleOpen}
                        variant="outlined"
                        style={{
                            borderColor: '#D6DDEB',
                            borderRadius: '0',
                            maxWidth: 20,
                            mxaHeight: 20,
                        }}
                    >
                        <Edit />
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default ProfileSocialLink;
