import Toaster from '@/common/Toaster'
import { useQuery } from '@apollo/client'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import CircularLoader from '../Loader/CircularLoader'
import { GET_ALL_BASE_TEMPLATE_LIST } from '../ResumeSection/graphql/query'
import RenderResumeTemplate from './RenderResumeTemplate'




const ResumeTemplateList = () => {
    const isSmallTabletView = useMediaQuery("(max-width:780px)")
    const [templateList, setTemplateList] = useState([])

    const { loading } = useQuery(GET_ALL_BASE_TEMPLATE_LIST, {
        fetchPolicy: 'network-only',
        variables: {
            first: 9,
            orderBy: "id"
        },
        onError: (error) => {
            Toaster({
                type: 'error',
                message: error.message
            })
        },
        onCompleted: (res) => {
            let temp = res?.baseTemplateList?.edges?.map((item) => item.node)
            setTemplateList(temp)
        }
    })

    return (
        <Box sx={{ mt: 10, textAlign: 'center' }}>

            <Typography variant={isSmallTabletView ? "h4" : 'h2'} color="text.darkBlue">Resume Templates</Typography>
            <Box sx={{ width: { sx: "80%", md: "55%" }, margin: '20px auto', mb: "55px" }}>
                <Typography variant='bodyLarge' color="text.lightBlue" >Pick a resume template, fill it out, and format. Create a professional resume in a few clicks. Just choose one of 18+ resume templates below, add ready-made content, download, and get the job.</Typography>
            </Box>
            {loading ? <Box sx={{ height: "30vh" }}>
                <CircularLoader />
            </Box> :
                <Box sx={{ display: 'flex', gap: "32px", flexWrap: 'wrap', justifyContent: 'center' }}>
                    {templateList?.map((item) => <RenderResumeTemplate key={`template_${item.id}`} data={item} />)}
                </Box>
            }


        </Box >
    )
}

export default ResumeTemplateList