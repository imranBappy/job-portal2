import { gql } from "@apollo/client";



export const COUNTRY_QUERY = gql`
    query COUNTRY_QUERY($first:Int){
        allCountries(first:$first ){
            code
            name
        }
    }

`