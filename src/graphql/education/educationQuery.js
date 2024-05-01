import { gql } from '@apollo/client';

export const EDUCATION_QUERY = gql`
    query EducationList($first:Int , $orderBy:String)  {
        educationList(first:$first, orderBy:$orderBy) {
            totalCount
            edges {
                node {
                    id
                    institution {
                        id
                        name
                        logoUrl
                    }
                    subject
                    degree
                    city
                    country
                    startDate
                    endDate
                    isCurrentlyStudying
                    degreeType
                    activities
                }
                
            }
            totalCount
        }
    }
`;