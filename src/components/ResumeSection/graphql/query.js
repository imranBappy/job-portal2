import { gql } from "@apollo/client"

export const GET_ALL_BASE_TEMPLATE_LIST = gql`
query baseTemplateList(
  $name:String
  $id:ID
  $first:Int
  $offset:Int
  $orderBy:String
){
  baseTemplateList(
    name:$name
    id:$id
    first:$first
    offset:$offset
    orderBy:$orderBy
  ){
    totalCount
    edges{
      node{
        name
        previewUrl
        id
      }
    }
  }
}
`