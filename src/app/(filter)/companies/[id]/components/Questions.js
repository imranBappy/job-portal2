import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import Button from '@/components/Common/UI/Button';
import { useQuery } from '@apollo/client';
import { INTERVIEW_QUESTION_QUERY } from '@/graphql/interviewQuestion/interviewQuestionQuery';
import Link from 'next/link';

export default function Questions({ data }) {
    console.log({
        jobDesignation_Name_Icontains: data?.designation?.name,
    });
    const { data: questions } = useQuery(INTERVIEW_QUESTION_QUERY, {
        variables: {
            jobDesignation_Name_Icontains: data?.designation?.name,
        },
    });

    const questionsList = questions?.interviewQuestions?.edges?.map(
        (item) => item?.node,
    );

    return (
        <Box mt={10}>
            <Typography
                variant="h2"
                mb={2}
                mt={5}
                component="h2"
                align="center"
            >
                Common Job Interview Questions
            </Typography>

            {questionsList?.map((item) => (
                <Accordion
                    key={item.id}
                    sx={{
                        width: '100%',
                        boxShadow: 'none',
                        borderBottom: '1px solid #E0E0E0',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography
                            sx={{
                                width: '100%',
                                py: 2,
                                fontSize: '1.5rem',
                                fontFamily: 'Nunito Sans',
                            }}
                        >
                            {item?.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{item.possibleAnswers}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Box display="flex" justifyContent="center" my={5}>
                
                <Link href={'/faq'}>
                    <Button
                        variant="outlined"
                        label="Read All"
                        style={{
                            width: '243px',
                            height: '57px',
                            fontSize: '18px',
                            fontWeight: '700',
                        }}
                    />
                </Link>
            </Box>
        </Box>
    );
}
