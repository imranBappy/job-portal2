export const CREATE_COMPANY = gql`
  mutation CreateCompany($contactEmail: String, $contactPhone: String, $description: String, $employeesCount: Int, $foundedYear: Int, $headquarters: String, $industry: String, $latitude: Float, $logo: Upload, $longitude: Float, $name: String, $socialMediaLinks: JSONString, $website: String) {
  createCompany(contactEmail: $contactEmail, contactPhone: $contactPhone, description: $description, employeesCount: $employeesCount, foundedYear: $foundedYear, headquarters: $headquarters, industry: $industry, latitude: $latitude, logo: $logo, longitude: $longitude, name: $name, socialMediaLinks: $socialMediaLinks, website: $website) {
    message
  }
}
`
