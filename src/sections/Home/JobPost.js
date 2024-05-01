import CustomContainer from '@/common/CustomContainer';
import Button from '@/components/Common/UI/Button';
import useAuthCheck from '@/hooks/useAuth';
import { Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
const JobPost = () => {
  const router = useAuthCheck()
  return (
    <Box width={'100%'} bgcolor={'#FEF7E399'} mt={5}>
      <CustomContainer>
        <Grid
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          py={10}
          gap={5}
          flexDirection={{
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row',
          }}
        >
          <Grid
            width={'50%'}
            flexGrow={1}
            display={'flex'}
            justifyContent={' start'}
          >
            <Image
              alt="-"
              objectFit="cover"
              objectPosition="center"
              style={{
                width: '100%',
                height: '100%',
              }}
              src={'/images/beautiful-recuiters.svg'}
              width={500}
              height={500}
            />
          </Grid>
          <Grid
            width={{
              xs: '100%',
              sm: '100%',
              md: '50%',
              lg: '50%',
              xl: '50%',
            }}
            flexGrow={1}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={' start'}
            alignItems={'start'}
            gap={2}
          >
            <Typography mb={3} color="text.primary" variant="h2">
              The perfect and beautiful platform for recruiters
            </Typography>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={1}
            >
              <Image
                alt="-"
                src="/icons/candidatess.svg"
                width={20}
                height={20}
              />
              <Typography color="text.lightBlue" variant="subHeader2">
                8 million responsive and startup-ready candidates
              </Typography>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={1}
            >
              <Image alt="-" src="/icons/tools.svg" width={20} height={20} />
              <Typography color="text.lightBlue" variant="subHeader2">
                Company branding, and HR tools for free
              </Typography>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={1}
            >
              <Image alt="-" src="/icons/system.svg" width={20} height={20} />
              <Typography color="text.lightBlue" variant="subHeader2">A free applicant tracking system, or free integration</Typography>
            </Box>
            <Button
              href={router.isAuthenticated ? "/post_a_job" : '/login?path=recruiter/post_a_job'}
              style={{
                mt: 2,
                padding: '10px 65px',
                bgcolor: 'common.blue',
              }} variant='contained' color='primary' label="Post a Job" />
          </Grid>
        </Grid>
      </CustomContainer>
    </Box>
  );
};

export default JobPost;