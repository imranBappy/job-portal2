import { gql } from '@apollo/client';

const LOGIN_USER = gql`
    mutation UserLogin($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            accessToken
            success
            user {
                email
                role
                
                company{
                    id
                }
                profile{
                    id
                }
            }
        }
    }
`;

const REGISTER_USER = gql`
    mutation UserRegistrationMutation(
        $email: String!
        $password1: String!
        $password2: String!
        $firstName: String!
        $lastName: String!
    ) {
        userRegistration(
            email: $email
            password1: $password1
            password2: $password2
            firstName: $firstName
            lastName: $lastName
        ) {
            message
        }
    }
`;

const CHANGE_PASSWORD_MUTATION = gql`
    mutation ChangeUserPassword(
        $newPassword1: String!
        $newPassword2: String!
        $oldPassword: String!
    ) {
        userPasswordChange(
            newPassword1: $newPassword1
            newPassword2: $newPassword2
            oldPassword: $oldPassword
        ) {
            message
            success
        }
    }
`;

export { LOGIN_USER, REGISTER_USER, CHANGE_PASSWORD_MUTATION };
