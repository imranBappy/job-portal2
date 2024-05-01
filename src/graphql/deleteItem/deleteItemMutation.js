import { gql } from "@apollo/client";


export const DeleteItemMutation = gql`mutation DeleteItem($ids : [ID]! $modeName:String!){
  deleteItem(ids:$ids, modelName:$modeName){
   message 
  }
}`