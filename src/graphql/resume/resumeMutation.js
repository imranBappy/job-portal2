import { gql } from '@apollo/client';

export const POST_PERSONAL_INFO = gql`
    mutation userProfileCreateUpdate($input: ProfileCreateMutationInput!) {
        userProfileCreateUpdate(input: $input) {
            errors {
                messages
            }
            message
        }
    }
`;
export const DELETE_RESUME_ITEM = gql`
    mutation deleteItem($ids: [ID]!, $modelName: String!) {
        deleteItem(ids: $ids, modelName: $modelName) {
            message
        }
    }
`;
export const POST_EDUCATION = gql`
    mutation cudEducation($input: EducationCUDMutationInput!) {
        cudEducation(input: $input) {
            message
            obj {
                id
            }
        }
    }
`;
export const ADD_SOCIAL_MEDIA_LINKS = gql`
    mutation cudSocialMediaLinks($input: SocialMediaInput) {
        cudSocialMediaLinks(input: $input) {
            message
            obj {
                id
            }
        }
    }
`;
export const POST_EXPERIENCE = gql`
    mutation CudExperience(
        $company: String!
        $country: String!
        $responsibilitiesTitle: [String]!
        $startDate: Date!
        $city: String
        $designationName: String!
        $endDate: Date
        $isCurrentlyWorking: Boolean
        $id: ID
    ) {
        cudExperience(
            company: $company
            country: $country
            responsibilitiesTitle: $responsibilitiesTitle
            startDate: $startDate
            city: $city
            designationName: $designationName
            endDate: $endDate
            isCurrentlyWorking: $isCurrentlyWorking
            id: $id
        ) {
            message
            obj {
                id
            }
        }
    }
`;
// const POST_SKILL = gql``;
// const POST_PROJECT = gql``;
// const POST_AWARD = gql``;
// const POST_PUBLICATION = gql``;
// const POST_CERTIFICATION = gql``;

export const CREATE_RESUME_MUTATION = gql`
    mutation cudResume(
        $educationIds: [ID]
        $experienceIds: [ID]
        $hobbieNames: [String]
        $id: ID
        $languageNames: [String]
        $name: String!
        $skillsNames: [String]
        $socialMediaLinksIds: [ID]
        $summary: String
        $template: ID!
        $generatedTemplatePreview: String!
    ) {
        cudResume(
            educationIds: $educationIds
            experienceIds: $experienceIds
            hobbieNames: $hobbieNames
            id: $id
            languageNames: $languageNames
            name: $name
            skillsNames: $skillsNames
            socialMediaLinksIds: $socialMediaLinksIds
            summary: $summary
            template: $template
            generatedTemplatePreview: $generatedTemplatePreview
        ) {
            message
              obj{
                 id
            }
        }
    }
`;

export const PROFILE_MUTATION = gql`
    mutation UserProfileCreateUpdate($input: ProfileCreateMutationInput!) {
        userProfileCreateUpdate(input: $input) {
            message
        }
    }
`;


export const RESUME_PREVIEW_ADD = gql`
mutation RESUME_PREVIEW_ADD($imgUrl: String! , $resumeId: ID! ) {
  resumePreviewAdd(imgUrl: $imgUrl, resumeId: $resumeId) {
    success
  }
}`