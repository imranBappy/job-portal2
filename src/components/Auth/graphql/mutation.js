import { gql } from '@apollo/client';

export const SENT_RESET_PASSWORD_EMAIL = gql`
    mutation sentPasswordResetEmail($email: String!) {
        sentPasswordResetEmail(email: $email) {
            success
            message
        }
    }
`;
export const RESEND_RESET_PASSWORD_EMAIL = gql`
    mutation resendVerificationEmail($email: String!) {
        resendVerificationEmail(email: $email) {
            success
            message
        }
    }
`;
export const VERIFY_EMAIL = gql`
    mutation verificationEmailDone($token: String!) {
        verificationEmailDone(token: $token) {
            message
        }
    }
`;
export const SEND_RECRUITER_REQUEST = gql`
  mutation sendRecruiterRequest($input:RecruiterRequestInput){
  sendRecruiterRequest(input : $input){
	message
  }
}
`;
export const RESET_PASSWORD = gql`
    mutation passwordResetDone(
        $confirmPasswowrd: String!
        $password: String!
        $token: ID!
        $uid: ID!
    ) {
        passwordResetDone(
            confirmPasswowrd: $confirmPasswowrd
            password: $password
            token: $token
            uid: $uid
        ) {
            message
        }
    }
`;


export const SOCIAL_LOGIN = gql`
mutation userSocialLogin($socialType:String!, $token:String!) {
  userSocialLogin(socialType: $socialType, token:$token) {
    accessToken
    user {
      role
      email
      id
    }
  }
}
`