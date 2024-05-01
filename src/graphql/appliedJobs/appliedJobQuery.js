import { gql } from "@apollo/client";


export const ALL_APPLIED_JOBS = gql`
query ALL_APPLIED_JOBS($offset: Int, $first: Int, $status:JobsCandidateStatusChoices, $startDate: Date) {
  candidateList(offset: $offset, first: $first, status:$status, startDate: $startDate) {
    edges {
      node {
        id
        dateCreated
        status
        
        job {
          id
          title
          company {
            id
            name
            logoUrl
          }
        }
       
      }
    }
    totalCount
  }
}`