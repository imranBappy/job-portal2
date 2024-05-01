"use client";

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Button from '@/components/Common/UI/Button';
import Accordion from '@/components/Common/UI/Accordion';
import CustomContainer from '@/common/CustomContainer';
import { FAQ_QUERY } from '@/graphql/faq/faqQuery';
import Loading from '../loading';
import { useQuery } from '@apollo/client';

// const userAskedQuestions = [
//     {
//         id: 1,
//         title: 'How do I create an account on this job portal?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
//     {
//         id: 2,
//         title: 'How do I search for jobs on this portal?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
//     {
//         id: 3,
//         title: 'Can I apply for jobs without creating an account?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
//     {
//         id: 4,
//         title: 'How do I edit my profile information?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
// ];

// const commonInterviewQuestion = [
//     {
//         id: 1,
//         title: 'Tell me about Your Self?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
//     {
//         id: 2,
//         title: 'How did you hear about this position?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
//     {
//         id: 3,
//         title: 'Why dou Consider yourself to suitable this job?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
//     {
//         id: 4,
//         title: 'Why should you hire you?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
// ];

// export const resumeResources = [
//     {
//         id: 1,
//         title: 'What is a Resume?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
//     {
//         id: 2,
//         title: 'How to Write a Resume for Your First Job?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
//     {
//         id: 3,
//         title: 'What to Put on a Resume?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
//     {
//         id: 4,
//         title: 'How to Format a Resume?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
//     {
//         id: 5,
//         title: 'How Long Should a Resume Be?',
//         body: 'Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement irresistibly fussy penguin insect additionally wow absolutely crud meretriciously hastily dalmatian a glowered inset one echidna',
//     },
// ];
const FaqPage = () => {
    const { data, loading } = useQuery(FAQ_QUERY, {
        variables: { first: 100 },
    });

    if (loading) return <Loading />;

    const faqs = data?.allFaqs?.edges?.map((edge) => edge.node) || [];
    const perSection = faqs.length / 3;
    const userAskedQuestions = faqs.slice(0, Math.floor(perSection));
    const commonInterviewQuestion = faqs.slice(Math.floor(perSection), (perSection * 2));
    const resumeResources = faqs.slice(Math.ceil(perSection) * 2, faqs.length);


    return (
        <CustomContainer>
            <Box my={5}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        // alignItems: 'center',
                        gap: 10,
                        flexWrap: 'wrap',
                    }}
                >
                    <Box flexBasis={510}>
                        <Image
                            src="/images/faq.svg"
                            width={506}
                            height={707}
                            alt="FAQ"
                        />
                    </Box>
                    <Box flexBasis={700} flexGrow={1}>
                        <Typography my={10} variant="h2" color="text.primary">
                            Frequently User Asked Question
                        </Typography>
                        {userAskedQuestions.map((question) => (
                            <Accordion
                                key={question.id}
                                title={question.question}
                                body={question.answer}
                            />
                        ))}
                    </Box>
                </Box>

                <Box>
                    <Typography my={10} variant="h2" color="text.primary">
                        Common Job Interview Questions
                    </Typography>

                    {commonInterviewQuestion.map((question) => (
                        <Accordion
                            key={question.id}
                            title={question.question}
                            body={question.answer}
                        />
                    ))}

                    {/* <Box
                        my={10}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Button
                            sx={{
                                width: '100px',
                                height: '54px',
                                fontFamily: 'Nunito',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                            variant="outlined"
                            color="primary"
                        >
                            See All
                        </Button>
                    </Box> */}
                </Box>

                <Box>
                    <Typography my={10} variant="h2" color="text.primary">
                        Resume Resources
                    </Typography>

                    {resumeResources.map((question) => (
                        <Accordion
                            key={question.id}
                            title={question.question}
                            body={question.answer}
                        />
                    ))}

                    <Box
                        my={10}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        {/* <Button
                            sx={{
                                width: '100px',
                                height: '54px',
                                fontFamily: 'Nunito',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                            variant="outlined"
                            color="primary"
                        >
                            See All
                        </Button> */}
                    </Box>
                </Box>
            </Box>
        </CustomContainer>
    );
};

export default FaqPage;
