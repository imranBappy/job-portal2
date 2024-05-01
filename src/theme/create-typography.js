const createTypography = () => {
    return {
        h1: {
            fontSize: '4rem', // 64px
            lineHeight: 1.2,
            fontWeight: 700,
            fontFamily: 'Nunito, sans-serif',
        },
        h2: {
            fontWeight: 700,
            fontSize: '3rem', // 48px
            lineHeight: 1.2,
            fontFamily: 'Nunito, sans-serif',
        },
        h3: {
            fontWeight: 700,
            fontSize: '2rem', //32px
            lineHeight: '2.4rem', //38.4px
            fontFamily: 'Nunito, sans-serif',
        },
        h4: {
            fontWeight: 700,
            fontSize: '28px',
            lineHeight: 1.2,
        },
        h5: {
            fontWeight: 700,
            lineHeight: 1.2,
            fontSize: '1.56rem', // 24px
        },
        h6: {
            fronFamily: 'Epilogue, sans-serif',
            fontWeight: 600,
            fontSize: '1.25rem', // 20px
            lineHeight: '1.5rem', // 24px
        },
        subHeader1: {
            fontWeight: 500,
            fontSize: '1.25rem', // 20px
            lineHeight: '2rem', // 32px
            fontFamily: 'Lato, sans-serif',
        },
        subHeader2: {
            fontWeight: 500,
            fontSize: '1.125rem', // 18px
            lineHeight: '1.8rem', // 28.8px
            fontFamily: 'Nunito, sans-serif',
        },
        subHeader3: {
            fontWeight: 400,
            fontSize: '1rem', // 16px
            lineHeight: '1.6rem', // 25.6px
            fontFamily: 'Epilogue, sans-serif',
        },
        Button: {
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: 1.6,
        },
        bodyLarge: {
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: 1.6,
        },
        bodyNormal: {
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 1.6,
            color: '#1C3E5EBF',
        },
        bodySmall: {
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: 1.6,
        },
        Link: {
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: 1.6,
        },
        Label: {
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: 1.6,
        },
    };
};

export default createTypography;
