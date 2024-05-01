

const { gql } = require('@apollo/client');

export const COMPANY_LIST_QUERY = gql`
query CompanyList($first:Int, $offset:Int, $countryNames:[String],$industryNames:[String], $name:String ){
  companyList(first:$first, offset:$offset,countryNames:$countryNames, industryNames:$industryNames, name:$name ){
    edges{
      node{
        id,
        name,
        logoUrl,
      	city,
        country,
        totalVacancy,
        industry{
          id
          name
        }
        jobs{
          totalCount
        }
      }
    }
    totalCount
  }
}
`;



export const COMPANY_QUERY = gql`
query CompanyDetails($id:ID!){
  singleRecruiterJob(id:$id){
  	company{
      id
      website
      name
      jobs{
        totalCount
      }
      createdOn
      employeesCount
      city
      country
      industry{
        name
      }
      description
      contactPhone
      contactEmail
      socialMediaLinks
      teamMembers{
        edges{
          node{
            id
            memberName
            imageUrl
            role
            instagram
            linkdin
          }
        }
      }
    }
  }
}
`;

export const COMPANY_DETAILS_QUERY = gql`
query COMPANY_DETAILS_QUERY($id:ID!) {
  singleCompany(id: $id) {
    name
    logoUrl
    website
    totalVacancy
    city
    contactEmail
    contactPhone
    country
    createdOn
    description
    employeesCount
    foundedDate
    socialMediaLinks
      industry {
      name
    }
    teamMembers {
      edges {
        node {
          id
          imageUrl
          instagram
          linkdin
          memberName
          role
        }
      }
    }
  }
}
`


export const COMPANY_JOBS_QUERY = gql`
query COMPANY_JOBS_QUERY($id :ID!,$first:Int ) {
  singleCompany(id: $id) {
    jobs(first: $first) {
      edges {
        node {
       		id
          company {
            id
            name
            logoUrl
            city
            country
          }
          category {
            name
            id
          }
          title
          jobType
          description
          minSalary
          maxSalary
          applicationDeadline
          educationRequirements
          minExperienceYears
          totalApplicant
        }
      }
    }
  }
}

`