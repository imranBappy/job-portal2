import { gql } from '@apollo/client';

export const CREATE_UPDATE_JOB = gql`
    mutation cudJob(
        $addressId: ID!
        $applicationDeadline: DateTime
        $benefits: JSONString
        $branchId: ID
        $categoryId: ID!
        $city: String
        $country: String
        $description: String!
        $designationName: String!
        $educationRequirements: String
        $expertiseLevel: String!
        $gender: String
        $id: ID
        $isRemote: Boolean
        $jobType: String!
        $maxSalary: Int
        $minExperienceYears: Int
        $minSalary: Int
        $requiredSkills: [String]
        $responsibilitiesTitles: [String]!
        $tagsNames: [String]
        $title: String!
        $vacancy: Int!
    ) {
        cudJob(
            addressId: $addressId
            applicationDeadline: $applicationDeadline
            benefits: $benefits
            branchId: $branchId
            categoryId: $categoryId
            city: $city
            country: $country
            description: $description
            designationName: $designationName
            educationRequirements: $educationRequirements
            expertiseLevel: $expertiseLevel
            gender: $gender
            id: $id
            isRemote: $isRemote
            jobType: $jobType
            maxSalary: $maxSalary
            minExperienceYears: $minExperienceYears
            minSalary: $minSalary
            requiredSkills: $requiredSkills
            responsibilitiesTitles: $responsibilitiesTitles
            tagsNames: $tagsNames
            title: $title
            vacancy: $vacancy
        ) {
            message
        }
    }
`;
export const ACTIVE_INACTIVE_JOB = gql`
    mutation activeInactiveJob($active: Boolean!, $id: ID!) {
        activeInactiveJob(active: $active, id: $id) {
            message
        }
    }
`;
export const CANDIDATE_APPLICATION_ACTION = gql`
    mutation candidateAction($candidateId: ID!, $status: String!) {
        candidateAction(candidateId: $candidateId, status: $status) {
            message
        }
    }
`;
