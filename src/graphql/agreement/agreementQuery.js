import { gql } from '@apollo/client';


export const AGREEMENT_QUERY = gql`
    query AGREEMENT_QUERY($id:ID!){ 
             singleAgreement(id:$id){
                id
                content
        }
    }

`