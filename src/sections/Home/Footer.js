import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Footer.module.css';
import CustomContainer from '@/common/CustomContainer';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      component={'footer'}
      sx={{
        width: '100%',
        minHeight: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'url(/images/footer-bg.svg) no-repeat center top',
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <Image
        className={styles.footer_bg_img}
        src="/images/footer-img.svg"
        width={1011}
        height={484}
        alt={'Footer Image'}
        sizes="100vw"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      />
      <CustomContainer>
        <Box
          minHeight={{
            //550
            xs: 680,
            sm: 480,
            md: 480,
            lg: 480,
            xl: 480,
          }}

          // bgcolor="#08169232"
          // mt={30}
          display={'flex'}
          alignItems={'center'}
          // py={10}
          justifyItems={'flex-end'}
        >
          <Box
            flexGrow={1}
            alignSelf={'flex-end'}
            sx={{
              display: 'flex',
              py: 5,
            }}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
          >
            {/* Left side */}
            <Box
              flexGrow={1}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                px: 3,
              }}
            >
              <Box>
                <Image
                  src="/icons/logo.svg"
                  width={200}
                  height={50}
                  alt={'Logo'}
                />
              </Box>
              <Box>
                <Typography
                  color="white"
                  fontSize={'18px'}
                  fontWeight={500}
                >
                  Call US
                </Typography>
                <Typography
                  color="primary"
                  fontSize={'18px'}
                  fontWeight={500}
                >
                  +971558366571(UAE)
                </Typography>
                <Typography
                  mt={2}
                  color="white"
                  fontSize={'14px'}
                  fontWeight={400}
                >
                  Post Box 324, Royal state, Dubai UAE{' '}
                </Typography>
                <Typography
                  color="white"
                  fontSize={'14px'}
                  fontWeight={400}
                >
                  support@wrightalent.com
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Link href={'/'}>
                  <Image
                    src="/icons/social1.svg"
                    width={25}
                    height={25}
                    alt={'Facebook'}
                  />
                </Link>
                <Link href={'#'}>
                  <Image
                    src="/icons/social2.svg"
                    width={25}
                    height={25}
                    alt={'Instagram'}
                  />
                </Link>
                <Link href={'#'}>
                  <Image
                    src="/icons/social3.svg"
                    width={25}
                    height={25}
                    alt={'Twitter'}
                  />
                </Link>
                <Link href={'#'}>
                  <Image
                    src="/icons/social4.svg"
                    width={25}
                    height={25}
                    alt={'Linkedin'}
                  />
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 5,
                px: 3,
                flexWrap: 'wrap',
              }}
              alignItems={'flex-start'}
              alignContent={'flex-start'}
            >

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography
                  color="white"
                  fontWeight={500}
                  variant="h6"
                >
                  Resources
                </Typography>

                <Link
                  style={{
                    textDecoration: 'none',
                    width: 'fit-content'
                  }}
                  href={'/about'}
                >
                  <Typography
                    component={'span'}
                    color="white"
                    fontSize={'14px'}
                    fontWeight={400}
                  >
                    About Us
                  </Typography>
                </Link>
                <Link
                  style={{
                    textDecoration: 'none',
                    width: 'fit-content'

                  }}
                  href={'/terms'}
                >
                  <Typography
                    color="white"
                    fontSize={'14px'}
                    fontWeight={400}
                  >
                    Terms & conditions
                  </Typography>
                </Link>
                <Link
                  style={{
                    textDecoration: 'none',
                    width: 'fit-content'

                  }}
                  href={'/blog'}
                >
                  <Typography
                    color="white"
                    fontSize={'14px'}
                    fontWeight={400}
                  >
                    Blog
                  </Typography>
                </Link>
                <Link
                  style={{
                    textDecoration: 'none',
                    width: 'fit-content'

                  }}
                  href={'/policy'}
                >
                  <Typography
                    color="white"
                    fontSize={'14px'}
                    fontWeight={400}
                  >
                    Privacy & Policy
                  </Typography>
                </Link>
                <Link
                  style={{
                    textDecoration: 'none',
                    width: 'fit-content'

                  }}
                  href={'/faq'}
                >
                  <Typography
                    color="white"
                    fontSize={'14px'}
                    fontWeight={400}

                  >
                    FAQ
                  </Typography>
                </Link>
                <Link
                  style={{
                    textDecoration: 'none',
                    width: 'fit-content'

                  }}
                  href={'/contact_us'}
                >
                  <Typography
                    color="white"
                    fontSize={'14px'}
                    fontWeight={400}
                  >
                    Contact Us
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </CustomContainer>
      <Box
        sx={{
          width: '100%',
          borderTop: '1px solid #F2F9FE',
          py: 5,
        }}
      >
        <Typography
          color="white"
          fontSize={'1rem'}
          textAlign={'center'}
        >
          {currentYear} Wrightalent All Right Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
