import { Box, Divider, Grid, Typography } from '@mui/material';
import UploadProfileImg from '@/components/UploadProfileImg/UploadProfileImg';
import CInput from '@/components/companyProfile/formElement/CInput';
import CTextArea from '@/components/companyProfile/formElement/CTextArea';
import Button from '@/components/Common/UI/Button';


const Profile = () => {


    return (
        <Box>
            <Typography variant="h2" color="text.darkBlue">
                Basic Information
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mt: 5 }}>
                <Typography variant="h3" color="text.darkBlue">
                    Profile
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
                                Profile Picture
                            </Typography>
                            <Typography>
                                This image will be shown publicly as your
                                profile picture, <br /> it will help recruiters
                                recognize you! as your profile picture
                            </Typography>
                        </Box>
                        <Box>
                            <UploadProfileImg />
                        </Box>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Full Name"
                                name="fullName"
                                placeholder="e.g. Imran"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Job Title"
                                name="jobTitle"
                                placeholder="e.g. Engineer"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Phone"
                                name="phone"
                                placeholder="e.g. +880 123456789"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Email Address"
                                name="email"
                                placeholder="e.g. imranhossen@gmail.com"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Date Of Birth"
                                placeholder="e.g. 12/12/1990"
                                name="dateofbirth"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CInput
                                label="Language"
                                placeholder="e.g. Bangla,English"
                                name="language"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <CTextArea label="Job Description" minRow={10} />
                        </Grid>
                    </Grid>
                    <Box sx={{ my: 5 }}>
                        <Typography variant="h3" color="text.darkBlue">
                            Work Experience
                        </Typography>

                        <Grid container mt={2} spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Job Title"
                                    name="jobTitle"
                                    placeholder="e.g. Software Enginner"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Employer"
                                    name="employer"
                                    placeholder="e.g. W3karnel"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="City"
                                    name="city"
                                    placeholder="e.g. Dubai"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Country"
                                    name="country"
                                    placeholder="e.g. UAE"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Start Date"
                                    name="startDate"
                                    type="date"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="End Date"
                                    name="endDate"
                                    type="date"
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ my: 5 }}>
                        <Typography variant="h3" color="text.darkBlue">
                            Education Details
                        </Typography>

                        <Grid container mt={2} spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Institute "
                                    name="institute"
                                    placeholder="e.g. Mangrove Institute Science and Technology"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Institute Location"
                                    name="instituteLocation"
                                    placeholder="e.g. Khulna, Bangladesh"
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <CInput
                                    label="Degree"
                                    name="degree"
                                    placeholder="e.g. Diploma in Computer Enginning"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Subject"
                                    name="subject"
                                    placeholder="e.g. Human Interface"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <CInput
                                    label="Start Date"
                                    name="endDate"
                                    type="date"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <CInput
                                    label="End Date"
                                    name="endDate"
                                    type="date"
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ my: 5 }}>
                        <Typography variant="h3" color="text.darkBlue">
                            Social Network
                        </Typography>

                        <Grid container mt={2} spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Facebook "
                                    name="facebook"
                                    placeholder="e.g. UI/UX Designer"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Twitter"
                                    name="twitter"
                                    placeholder="e.g. twitter"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="LinkedIn"
                                    name="linkedin"
                                    placeholder="e.g. LinkedIn"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Instagram"
                                    name="instagram"
                                    placeholder="e.g. Instagram"
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ my: 5 }}>
                        <Typography variant="h3" color="text.darkBlue">
                            Contract Information
                        </Typography>

                        <Grid container mt={2} spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="Country "
                                    name="country"
                                    placeholder="e.g. Country"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CInput
                                    label="City"
                                    name="city"
                                    placeholder="e.g. City"
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <CInput
                                    label="Complete Address "
                                    name="address"
                                    placeholder="e.g. Address"
                                />
                            </Grid>
                        </Grid>
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
