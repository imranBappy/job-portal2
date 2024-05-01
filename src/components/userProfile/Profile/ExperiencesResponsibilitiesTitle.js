import SearchAbleInput from '@/components/ResumeSection/CreateUpdateResume/SearchAbleInput';
import { ALL_RESPONSIBILITIES_LIST } from '@/graphql/resume/resumeQuery';
import { useLazyQuery } from '@apollo/client';
import React from 'react';

const ExperiencesResponsibilitiesTitle = ({ data, errors, handleAddResponsibleTitle }) => {
    const [getResponsibilityTitles, { data: responsibilitiesListList }] =
        useLazyQuery(ALL_RESPONSIBILITIES_LIST, {
            nextFetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
            onError: (error) => {
                Toaster({
                    type: 'error',
                    message: error.message,
                });
            },
        });

    const handleResponsibleTitleChange = (e) => {

        getResponsibilityTitles({
            variables: {
                title: e,
                designation: data.designationName
            },
        });
    };
    return (
        <SearchAbleInput
            label="Search by job title for pre-written examples"
            list={responsibilitiesListList?.responsibilitiesList?.edges?.map(
                (el) => el.node,
            )}
            valueName="title"
            display="title"
            placeholder="e.g. Frontend Developer"
            selectedList={data.responsibilitiesTitle || []}
            onChange={handleResponsibleTitleChange}
            handleAdd={handleAddResponsibleTitle}
            error={errors?.responsibilitiesTitle}
            isEnter={!!errors?.responsibilitiesTitle}
        />
    );
};

export default ExperiencesResponsibilitiesTitle;