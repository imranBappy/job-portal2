import { gql } from '@apollo/client'

export const CREATE_ACCOUNT = gql`
    mutation DELETE_ACCOUNT_MUTATION ($deletionReason:String!){
  deleteUserAccount(deletionReason:$deletionReason){
    message
  }
}
`