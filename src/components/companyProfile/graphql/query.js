import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
    query categories($name_Icontains: String, $first: Int) {
        categories(name_Icontains: $name_Icontains, first: $first) {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;
export const GET_ALL_JOB_LIST = gql`
    query recruiterPosts(
        $offset: Int
        $first: Int
        $orderBy: String
        $title: String
        $startDate: Date
        $endDate: Date
    ) {
        recruiterPosts(
            offset: $offset
            first: $first
            orderBy: $orderBy
            title: $title
            startDate: $startDate
            endDate: $endDate
        ) {
            totalCount
            edges {
                node {
                    title
                    applicationDeadline
                    totalApplicant
                    totalShortlistCount
                    totalPendingCount

                    isActive
                    id
                }
            }
        }
    }
`;
export const GET_ALL_JOB_APPLIED_CANDIDATE_LIST = gql`
      query candidateList(
        $offset: Int
        $first: Int
        $status: JobsCandidateStatusChoices
        $orderBy: String
        $job: String
        $startDate: Date
        $endDate: Date
        $name: String
        $jobRole: String
        $title:String
    ) {
        candidateList(
            offset: $offset
            first: $first
            status: $status
            orderBy: $orderBy
            job: $job
            startDate: $startDate
            endDate: $endDate
            name: $name
            jobRole: $jobRole
            title:$title
        ) {
            totalCount
            pageInfo {
                hasNextPage
            }
            edges {
                node {
                    status
                    id
                    dateCreated
                    resume {
                       id
                        profile {
                            firstName
                            lastName
                            photoUrl
                              phoneNumber
                          user{
                            email
                          }
                        }
                        
                        experience {
                            edges {
                                node {
                                    endDate
                                    
                                    startDate
                                    isCurrentlyWorking
                                    city
                                    country
                                    designation{
                                  name
                                }
                                    company {
                                        
                                        name
                                    }
                                }
                            }
                        }
                        education {
                            edges {
                                node {
                                  
                                 
                                    institution {
                                        
                                        name
                                    }
                                }
                            }
                        }
                    }

                    job {
                        title
                      
                    }
                }
            }
        }
    }
`;
export const GET_ALL_SHORTLIST_RESUME_LIST = gql`
  query candidateList(
        $offset: Int
        $first: Int
        $status: JobsCandidateStatusChoices
        $orderBy: String
        $job: String
        $startDate: Date
        $endDate: Date
        $name: String
        $jobRole: String
        $title:String
    ) {
        candidateList(
            offset: $offset
            first: $first
            status: $status
            orderBy: $orderBy
            job: $job
            startDate: $startDate
            endDate: $endDate
            name: $name
            jobRole: $jobRole
            title:$title
        ) {
            totalCount
            pageInfo {
                hasNextPage
            }
            edges {
                node {
                    id
                    dateCreated
                    resume {
                        profile {
                            firstName
                            lastName
                            photoUrl
                        }
                    }
                    job {
                      title
                        designation {
                            name
                        }
                    }
                }
            }
        }
    }
`;
export const GET_SINGLE_JOB = gql`
    query singleRecruiterJob($id: ID!) {
        singleRecruiterJob(id: $id) {
            title
            isApplied
            description
            responsibilities {
                edges {
                    node {
                        title
                    }
                }
            }
            category {
                name
                id
            }
            dateCreated
            jobType
            designation {
                name
            }
            expertiseLevel
            isRemote
            minSalary
            maxSalary
            vacancy
            gender
            applicationDeadline
            benefits
            requiredSkills {
                edges {
                    node {
                        name
                    }
                }
            }
            educationRequirements
            minExperienceYears
            address {
                id
                city
                country
                completeAddress
            }
        }
    }
`;
export const GET_SINGLE_CANDIDATE = gql`
query singleCandidate($id: ID!) {
  singleCandidate(id: $id) {
    status
    id
    dateCreated
    resume {
      generatedTemplate
      socialMediaLinks {
        edges {
          node {
            name
            urlLink
          }
        }
      }
      profile {
        firstName
        lastName
        address
        photoUrl
        phoneNumber
        user {
          email
        }
      }
      skills {
        edges {
          node {
            name
          }
        }
      }
      experience {
        edges {
          node {
            endDate
            responsibilities {
              edges {
                node {
                  title
                }
              }
            }
            startDate
            isCurrentlyWorking
            city
            country
            designation {
              name
            }
            company {
              logoUrl
              name
            }
          }
        }
      }
      education {
        edges {
          node {
            id
            city
            country
            activities
            startDate
            endDate
            isCurrentlyStudying
            institution {
              logoUrl
              name
            }
          }
        }
      }
    }
    job {
      title
      designation {
        name
      }
      minExperienceYears
      address {
        city
      }
    }
  }
}
`;
