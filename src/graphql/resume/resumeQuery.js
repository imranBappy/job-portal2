import { gql } from '@apollo/client';

export const ALL_EDUCATIONAL_ACTIVITIES = gql`
    query educationalActivities($name_Icontains: String, $first: Int) {
        educationalActivities(name_Icontains: $name_Icontains, first: $first) {
            edges {
                node {
                    name
                    id
                }
            }
        }
    }
`;

export const ALL_UNIVERSITY_LIST = gql`
    query universityList($name_Icontains: String, $first: Int) {
        universityList(name_Icontains: $name_Icontains, first: $first) {
            edges {
                node {
                    name
                    id
                }
            }
        }
    }
`;
export const ALL_DESIGNATION_LIST = gql`
    query designationList($first: Int, $name_Icontains: String) {
        designationList(first: $first, name_Icontains: $name_Icontains) {
            edges {
                node {
                    name
                    id
                }
            }
        }
    }
`;
export const ALL_COMPANY_LIST = gql`
    query companyList($name: String, $first: Int) {
        companyList(name: $name, first: $first) {
            edges {
                node {
                    name
                    id
                }
            }
        }
    }
`;
export const ALL_SOCIAL_MEDIA_LINKS = gql`
    query {
        socialMediaLinksList {
            edges {
                node {
                    name
                    urlLink
                    id
                }
            }
        }
    }
`;
export const ALL_RESPONSIBILITIES_LIST = gql`
    query responsibilitiesList(
        $title: String
        $designation: String
        $first: Int
        $isFor: String
    ) {
        responsibilitiesList(
            title: $title
            designation: $designation
            first: $first
            isFor: $isFor
        ) {
            edges {
                node {
                    title
                    usedCount
                }
            }
        }
    }
`;

//templateId
export const SINGLE_RESUME_DETAILS = gql`
    query singleResume($id: String!) {
        singleResume(id: $id) {
            id
            template {
                id
            }
            generatedTemplatePreview
            summary
            generatedTemplate
            name
              socialMediaLinks{
            edges{
                node{
                id
                }
            }
    }
            education {
                edges {
                    node {
                        id
                        institution {
                            name
                        }
                        isCurrentlyStudying
                        subject
                        degree
                        degreeType
                        country
                        city
                        startDate
                        endDate
                        activities
                    }
                }
            }
            experience {
                edges {
                    node {
                        id
                        company {
                            name
                        }
                        country
                        city
                        isCurrentlyWorking
                        startDate
                        endDate
                        designation {
                            name
                        }
                        responsibilities {
                            edges {
                                node {
                                    title
                                }
                            }
                        }
                    }
                }
            }
            skills {
                edges {
                    node {
                        name
                    }
                }
            }
        }
    }
`;

export const ALL_RESUME_LIST = gql`
    query ResumeList {
  resumeList {
    edges {
      node {
        id
        name
      }
    }
  }
}`

export const SINGLE_RESUME_TEMPLATE = gql`
    query singleResume($id: String!) {
        singleResume(id: $id) {
            generatedTemplate
        }
    }
`;

export const GET_CANDIDATE_RESUME = gql`
query singleCandidate($id: ID!) {
    singleCandidate(id: $id) {
      resume {
        generatedTemplate
      }
    }
  }
`;
