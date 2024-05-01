import { gql } from '@apollo/client';

export const CUD_COMPANY_PROFILE = gql`
    mutation createUpdateCompany(
       $input:AdminCompanyFormInput
       $isCandidate:Boolean
       $userId:ID
    ) {
        createUpdateCompany(
          input:$input
          isCandidate:$isCandidate
					userId:$userId
        ) {
            message
        }
    }
`;
export const COMPANY_TEAM_MEMBER_CU = gql`
    mutation companyTeamMemberCreateUpdate(
        $teamMembers: [CompanyTeamMemberInput]
    ) {
        companyTeamMemberCreateUpdate(teamMembers: $teamMembers) {
            message
        }
    }
`;
export const OFFICE_LOCATION_CU = gql`
    mutation officeLocationCreateUpdate(
        $officeLocations: [OfficeLocationInputForm]
    ) {
        officeLocationCreateUpdate(officeLocations: $officeLocations) {
            message
        }
    }
`;
