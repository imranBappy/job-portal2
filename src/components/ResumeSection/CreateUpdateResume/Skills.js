import {
    Box,
    FormHelperText,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CInput from '../../companyProfile/formElement/CInput';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_SKILL } from '@/graphql/skill/skillQuery';
import Toaster from '@/common/Toaster';
import { Close, Done, Search } from '@mui/icons-material';

const Skills = ({ skillsList, setSkillsList, error, setError }) => {
    const [skill, setSkill] = useState('');

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

    const handleSkillChange = (e) => {
        let { value } = e.target;
        setSkill(value);
        getAllSkills({
            variables: {
                name_Icontains: value,
            },
        });
    };

    const handleAddSkill = (e) => {
        if (!e) return

        if (skillsList.includes(e)) {
            setSkillsList((prev) => prev.filter((item) => item !== e));
        } else {
            setSkillsList((prev) => [...prev, e]);
            setSkill('');
        }
        setError({ ...error, skills: '' });
    };

    const onKeyDown = (ev) => {
        if (ev.key === 'Enter') {
            let value = ev.target.value.trim()

            if (!value) return

            setSkillsList((prev) => [...prev, value]);
            setSkill('');

            ev.preventDefault();
        }
    };

    const handleRemoveSkill = (e) => {
        setSkillsList((prev) => prev.filter((item) => item !== e));
    };

    return (
        <Box>
            <Box sx={{ position: 'relative' }}>
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

                {skill &&
                    allSkillsList?.skillsList?.edges &&
                    allSkillsList?.skillsList?.edges?.length > 0 ? (
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
                            zIndex: 99,
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
                                    {skillsList.includes(item.node.name) ? (
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

            <Box
                sx={{
                    border: 1,
                    mt: 5,
                    p: 2,
                    borderRadius: 1,
                    minHeight: "180px",
                    borderRadius: "12px",
                    display: 'flex',
                    borderColor: '#1C3E5E33',
                    gap: 2,
                    flexWrap: 'wrap'
                }}
            >
                {skillsList?.length > 0 ? (
                    skillsList?.map((item, key) => (
                        <Box
                            key={`skill_${item}_${key}`}
                            sx={{
                                width: 'auto',
                                p: 2,
                                height: 35,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                gap: 1,
                                bgcolor: 'primary.light',
                            }}
                        >
                            {item}{' '}
                            <IconButton onClick={() => handleRemoveSkill(item)}>
                                <Close sx={{ fontSize: 18 }} />
                            </IconButton>
                        </Box>
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                        <Typography>No Skill Selected</Typography>
                    </Box>
                )}
            </Box>
            {error?.skills ? (
                <FormHelperText sx={{ color: 'red' }}>
                    {error?.skills}
                </FormHelperText>
            ) : null}
        </Box>
    );
};

export default Skills;
