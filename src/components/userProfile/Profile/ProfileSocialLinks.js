import React from 'react';
import { Box, Typography } from '@mui/material';

import ProfileCardHeader from '../ProfileCardHeader';
import EditProfileSocialLinks from './EditAdditionalDetails';
import { useQuery } from '@apollo/client';
import { SOCIAL_LINK_QUERY } from '@/graphql/socialLink/socialLinkQuery';
import ProfileSocialLink from './ProfileSocialLink';
const ProfileSocialLinks = () => {
    const { data, refetch } = useQuery(SOCIAL_LINK_QUERY);

    const links = data?.socialMediaLinksList?.edges?.map((item) => ({
        id: item?.node?.id,
        name: item?.node?.name,
        urlLink: item?.node?.urlLink,
    }));
    const [open, setOpen] = React.useState(false);
    const handleClone = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <EditProfileSocialLinks refetch={refetch} open={open} onClose={handleClone} />
            <Box
                style={{
                    width: '100%',
                    border: '1px solid #D6DDEB',
                    padding: '1rem',
                }}
            >
                <ProfileCardHeader
                    type="add"
                    onClick={handleOpen}
                    title="Social Links"
                />
                {links?.map((item) => (
                    <ProfileSocialLink
                        refetch={refetch}
                        key={item.id}
                        data={item}
                    />
                ))}
            </Box>
        </>
    );
};

export default ProfileSocialLinks;
