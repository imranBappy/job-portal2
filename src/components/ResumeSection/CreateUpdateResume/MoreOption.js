import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import Title from '@/app/(resume)/resume/components/Title';
import withForm from '@/app/(resume)/resume/components/HOC/withForm';
import AddLink from '@/app/(resume)/resume/components/AddLink/AddLink';

const MoreOption = () => {
    const [skills, setSkills] = useState([]);
    const [moreOption, setMoreOption] = useState('');

    let content = null;

    const [languages, setLanguages] = useState([
        { id: Date.now(), name: '', value: '' },
    ]);

    switch (moreOption) {
        case 'custom':
            content = (
                <AddLink
                    register={{ register: () => { } }}
                    errors={{}}
                    state={[languages, setLanguages]}
                />
            );
            break;
        case 'hobbies':
            content = (
                <Box>
                    <Typography>Hobbies</Typography>

                    <Box>
                        <textarea
                            mt={10}
                            style={{
                                width: '100%',
                                borderRadius: 10,
                                border: '1px solid gray',
                                padding: '20px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                color: '#1C3E5E',
                            }}
                            rows={10}
                            placeholder="e.g. Sky driving, Painting etc"
                        ></textarea>
                    </Box>
                </Box>
            );
            break;
        default:
            content = null;
    }

    return (
        <Box mt={10}>


            {/* <Box sx={{}}>{content}</Box> */}

            <Box mt={10}>
                <Typography
                    style={{
                        fontWeight: 700,
                    }}
                    my={5}
                    color="#1C3E5E"
                >
                    Add Extra Section
                </Typography>
                <Box display="flex" flexWrap={'wrap'} gap={10}>
                    <Box
                        display={'flex'}
                        justifyContent="space-between"
                        flexDirection="column"
                    >
                        <Box
                            sx={{
                                cursor: 'pointer',
                            }}
                            // onClick={() => setMoreOption('custom')}
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                        >
                            <Image
                                src={'/icons/customSection.svg'}
                                alt="Custom Section"
                                width={48}
                                height={48}
                            />
                            <Typography
                                style={{
                                    fontWeight: 700,
                                }}
                                my={5}
                                color="#1C3E5E"
                            >
                                Custom Section
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                cursor: 'pointer',
                            }}
                            // onClick={() => setMoreOption('hobbies')}
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                        >
                            <Image
                                src={'/icons/hobbies.svg'}
                                alt="Custom Section"
                                width={48}
                                height={48}
                            />
                            <Typography
                                style={{
                                    fontWeight: 700,
                                }}
                                my={5}
                                color="#1C3E5E"
                            >
                                Hobbies
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                cursor: 'pointer',
                            }}
                            // onClick={() => setMoreOption('certification')}
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                        >
                            <Image
                                src={'/icons/certification.svg'}
                                alt="Custom Section"
                                width={48}
                                height={48}
                            />
                            <Typography
                                style={{
                                    fontWeight: 700,
                                }}
                                my={5}
                                color="#1C3E5E"
                            >
                                Certification
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        display={'flex'}
                        justifyContent="space-between"
                        flexDirection="column"
                    >
                        <Box
                            sx={{
                                cursor: 'pointer',
                            }}
                            // onClick={() => setMoreOption('internship')}
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                        >
                            <Image
                                src={'/icons/internship.svg'}
                                alt="Custom Section"
                                width={48}
                                height={48}
                            />
                            <Typography
                                style={{
                                    fontWeight: 700,
                                }}
                                my={5}
                                color="#1C3E5E"
                            >
                                Internship
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                cursor: 'pointer',
                            }}
                            // onClick={() => setMoreOption('references')}
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                        >
                            <Image
                                src={'/icons/references.svg'}
                                alt="Custom Section"
                                width={48}
                                height={48}
                            />
                            <Typography
                                style={{
                                    fontWeight: 700,
                                }}
                                my={5}
                                color="#1C3E5E"
                            >
                                References
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                cursor: 'pointer',
                            }}
                            // onClick={() => setMoreOption('language')}
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                        >
                            <Image
                                src={'/icons/language.svg'}
                                alt="Custom Section"
                                width={48}
                                height={48}
                            />
                            <Typography
                                style={{
                                    fontWeight: 700,
                                }}
                                my={5}
                                color="#1C3E5E"
                            >
                                Language
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MoreOption;
