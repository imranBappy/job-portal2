"use client"
import React, { useState } from 'react';
import styles from './Header.module.css';
import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import Button from '../../../components/Common/UI/Button';
import { useRouter } from 'next/navigation';
import useAuthCheck from '@/hooks/useAuth';
import { COUNTRY_QUERY } from '@/graphql/country/countryQuery';
import { useQuery } from '@apollo/client';

import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const JobSearch = (props) => {
  const [value, setFilter] = useState("");
  const [location, setLocation] = props.locationState || useState("");
  const router = useRouter()
  const checkAuth = useAuthCheck()
  const theme = useTheme();

  const { data } = useQuery(COUNTRY_QUERY);

  const handleChange = (e) => {
    setFilter(e.target.value)
    if (e.target.value === "") {
      props.handleSearch("")
    }
  }

  const handleLocation = (e) => {
    if (e.target.value !== "select") {
      setLocation(e.target.value)
    } else {
      setLocation("")
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (checkAuth.isAuthenticated) {
      props.handleSearch(value)
    } else {
      router.push('/login?path=jobs')
    }
  }





  return (
    <Grid

      width={{
        xs: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
      }}

      mt={10}
      borderRadius={{
        xs: 2,
        sm: 2,
        md: 2,
        lg: 50,
        xl: 50,
      }}
      height={'62px'}

      px={3}

      border={1}
      borderColor={'rgba(28, 62, 94, 0.10)'}
      sx={props.sx}
    >
      <form onSubmit={handleSearch}>
        <Box
          display={'flex'}
          flexGrow={1}
          width={'100%'}
          flexDirection={{
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row',
          }}
        >
          {/* Search Input */}
          <Box
            width={'100%'}
            height={'60px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            borderRight={{
              xs: 'none',
              sm: 'none',
              md: 'none',
              lg: '1px solid rgba(28, 62, 94, 0.10)',
              xl: '1px solid rgba(28, 62, 94, 0.10)',
            }}
          >
            <Image
              src="/icons/search-icon.svg"
              alt="Job"
              width={20}
              height={20}
            />
            <input
              onChange={handleChange}
              className={styles.search_input}
              placeholder="Search for your dream job"
              style={{
                borderBottom: '1px solid #D6DDEB',
                padding: '0.8rem 0',
                margin: '0 1rem ',
              }}
            />
          </Box>
          {/* Select Location */}
          <Box
            ml={{
              xs: '0',
              sm: '0',
              md: '0',
              lg: '1rem',
              xl: '1rem',
            }}
            width={'100%'}
            height={'60px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Image
              src="/icons/location.svg"
              alt="location"
              width={20}
              height={20}
            />

            <Select
              value={location || "select"}
              onChange={handleLocation}
              MenuProps={MenuProps}

              sx={{
                borderRadius: '0',
                width: '100%',
                '& fieldset': {
                  border: 'none',
                  borderBottom: '1px solid #D6DDEB',
                },
                '& .MuiSelect-select': {
                  padding: '0.7rem 0',
                  margin: '0 1rem ',
                },
              }}


            >

              <MenuItem value="select" >
                {
                  location ? 'None' : "Select Location"
                }
              </MenuItem>

              {data?.allCountries.map((country) => (
                <MenuItem
                  key={country.code}
                  value={country.code}
                  style={getStyles(country.code, value, theme)}
                >
                  {country.name}
                </MenuItem>
              ))}
            </Select>

            <Button
              onClick={handleSearch}
              style={{
                marginLeft: '1rem',
                padding: '0.6rem 2.5rem',
              }}
              label="Search"
              type="submit"
            />
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

export default JobSearch;
