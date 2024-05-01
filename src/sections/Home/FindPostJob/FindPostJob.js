import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Button from '@/components/Common/UI/Button';
import useAuthCheck from '@/hooks/useAuth';
import styles from './FindPostJob.module.css'
import CustomContainer from '@/common/CustomContainer';

const FindPostJob = () => {
  const router = useAuthCheck()
  return (
    <Box position={'relative'} minHeight={{ xs: 300, md: 500 }}>
      <Image
        className={styles.bg_effect_img}
        alt="-"
        src="/icons/right-color.png"
        width={350}
        height={350}
        style={{
          zIndex: 0,
          position: 'absolute',
          top: 100,
          left: 0,
        }}
      />
      <Image
        className={styles.bg_effect_img}
        alt="-"
        src="/icons/left-color.svg"
        width={400}
        height={400}
        style={{
          zIndex: 0,
          position: 'absolute',
          top: 200,
          right: 0,
          // width: '100%',

        }}
      />

      <Box
        display={{
          xs: 'none',
          md: 'block',
        }}
      >
        <Image
          alt="-"
          src="/icons/p1.svg"
          width={50}
          height={50}
          style={{
            zIndex: 0,
            position: 'absolute',
            top: 250,
            left: 100,
          }}
        />
        <Image
          alt="-"
          src="/icons/p2.svg"
          width={50}
          height={50}
          style={{
            zIndex: 0,
            position: 'absolute',
            top: 350,
            left: 200,
          }}
        />
        <Image
          alt="-"
          src="/icons/p3.svg"
          width={50}
          height={50}
          style={{
            zIndex: 0,
            position: 'absolute',
            top: 250,
            right: 200,
          }}
        />
        <Image
          alt="-"
          src="/icons/p4.svg"
          width={50}
          height={50}
          style={{
            zIndex: 0,
            position: 'absolute',
            top: 350,
            right: 100,
          }}
        />
      </Box>

      <CustomContainer >
        <Box
          minHeight={{ xs: 300, md: 500 }}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          textAlign={'center'}
          sx={{
            height: { xs: 'auto', md: 1 },
            justifyContent: 'center',
            pt: { xs: 4, md: 6 },
            pb: { xs: 4, md: 6 },
          }}
        >
          <Typography color="text.primary" variant="h2" maxWidth={500}>
            Let’s start with thousands of jobs
          </Typography>
          <Typography
            variant="subHeader2"
            component={'p'}
            mt={3}
            maxWidth={500}
            color="text.lightBlue"
          >
            We ensure your next step is a step forward. Here’s an overview of
            technology best companies that you will love to browse.
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
            mt={5}
            gap={5}
            flexWrap={'wrap'}
          >
            <Button
              href={router.isAuthenticated ? "/jobs" : '/login?path=jobs'}
              style={{
                padding: '15px 50px',
                bgcolor: 'common.blue',
              }} variant='contained' color='primary' label="Find a Job" />
            <Button
              href={router.isAuthenticated ? "/post-a-job" : '/login?path=recruiter/post_a_job'}
              style={{
                padding: '15px 50px',
                borderColor: 'common.blue',
              }}
              variant="outlined"
              color="primary"
              label="Post A Job"
            />
          </Box>
        </Box>
      </CustomContainer>
    </Box>
  );
};

export default FindPostJob;