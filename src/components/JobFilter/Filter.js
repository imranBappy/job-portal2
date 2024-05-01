import Image from 'next/image';
import React from 'react';
import styles from './JobFilter.module.css'
import { Box, Typography } from '@mui/material';

const Filter = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      width={'100%'}
      height={'100%'}
      gap={'20px'}

      mt={"20px"}
    >
      <Box
        sx={{
          padding: '0 10px',
          border: '1px solid #E5E5E5',
          borderRadius: '5px',
          height: '40px',
          marginBottom: '20px',
        }}
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'100%'}
      >
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Image
            width={17}
            height={18}
            alt="search"
            src="/icons/search-icon.svg"
          />
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <input
            className={styles.filter_input}
            placeholder="Job title,Salary, or Companies..."
            type="text"
            name="search"
          />
        </Box>
      </Box>
      <Box
        sx={{
          padding: '0 10px',
          border: '1px solid #E5E5E5',
          borderRadius: '5px',
          height: '40px',
          marginBottom: '20px',
          cursor: 'pointer',
        }}
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'180px'}
      >
        <Image
          alt="-"
          style={{
            marginRight: '10px',
          }}
          src={'/icons/filters.svg'}
          width={18}
          height={12}
        />
        <Typography
          component={'span'}
          fontSize={'14px'}
          fontWeight={'500'}
          color={'#000000'}
        >
          {' '}
          All Filters
        </Typography>
      </Box>
    </Box>
  );
};

export default Filter;