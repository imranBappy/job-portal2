import React from 'react';
import _Accordion from '@mui/material/Accordion';
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = ({ title, body }) => {
    return (
        <_Accordion
            sx={{
                pb: 2,
                boxShadow: 'none',
                borderBottom: '1px solid #E5E5E5',
                borderRadius: '0px',
                '&:before': {
                    display: 'none',
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h5" color="text.primary">
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                    {body}
                </Typography>
            </AccordionDetails>
        </_Accordion>
    );
};

export default Accordion;
