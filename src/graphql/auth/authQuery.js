const { gql } = require('@apollo/client');

export const GET_ME = gql`
    query me {
        me {
            id
            email
            shortListed
            totalApplied
            totalJobAlert
            company {
                id
                totalPendingCount
                totalCandidateCount
                totalShortlistCount
                name
                industry {
                    id
                    name
                }
                website
                logoUrl
                contactEmail
                contactPhone
                foundedDate
                employeesCount
                description
                country
                officeLocations {
                    edges {
                        node {
                            id
                            completeAddress
                            city
                            country
                            isHeadquarter
                        }
                    }
                }
                city
                socialMediaLinks
                teamMembers {
                    totalCount
                    edges {
                        node {
                            id
                            memberName
                            imageUrl
                            role
                            linkdin
                            instagram
                        }
                    }
                }
            }
            profile {
                id
                firstName
                lastName
                profession
                photoUrl
                city
                country
                zipCode
                phoneNumber
                dateOfBirth
                address
                bio
                gender
                socialmedialinksSet {
                    edges {
                        node {
                            name
                            urlLink
                            id
                        }
                    }
                }
            }
        }
    }
`;
