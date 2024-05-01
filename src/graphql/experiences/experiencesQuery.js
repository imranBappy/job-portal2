import { gql } from '@apollo/client';

export const QUERY_EXPERIENCES = gql`
      query ExperienceList($first:Int , $orderBy:String) {
        experienceList(first:$first, orderBy:$orderBy) {
          totalCount
            edges {
                node {
                    id
                    company {
                        id
                        name
                        description
                        website
                        logoUrl
                        employeesCount
                        contactEmail
                        contactPhone
                        socialMediaLinks
                        country
                        city
                    }
                    country
                    city
                    isCurrentlyWorking
                    startDate
                    endDate
                    designation {
                        name
                        id
                    }
                  responsibilities{
                    edges{
                      node{
                        title
                        id
                      }
                    }
                  }
                }
            }
        totalCount
        }
    }
`;
