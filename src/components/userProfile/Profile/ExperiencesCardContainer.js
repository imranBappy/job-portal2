"use client";
import { QUERY_EXPERIENCES } from '@/graphql/experiences/experiencesQuery';
import React from 'react';
import ExperiencesCard from './ExperiencesCard';
import { Button, Divider } from '@mui/material';
import { useQuery } from '@apollo/client';
import ProfileCardHeader2 from '../ProfileCardHeader2';
import EditExperiences from './EditExperiences';
import NotFound from '@/components/Common/UI/NotFound';
import CircularLoader from '@/components/Loader/CircularLoader';

const ExperiencesCardContainer = () => {

    // const [experiences, setExperiences] = React.useState([]);
    const [total, setTotal] = React.useState(3);


    const { data, refetch, loading } = useQuery(QUERY_EXPERIENCES, {
        variables: {
            first: total,
        },


    }, {
        fetchPolicy: 'cache-and-network',
    });

    const experiences = data?.experienceList?.edges?.map((item) => item.node);

    const [open, setOpen] = React.useState(false);
    const handleClone = () => {
        setOpen(false);
    }

    const handleSeeMore = () => {
        setTotal(data?.experienceList?.totalCount)
    }
    const totalCount = data?.experienceList?.totalCount;

    return (
        <>
            <ProfileCardHeader2 onOpen={() => setOpen(true)} title="Experiences " />
            <EditExperiences
                refetch={refetch}
                open={open}
                onClose={handleClone}
            />

            {
                loading ? <CircularLoader /> : !experiences?.length && <NotFound />
            }

            {experiences?.map((item, i) => (
                <>
                    <ExperiencesCard
                        refetch={refetch}
                        key={item.id}
                        data={item}
                    />
                    {i !== experiences.length - 1 && <Divider />}
                </>
            ))}


            {
                (totalCount > 3 && experiences?.length < totalCount) && <Button onClick={handleSeeMore}
                    style={{
                        textTransform: 'capitalize'
                    }}
                >
                    {
                        loading ? 'Loading...' : 'See More'
                    }
                </Button>
            }
        </>
    );
};

export default ExperiencesCardContainer;
