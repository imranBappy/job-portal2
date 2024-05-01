import { gql } from "@apollo/client";

export const CREATE_UNIVERSITY = gql`
mutation cudUniversity(
  $input:UniversityMutationInput!
){
  cudUniversity(
    input:$input
  ){
    message
  }
}
`
export const CREATE_DESIGNATION = gql`
mutation addDesignation(
  $input:DesignationInputObjectType
){
  addDesignation(
    input:$input
  ){
    message
  }
}
` 