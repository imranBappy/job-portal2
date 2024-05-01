import { Box, Divider, IconButton, Typography } from '@mui/material';
import { AiOutlineInstagram } from 'react-icons/ai';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import ProfileDetailHeader from './ProfileDetailHeader';

const ContactButton = ({ icon, title, onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: 2,
                borderColor: 'primary.light',
                borderRadius: 10,
                color: 'primary.dark',
                p: 1,
                px: 2,
                width: { xs: "100%", sm: "auto" },
            }}
        >
            {icon}
            <Typography fontWeight={600}>{title}</Typography>
        </IconButton>
    );
};

const Contact = ({ data }) => {
    let socialMediaLinks =
        data?.socialMediaLinks && JSON.parse(data?.socialMediaLinks)
            ? JSON.parse(data?.socialMediaLinks)
            : null;

    const handleLinkClick = (link) => {
        window.open(link, '_blank');
    };
    return (
        <Box>
            <ProfileDetailHeader title="Social Link" />

            {socialMediaLinks ? (
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {socialMediaLinks?.twitter ? (
                        <ContactButton
                            onClick={() =>
                                handleLinkClick(socialMediaLinks?.twitter)
                            }
                            icon={<BsTwitter fontSize={20} />}
                            title={socialMediaLinks?.twitter}
                        />
                    ) : null}
                    {socialMediaLinks?.facebook ? (
                        <ContactButton
                            onClick={() =>
                                handleLinkClick(socialMediaLinks?.facebook)
                            }
                            icon={<FaFacebookF fontSize={20} />}
                            title={socialMediaLinks?.facebook}
                        />
                    ) : null}
                    {socialMediaLinks?.linkedin ? (
                        <ContactButton
                            onClick={() =>
                                handleLinkClick(socialMediaLinks?.linkedin)
                            }
                            icon={<BsLinkedin fontSize={20} />}
                            title={socialMediaLinks?.linkedin}
                        />
                    ) : null}
                    {socialMediaLinks?.instagram ? (
                        <ContactButton
                            onClick={() =>
                                handleLinkClick(socialMediaLinks?.instagram)
                            }
                            icon={<AiOutlineInstagram fontSize={22} />}
                            title={socialMediaLinks?.instagram}
                        />
                    ) : null}
                </Box>
            ) : null}
            <Divider sx={{ my: 3 }} />
        </Box>
    );
};

export default Contact;
