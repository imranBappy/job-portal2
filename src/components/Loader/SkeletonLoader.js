import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonLoader = (props) => {
    return (
        <Skeleton variant={props.variant} sx={{ ...props.style }} animation={props.animation} />
    );
};

export default SkeletonLoader;