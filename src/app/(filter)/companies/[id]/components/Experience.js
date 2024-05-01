import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Experience = () => {
  return (
    <Box>
      <Typography variant="h3" mb={2} component="h3">
        Experience
      </Typography>

      <Box>
        <Box display={'flex'} gap={1}>
          <Image alt="-" src="/icons/CheckIcon.svg" width={20} height={20} />

          <Typography color={'text.secondary'} variant="body1" component="p">
            Fluent in English
          </Typography>
        </Box>
        <Box display={'flex'} gap={1}>
          <Image alt="-" src="/icons/CheckIcon.svg" width={20} height={20} />

          <Typography color={'text.secondary'} variant="body1" component="p">
            Project management skills
          </Typography>
        </Box>
        <Box display={'flex'} gap={1}>
          <Image alt="-" src="/icons/CheckIcon.svg" width={20} height={20} />

          <Typography color={'text.secondary'} variant="body1" component="p">
            Copy editing skills
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Experience;
