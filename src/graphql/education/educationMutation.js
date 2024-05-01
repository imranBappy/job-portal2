import { gql } from '@apollo/client';

export const EDUCATION_MUTATION = gql`
    mutation CudEducation($input: EducationCUDMutationInput!) {
        cudEducation(input: $input) {
            message
        }
    }
`;

export const SINGLE_EDUCATION_QUERY = gql`
query MyQuery($id: ID = "") {
  singleEducation(id: $id) {
    activities
    city
    country
    createdOn
    degree
    endDate
    id
    isCurrentlyStudying
    startDate
    subject
    updatedOn
    degreeType
    institution {
      name
      id
    }
  }
}
`