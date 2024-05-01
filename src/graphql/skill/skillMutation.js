const { gql } = require("@apollo/client");

const ADD_SKILL = gql`
    mutation Mutation($name: String!) {
        addSkill(name: $name) {
            message
            obj {
                name
                id
            }
        }
    }
`;

export { ADD_SKILL };