const { gql } = require("@apollo/client");


export const BLOG_CATEGORY_QUERY = gql`
query BLOG_CATEGORY_QUERY($first:Int,$offset:Int ){
  allBlogCategories(first:$first, offset:$offset){
    edges{
      node{
        id
        name
      }
    }
  }
}
`