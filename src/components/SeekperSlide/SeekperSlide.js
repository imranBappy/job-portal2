import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import './SeekperSlider.css'
const SeekperSlide = (props) => {
  const { src, say, bgColor, bgColor2 } = props.item
  return (
    <Box bgcolor={bgColor} borderRadius={2} mb={5}>
      <Box p={5}>
        <Box display={'flex'} justifyContent={'flex-start '}>
          <Image
            alt="-"
            style={{
              width: 55,
            }}
            width={55}
            height={40}
            src="/icons/say.svg"
          />
        </Box>
        <Typography mt={2} variant="h5">
          {say}
        </Typography>
      </Box>

      <Box
        borderRadius={2}
        px={5}
        py={2}
        bgcolor={bgColor2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="start" border={'100%'}>
          <Image alt="-" width={75} height={75} src={src} />
        </Box>
        <Box ml={2}>
          <Typography fontSize={19}>John Doe</Typography>
          <Typography fontSize={15}>CEO, ABC Company</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SeekperSlide;