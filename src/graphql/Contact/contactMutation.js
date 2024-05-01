const { gql } = require("@apollo/client");



const CONTACT_MUTATION = gql`
    mutation ContactMutation($email:String, $name:String, $message:String) {
        contactMutation(email: $email, fullName: $name, message: $message) {
            message
        }
}
`


export default CONTACT_MUTATION