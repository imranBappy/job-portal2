import CModal from '@/common/CModal';
import Toaster from '@/common/Toaster';
import Button from '@/components/Common/UI/Button';
import CInput from '@/components/companyProfile/formElement/CInput';
import { ADD_SKILL } from '@/graphql/skill/skillMutation';
import { SEARCH_SKILL } from '@/graphql/skill/skillQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Done, Search } from '@mui/icons-material';
import { Box, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { set } from 'lodash';
import React, { useEffect, useState } from 'react';

const AddSkill = ({ open, onClose, refetch, skills = [] }) => {
    const [skill, setSkill] = useState("");
    const [addSkill, { loading }] = useMutation(ADD_SKILL, {
        onCompleted: (res) => {
            setSkill("");
            Toaster({
                message: res?.addSkill?.message,
                type: 'success',
            });
            refetch();
            // onClose();

        },
        onError: (error) => {
            Toaster({
                message: error.message,
                type: 'error',
            });
        },
    });
    const [getAllSkills, { data: allSkillsList }] = useLazyQuery(SEARCH_SKILL, {
        nextFetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
        onError: (error) => {
            Toaster({
                type: 'error',
                message: error.message,
            });
        },
    });

    const isShow = skill &&
        allSkillsList?.skillsList?.edges &&
        allSkillsList?.skillsList?.edges?.length > 0;

    useEffect(() => {
        setSkill("")
    }, [open])

    const handleSubmit = (skill) => {
        const isThere = skills?.find((item) => item?.skill?.toLowerCase() === skill?.toLowerCase());
        if (isThere) return Toaster({
            message: 'Skill already exists',
            type: 'error',
        });
        if (skill.length !== 0) return addSkill({
            variables: {
                name: skill.toLocaleLowerCase(),
            },
        });
        Toaster({
            message: 'Please fill all the field',
            type: 'error',
        });
    };

    const onKeyDown = (ev) => {
        if (ev.key === 'Enter') {
            let value = ev.target.value.trim()

            if (!value) return
            setSkill(value)
            handleSubmit(value);

            ev.preventDefault();
        }
    };

    const handleSkillChange = (e) => {
        let { value } = e.target;
        setSkill(value);
        getAllSkills({
            variables: {
                name_Icontains: value,
            },
        });
    };
    const handleAddSkill = (value) => {
        if (!value) return;
        setSkill(value);
        handleSubmit(value);
    };


    return (
        <CModal maxWidth="md" title=" Add Skill" onClose={onClose} open={open}
            style={{
                minHeight: isShow ? 540 : 'auto',
                overflow: 'hidden',
            }}
        >

            <form >
                <Box sx={{ mb: 5 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}

                        >
                            <Box
                                sx={{
                                    position: 'relative',
                                    marginBottom: 20,
                                }}

                            >
                                <CInput
                                    value={skill}
                                    onChange={handleSkillChange}
                                    label="Search For skills"
                                    name="skills"
                                    placeholder="e.g. Backend Developer"
                                    autoComplete="off"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Search color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onKeyDown={onKeyDown}
                                />
                                {isShow ? (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 100,
                                            border: 1,
                                            bgcolor: 'white',
                                            width: '100%',
                                            borderRadius: 2,
                                            borderColor: '#1C3E5E33',
                                            height: 'auto',
                                            maxHeight: 280,
                                            overflow: 'auto',
                                            zIndex: 'tooltip',
                                        }}
                                    >
                                        {allSkillsList.skillsList.edges.map((item, key) => (
                                            <Box
                                                key={`${item.node.name}_${key}`}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    borderBottom: 1,
                                                    borderColor: '#1C3E5E33',
                                                    p: 2,
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() =>
                                                    handleAddSkill(item.node.name)
                                                }
                                            >
                                                <IconButton

                                                    sx={{

                                                        height: 30,
                                                        width: 50,
                                                        borderRadius: 1,
                                                        bgcolor: 'primary.main',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        color: 'white',
                                                        fontSize: 14,
                                                        '&:hover': {
                                                            bgcolor: 'primary.main',
                                                        },
                                                    }}
                                                >
                                                    {skill.includes(item.node.name) ? (
                                                        <Done />
                                                    ) : (
                                                        'ADD'
                                                    )}
                                                </IconButton>
                                                <Typography>{item.node.name}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                ) : null}
                            </Box>

                        </Grid>

                    </Grid>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        isLoading={loading}
                        label="Add skill"
                        style={{ fontSize: 20, px: 10 }}
                    />
                </Box>
            </form>
        </CModal>
    );
};

export default AddSkill;
