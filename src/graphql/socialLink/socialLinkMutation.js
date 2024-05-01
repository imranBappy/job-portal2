import { gql } from '@apollo/client';

export const SOCIAL_LINK_MUTATION = gql`
    mutation CudSocialMediaLinks($input: SocialMediaInput) {
        cudSocialMediaLinks(input: $input) {
            message
        }
    }
`;
