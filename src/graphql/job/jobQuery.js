const { gql } = require('@apollo/client');



export const GET_JOB_BY_ID = gql`
    query JobListFiltered($id: String) {
        jobListFiltered {
            jobList(id: $id) {
                edges {
                    node {
                      
                        id
                      
                      educationRequirements
minExperienceYears
                      gender
                        designation {
                            id
                            name
                        }
                        category {
                            id
                            name
                        }
                        address {
                            id
                            completeAddress
                        }
                        benefits
                        requiredSkills {
                            edges {
                                node {
                                    id
                                    name
                                }
                            }
                        }
                        company {
                            id
                            name

                            description
                            industry {
                                id
                            }
                            website

                            logoUrl
                            employeesCount
                            contactEmail
                            contactPhone
                            socialMediaLinks
                            country
                            city
                            isActive
                            isVerified
                            longitude
                            latitude
                        }

                        title
                        expertiseLevel
                        jobType
                        isRemote

                        description
                        dateCreated

                        responsibilities {
                            edges {
                                node {
                                    title
                                    isFor
                                    designation {
                                        name
                                        id
                                    }
                                    id
                                    usedCount
                                }
                            }
                        }
                        isDeleted
                        minSalary
                        maxSalary
                        applicationDeadline
                        requiredSkills {
                            edges {
                                node {
                                    name
                                    id
                                }
                            }
                        }
                        educationRequirements
                        minExperienceYears
                        recruiterquestionSet {
                            edges {
                                node {
                                    questionText

                                    id
                                }
                            }
                        }

                        recruiterQuestions
                        totalApplicant
                    }
                }
            }
        }
    }
`;

export const JOB_LIST_QUERY = gql`
query JobListFiltered($offset: Int, $first: Int, $sortBy: String, $jobTypeList:[String], $jobLevelList:[String], $categoryList:[ID], $salaryRangeList:[[String]], $postDay:String, $customSearch:String, $location:String, $isAlert:Boolean ) {
  jobListFiltered( sortBy: $sortBy, jobTypeList:$jobTypeList, jobLevelList:$jobLevelList, categoryList:$categoryList, salaryRangeList:$salaryRangeList, postDay:$postDay, customSearch:$customSearch, location:$location, isAlert:$isAlert) {
    jobList (offset: $offset, first: $first){
      edges {
        node {
          id
          isApplied
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
          createdOn
        }
      }
        totalCount
    }
  	searchFilters      
  }
}
`