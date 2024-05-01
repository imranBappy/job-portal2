import { Images } from '@/utils/imagePath'
import { Box, Grid, Hidden, Typography, useMediaQuery } from '@mui/material'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '../Common/UI/Button'

const ResumeTemplateHeader = () => {
    const router = useRouter()
    const isSmallTabletView = useMediaQuery("(max-width:780px)")

    const handleRedirectToCreateResume = () => {
        let token = Cookies.get('token');
        token ? router.push('/resume') : router.push('/login?path=resume')
    }


    return (
        <Grid container spacing={5} mt={0}>
            <Grid item xs={12} md={7}>
                <Typography variant={isSmallTabletView ? "h3" : 'h1'} color="text.darkBlue">Find the ideal Resume template for your profession.</Typography>
                <Box sx={{ marginTop: "20.8px !important" }}>

                    <Typography variant='subHeader1' color="text.lightBlue">{`You've come to the right place if you're looking for a resume template. Select a Resume template that is appropriate for the position and will make writing your resume as simple as drinking water! We provide a wide choice of resume/CV templates for many industries, whether the employment is corporate, creative, or traditional.`}</Typography>
                </Box>
                <Button onClick={handleRedirectToCreateResume} label="Create Resume" style={{ px: 4, py: 1, fontSize: "18px", mt: "30px" }} />
            </Grid>
            <Hidden mdDown>
                <Grid item xs={12} md={5} >
                    <Box sx={{ height: 470, width: "100%", }}>
                        <Image src={Images.RESUME_TEMPLATE_HEADER} alt='header ' style={{ height: "100%", width: "100%" }} />
                    </Box>
                </Grid>
            </Hidden>
        </Grid>
    )
}

export default ResumeTemplateHeader