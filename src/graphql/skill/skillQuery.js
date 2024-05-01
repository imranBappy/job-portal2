import { gql } from '@apollo/client';

const SEARCH_SKILL = gql`
    query skillsList($name_Icontains: String) {
        skillsList(name_Icontains: $name_Icontains) {
            edges {
                node {
                    name
                    id
                }
            }
        }
    }
`;

export const SKILLS_QUERY = gql`
    query SkillsList {
        me {
            profile {
                skills {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;

export { SEARCH_SKILL };
