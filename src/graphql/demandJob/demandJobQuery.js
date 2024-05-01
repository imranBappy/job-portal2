import { gql } from "@apollo/client";


export const DEMAND_JOB_QUERY = gql`
query DEMAND_JOB_QUERY ($first:Int){
      demandingJobs(first:$first){
      edges{
        node{
          id,
          name,
          imageUrl,
          jobsCount
        }
      }
    }
}
`