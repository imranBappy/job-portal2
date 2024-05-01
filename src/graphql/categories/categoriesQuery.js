const { gql } = require('@apollo/client');

export const CATEGORIES_QUERY = gql`
    query {
        categories {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;
