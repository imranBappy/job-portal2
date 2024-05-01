import UploadProfileImg from '@/components/UploadProfileImg/UploadProfileImg';
import { Box, Divider, Grid, Typography } from '@mui/material';
import CInput from '../formElement/CInput';
import CTextArea from '../formElement/CTextArea';
import { Add, Done } from '@mui/icons-material';
import { Images } from '@/utils/imagePath';
import Image from 'next/image';
import Button from '@/components/Common/UI/Button';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];
const Profile = () => {
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    };

    return (
        <Box>
            <Typography variant="h2" color="text.darkBlue">
                Basic Information
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mt: 5 }}>
                <Typography variant="h3" color="text.darkBlue">
                    Company Profile
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 5,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="subHeader3"
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.darkBlue',
                                    mb: 1,
                                }}
                            >
                                Company Logo
                            </Typography>
                            <Typography>
                                This images will be show publicly <br />
                                as your profile picture
                            </Typography>
                        </Box>
                        <Box>
                            <UploadProfileImg />
                        </Box>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Company Name"
                                name="companyName"
                                placeholder="e.g. Charlie"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Website"
                                name="companyName"
                                placeholder="e.g. Charlie"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CInput
                                label="Company Type"
                                name="companyName"
                                placeholder="e.g. Charlie"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Phone"
                                name="phone"
                                placeholder="e.g. Charlie"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Email Address"
                                placeholder="e.g. Charlie"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Founded Date"
                                placeholder="e.g. Charlie"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Team Size"
                                placeholder="e.g. Charlie"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CTextArea label="Company Details" minRow={10} />
                        </Grid>
                    </Grid>
                    <Box sx={{ my: 5 }}>
                        <Typography variant="h3" color="text.darkBlue">
                            Team Member
                        </Typography>

                        <Grid container mt={2} spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CInput label="Member Name" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput label="Role" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput label="Instagram" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput label="Instagram" />
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mt: 1,
                                    }}
                                >
                                    <UploadProfileImg />
                                </Box>
                            </Grid>
                        </Grid>
                        <Typography
                            sx={{
                                display: 'flex',
                                gap: 1,
                                color: 'primary.main',
                                mt: 3,
                            }}
                        >
                            <Add /> Add one more team member{' '}
                        </Typography>
                    </Box>
                    <Box sx={{ my: 5 }}>
                        <Typography variant="h3" color="text.darkBlue">
                            Tech Stack Details
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                mt: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    bgcolor: 'primary.main',
                                    height: 100,
                                    width: 100,
                                    borderRadius: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}
                            >
                                <Image
                                    height={55}
                                    width={55}
                                    src={Images.HTML_ICON_LOGO}
                                    alt="icon"
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        borderRadius: '50%',
                                    }}
                                >
                                    <Done sx={{ color: 'white' }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ my: 5 }}>
                        <Typography
                            sx={{ mb: 5 }}
                            variant="h3"
                            color="text.darkBlue"
                        >
                            Parks & Benefits
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                            }}
                        >
                            <CTextArea label="Full Healthcare" minRow={10} />
                            <CTextArea label="Unlimited Vacation" minRow={10} />
                            <CTextArea label="Skill Development" minRow={10} />
                            <CTextArea label="Team Summits" minRow={10} />
                            <CTextArea label="Remote Working" minRow={10} />
                            <CTextArea label="Commuter Benefits" minRow={10} />
                            <CTextArea label="We give back" minRow={10} />
                        </Box>
                    </Box>
                    <Box sx={{ my: 5 }}>
                        <Typography variant="h3" color="text.darkBlue">
                            Social Network
                        </Typography>

                        <Grid container mt={2} spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CInput label="Facebook" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput label="Twitter" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput label="LinkedIn" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput label="Instagram" />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ my: 5 }}>
                        <Typography variant="h3" color="text.darkBlue">
                            Office Location
                        </Typography>

                        <Grid container mt={2} spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CInput label="Country" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput label="City" />
                            </Grid>
                            <Grid item xs={12}>
                                <CInput label="Complete Address" />
                            </Grid>
                        </Grid>
                        <Typography
                            sx={{
                                display: 'flex',
                                gap: 1,
                                color: 'primary.main',
                                mt: 3,
                            }}
                        >
                            <Add /> Add more location{' '}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h3" color="text.darkBlue">
                            Working Environment
                        </Typography>

                        <FileUploader
                            multiple={true}
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                        >
                            <Box
                                sx={{
                                    border: 1,
                                    height: '114px',
                                    width: '100%',
                                    overflow: 'hidden',
                                    my: 5,
                                    border: '2px dashed',
                                    borderColor: 'primary.dark',
                                    borderRadius: '1rem',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    src={Images.IMG_ICON_LOGO}
                                    height={32}
                                    width={32}
                                    alt="icon"
                                />
                                <Typography color="primary.dark">
                                    Click to replace{' '}
                                    <Typography
                                        variant="span"
                                        color="text.grey"
                                    >
                                        or drag and drop
                                    </Typography>
                                </Typography>
                                <Typography color="text.secondary">
                                    SVG, PNG, JPG or GIF (max. 400 x 400px)
                                </Typography>
                            </Box>
                        </FileUploader>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button label="Save" style={{ fontSize: 20, px: 10 }} />
            </Box>
        </Box>
    );
};

export default Profile;
