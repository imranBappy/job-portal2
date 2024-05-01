import { Box, Divider } from '@mui/material';
import React from 'react';
import ProfileDetailHeader from './ProfileDetailHeader';
import Image from 'next/image';
import { Images } from '@/utils/imagePath';

const TechStack = () => {
    return (
        <Box>
            <ProfileDetailHeader title="Tech Stack" showAdd />
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {[1, 1, 1, 1, 1].map((item, key) => (
                    <Box
                        key={`tech_stack_${key}`}
                        sx={{ height: 100, width: 100 }}
                    >
                        <Image
                            style={{ height: '100%', width: '100%' }}
                            src={Images.HTML_ICON_LOGO}
                            alt="tech_stack"
                        />
                    </Box>
                ))}
            </Box>

            <Divider sx={{ my: 3 }} />
        </Box>
    );
};

export default TechStack;
