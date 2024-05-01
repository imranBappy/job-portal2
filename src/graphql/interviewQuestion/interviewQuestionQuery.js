import { gql } from '@apollo/client';

export const INTERVIEW_QUESTION_QUERY = gql`
    query InterviewQuestion($jobDesignation_Name_Icontains: String) {
        interviewQuestions(
            jobDesignation_Name_Icontains: $jobDesignation_Name_Icontains
        ) {
            edges {
                node {
                    id
                    question
                    possibleAnswers
                }
            }
        }
    }
`;
