"use client"
import Button from '@/components/Common/UI/Button';
import { Grid, Typography, Box } from '@mui/material';
import NewsCard from '@/components/Common/card/Job/NewsCard';
import { useQuery } from '@apollo/client';
import { BLOG_QUERY } from '@/graphql/news/newsQuery';
import CustomContainer from '@/common/CustomContainer';
import Link from 'next/link';


const LatestNews = () => {
    const { data } = useQuery(BLOG_QUERY, {
        variables: {
            first: 3,
            blogType: "career"
        }
    })
    const news = data?.allPosts?.edges.map((edge) => edge.node);

    return (
        <CustomContainer >
            <Box
                mt={10}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
            >
                <Typography color="text.primary" variant='h2' textAlign={'center'} maxWidth={600}>
                    Latest news about career advice
                </Typography>
            </Box>

            <Grid
                display={"flex"}
                justifyContent={{
                    xs: 'center',
                    sm: 'center',
                    md: 'center',
                    lg: 'space-between',
                    xl: 'space-between',
                }}


                alignItems={'center'}
                flexWrap={'wrap'}
                mt={5}
                gap={5}
            >
                {
                    news?.map((item) => (<NewsCard key={item.id} news={{
                        ...item,
                    }} />))
                }
            </Grid>
            <Grid container mt={5} justifyContent={'center'} alignItems={'center'} >

                <Link
                    href="/advice"
                >
                    <Button
                        style={{
                            padding: '15px 50px',
                            bgcolor: 'common.blue',
                        }} variant='contained' color='primary' label="Browse All" />
                </Link>

            </Grid>
        </CustomContainer>
    );
};

export default LatestNews;