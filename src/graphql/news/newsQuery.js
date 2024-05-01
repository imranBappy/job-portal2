import { gql } from "@apollo/client";


export const BLOG_QUERY = gql`
query BLOG_QUERY($first:Int, $offset:Int, $orderBy:String,$customSearch:String,  $category:String,$blogType:String) {
  allPosts(first:$first, offset:$offset, orderBy:$orderBy,customSearch:$customSearch, category:$category, blogType:$blogType){
    edges{
      node{
        id
        title
        content
        thumbnailUrl,
        createdOn
        category{
          name
        }
      }
    }
    totalCount
  }
}
`

export const BLOG_DETAILS = gql`
query BLOG_DETAILS($id:ID!) {
  singlePost(id: $id) {
    author {
      id
      role
      profile {
        socialmedialinksSet {
          edges {
            node {
              urlLink
              name
            }
          }
        }
        photoUrl
        firstName
        lastName
          profession
      }
    }
    content
    createdOn
    thumbnailUrl
    title
  }
}`