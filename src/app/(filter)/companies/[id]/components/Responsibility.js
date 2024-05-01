import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';

const Responsibility = () => {
  return (
    <Box>
      <Typography variant="h3" mb={2} component="h3">
        Responsibilities
      </Typography>

      <Box>
        <Box display={'flex'} gap={1}>
          <Image alt="-" src="/icons/CheckIcon.svg" width={20} height={20} />

          <Typography color={'text.secondary'} variant="body1" component="p">
            Community engagement to ensure that is supported and actively
            represented online
          </Typography>
        </Box>
        <Box display={'flex'} gap={1}>
          <Image alt="-" src="/icons/CheckIcon.svg" width={20} height={20} />

          <Typography color={'text.secondary'} variant="body1" component="p">
            Community engagement to ensure that is supported and actively
            represented online
          </Typography>
        </Box>
        <Box display={'flex'} gap={1}>
          <Image alt="-" src="/icons/CheckIcon.svg" width={20} height={20} />

          <Typography color={'text.secondary'} variant="body1" component="p">
            Community engagement to ensure that is supported and actively
            represented online
          </Typography>
        </Box>
        <Box display={'flex'} gap={1}>
          <Image alt="-" src="/icons/CheckIcon.svg" width={20} height={20} />

          <Typography color={'text.secondary'} variant="body1" component="p">
            Community engagement to ensure that is supported and actively
            represented online
          </Typography>
        </Box>
        <Box display={'flex'} gap={1}>
          <Image alt="-" src="/icons/CheckIcon.svg" width={20} height={20} />

          <Typography color={'text.secondary'} variant="body1" component="p">
            Community engagement to ensure that is supported and actively
            represented online
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" component="p"></Typography>
    </Box>
  );
};

export default Responsibility;