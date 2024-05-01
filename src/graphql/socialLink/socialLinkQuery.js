import { gql } from '@apollo/client';

export const SOCIAL_LINK_QUERY = gql`
    query SocialMediaLinksList {
        socialMediaLinksList {
            edges {
                node {
                    id
                    isDeleted
                    name
                    urlLink
                }
            }
        }
    }
`;
