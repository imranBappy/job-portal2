import { gql } from '@apollo/client';

export const APPLY_JOB_MUTATION = gql`
    mutation ApplyJob($jobId: ID!, $resumeId: ID!) {
        applyJob(jobId: $jobId, resumeId: $resumeId) {
            message
        }
    }
`;
