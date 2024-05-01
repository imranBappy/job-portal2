import { Typography } from '@mui/material';
import React from 'react';

const JobType = (props) => {
    const { type } = props;
    const colors = new Map([
        ['Design', [86, 205, 173]], // '#56CDAD'
        ['Marketing', [255, 184, 0]], // '#FFB800'
        ['Security', [255, 77, 77]], // '#FF4D4D'
        ["Web Development", [77, 77, 255]], //'#4D4DFF'
        ['Development', [255, 77, 77]],
        ['Enginnering', [255, 77, 77]],
        ['Recharge', [255, 77, 77]],
    ])

    const defaultColor = [0, 128, 0];

    return <Typography
        variant='span'
        color={`rgb(${colors.get(type) || defaultColor})`}
        bgcolor={`rgb(${[...colors.get(type) || defaultColor, 0.1]})`}
        px={2}
        py={1}
        fontWeight={600}
        align='center'
        fontSize={16}
        borderRadius={50}
    >
        {type}
    </Typography >
};

export default JobType;