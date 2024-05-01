import { gql } from '@apollo/client';

export const FAQ_QUERY = gql`
    query FAQ_QUERY($first:Int, $before:String) {
        allFaqs(first:$first,before: $before){
            edges{
                node{
                    id
                    question
                    answer
                    createdOn
                }
            }
        }
    }
`
