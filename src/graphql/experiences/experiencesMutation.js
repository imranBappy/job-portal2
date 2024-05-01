import { gql } from '@apollo/client';

export const EXPERIENCE_MUTATION = gql`
    mutation AddExperience(
        $company: String!
        $country: String!
        $city: String
        $id: ID
        $designationName: String!
        $responsibilitiesTitle: [String]!
        $startDate: Date!
  			$endDate : Date
  			$isCurrentlyWorking:Boolean
    ) {
        cudExperience(
            company: $company
            country: $country
            city: $city
            id: $id
            designationName: $designationName
            responsibilitiesTitle: $responsibilitiesTitle
            startDate: $startDate
          	endDate:$endDate
          	isCurrentlyWorking: $isCurrentlyWorking
        ) {
            message
        }
    }
`;


export const SINGLE_EXPERIENCE_QUERY = gql`
    query MyQuery($id: ID = "") {
  singleExperience(id: $id) {
    city
    country
    createdOn
    endDate
    id
    isCurrentlyWorking
    startDate
    responsibilities {
      edges {
        node {
          id
          title
        }
      }
    }
    designation {
      name
      id
    }
     company {
      id
      name
    }
  }
}

`