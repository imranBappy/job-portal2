import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { Images } from '@/utils/imagePath'

const FeatureCard = ({ icon, height, width, title }) => {
    return <Box sx={{ height: "250px", }}>
        <Box sx={{ width: "80%", margin: "auto", height: "100%", textAlign: 'center', gap: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Image src={icon} alt="edit icon" height={height || 44} width={width || 44} />
            <Typography variant="h6" color="text.darkBlue">{title}</Typography>
            <Typography variant="subHeader3" color="text.darkBlue">Create an awesome resume in minutes, without leaving your web browser.</Typography>
        </Box>
    </Box>

}

const ResumeTemplateFeatures = () => {
    return (
        <Box sx={{ mt: "120px" }}>
            <Box sx={{ width: { xs: "80%", md: "60%" }, textAlign: 'center', margin: "auto", mb: 5 }}>
                <Typography variant='h2' color="text.darkBlue">Features designed to help you win your dream job</Typography>
            </Box>

            <Grid container>
                <Grid item xs={12} md={4} sx={{ borderBottom: { xs: "none", md: "1px solid rgba(0,0,0,0.2)" }, }}>
                    <FeatureCard icon={Images.EDIT_ICON} title="Easy online resume create" description="Create an awesome resume in minutes, without leaving your web browser." />
                </Grid>
                <Grid item xs={12} md={4} sx={{ border: { xs: "none", md: "1px solid rgba(0,0,0,0.2)" }, borderTop: 'none !important' }}>
                    <FeatureCard icon={Images.SPELL_CHECKER_ICON} title="Automatic spell-checker" description="Our built-in spell-checker takes care of the grammar for you. Create a resume with zero typos or errors." />
                </Grid>
                <Grid item xs={12} md={4} sx={{ borderBottom: { xs: "none", md: "1px solid rgba(0,0,0,0.2)" }, }}>
                    <FeatureCard icon={Images.DATABASE_ICON} title="Your data is safe" description="Your data is kept private and protected by strong 256-bit encryption." />
                </Grid>
                <Grid item xs={12} md={4} >
                    <FeatureCard icon={Images.GENERATE_ICON} title="Automatic summary generator" description="Create a powerful resume profile or cover letter in one click. Writer’s block is no longer an obstacle. Try for free!" />
                </Grid>
                <Grid item xs={12} md={4} sx={{ border: { xs: "none", md: "1px solid rgba(0,0,0,0.2)" }, borderBottom: "none !important", borderTop: 'none !important' }}>
                    <FeatureCard icon={Images.PAPER_ICON} title="Approved templates" description="Professionally-designed resume templates and examples (+guides). Just edit and download in 5 minutes." />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FeatureCard icon={Images.INFINITY_ICON} width={66} height={30} title="Multi-format resume options" description="Save your perfect resume in any common format, including Microsoft Word and PDF in a single click." />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ResumeTemplateFeatures