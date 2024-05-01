import useAuthCheck from '@/hooks/useAuth';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
const DemandJobCard = (props) => {
  const { item: { imageUrl, name, style, jobsCount, id }, ...rest } = props;

  const router = useRouter()
  const handleClicked = () => {
    router.push(`/login?path=jobs?categoryId=${id}`)
  }

  return (
    <Grid
      onClick={handleClicked}
      {...rest}
      flexBasis={'265px'}
      // flexGrow={1}


      sx={{
        margin: '0 10px',
        border: '1px solid rgba(28, 62, 94, 0.10)',
        padding: '25px',
        borderRadius: '10px',
        minHeight: '258px',
        '&:hover': {
          boxShadow: '0px 10px 20px rgba(28, 62, 94, 0.10)',
        },
        cursor: 'pointer',
        ...style,

      }}
      display={'flex'}
      flexDirection={'column'}

    >
      <Image
        alt="-"
        style={{
          alignSelf: 'start',
        }}
        width={60}
        height={60}
        src={imageUrl}
      />
      <Grid flexGrow={1} display={'flex'}>
        <Grid
          flexGrow={1}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'end'}
        >
          <Typography color="text.primary" variant="h5">{name}</Typography>
          <Typography color="text.lightBlue" mt={1}>{`${jobsCount} Jobs Opened`}</Typography>
        </Grid>
        {/* <Grid alignSelf={'end'}>
          <Image alt="-" width={24} height={24} src="/icons/arrow-right.svg" />
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default DemandJobCard;