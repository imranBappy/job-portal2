import Button from '@/components/Common/UI/Button';
import { Box, Typography } from '@mui/material';
import React, { use, useEffect, useState } from 'react';
import ProfileSkill from './ProfileSkill';
import { SKILLS_QUERY } from '@/graphql/skill/skillQuery';
import { useMutation, useQuery } from '@apollo/client';
import { DeleteItemMutation } from '@/graphql/deleteItem/deleteItemMutation';
import Toaster from '@/common/Toaster';
import ProfileCardHeader2 from '../ProfileCardHeader2';
import AddSkill from './AddSkill';



const ProfileSkills = () => {
    const { data, loading, refetch } = useQuery(SKILLS_QUERY);
    const [skills, setSkill] = useState([]);
    const [open, setOpen] = useState(false);

    const [deleteSkill, { data: deleteData }] = useMutation(DeleteItemMutation, {
        onCompleted: () => {
            Toaster({
                message: 'Skill deleted successfully',
                type: 'success',
            })
        },
        onError: (error) => {
            Toaster({
                message: 'There was an error deleting the skill',
                type: 'error',
            })
        }

    });


    useEffect(() => {
        const skills = data?.me?.profile?.skills?.edges?.map((skill) => ({
            id: skill?.node?.id,
            skill: skill?.node?.name,
        }));
        setSkill(skills);
    }, [data]);

  

    if (loading) return <p>Loading...</p>;

    const handleDelete = (id) => {
        setSkill(skills.filter((skill) => skill.id !== id));
        deleteSkill({
            variables: {
                ids: [id],
                modeName: 'skill',
            },
        });
    };


    return (
        <>
            <ProfileCardHeader2
                open={open}
                onOpen={() => setOpen(true)}
                title="Skills" />
            <AddSkill
                refetch={refetch}
                open={open}
                onClose={() => setOpen(false)}
                skills={skills}
            />
            <Box display={'flex'} gap={2} flexWrap={'wrap'}>
                {skills?.length === 0 && (
                    <Typography variant={'body2'} color={'textSecondary'}>
                        No skills added yet
                    </Typography>

                )}
                {skills?.map((skill) => (
                    <ProfileSkill
                        onClick={() => handleDelete(skill.id)}
                        key={skill.id}
                        skill={skill.skill}
                        id={skill.id}
                    />
                ))}
            </Box>
        </>
    );
};

export default ProfileSkills;
