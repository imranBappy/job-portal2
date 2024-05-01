import { gql } from '@apollo/client';

export const GET_ALL_MY_RESUME = gql`
    query resumeList($offset: Int, $first: Int, $orderBy: String) {
        resumeList(offset: $offset, first: $first, orderBy: $orderBy ) {
            edges {
                node {
                    name
                    template {
                        id
                    }
                    updatedOn
                    createdOn
                    id
                    generatedTemplatePreview
                }
            }
            totalCount
        }
    }
`;


export const GET_TOTAL_RESUME_COUNT = gql`
    query{
        resumeList{
            totalCount
        }
    }
`