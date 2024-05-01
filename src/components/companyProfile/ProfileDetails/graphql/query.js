import { gql } from '@apollo/client';

export const GET_ALL_INDUSTRY_LIST = gql`
    query industryList($name_Icontains: String, $first: Int, $offset: Int) {
        industryList(
            name_Icontains: $name_Icontains
            first: $first
            offset: $offset
        ) {
            edges {
                node {
                    name
                    id
                }
            }
        }
    }
`;
