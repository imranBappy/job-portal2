'use client';
import {
    Box,
    Button,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import SearchField from '../Common/Input/SearchField';
import { FixedSizeList } from 'react-window';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SEARCH_SKILL } from '@/graphql/skill/skillQuery';
import { ADD_SKILL } from '@/graphql/skill/skillMutation';
import { Add } from '@mui/icons-material';
import ListData from '../ListData/ListData';
import ListDataItem from '../ListData/ListDataItem';
import NotFoundItem from '../ListData/NotFoundItem';

const RealtimeSearch = ({ state, sx, ...rest }) => {
    const [skills, setSkills] = state;
    const [input, setInput] = useState('');
    const [result, setResult] = useState([]);
    const [searchSkill, { data }] = useLazyQuery(SEARCH_SKILL);

    const [addSkill] = useMutation(ADD_SKILL);

    useEffect(() => {
        if (data && input) {
            const skills = data.skillsList.edges.map((edge) => edge.node);
            const isThere = skills.find(
                (skill) => skill.name.toLowerCase() === input.toLowerCase(),
            );
            if (!isThere) {
                setResult([{ name: input, id: 'new' }, ...skills]);
            } else {
                setResult(skills);
            }
        }
    }, [data]);

    const addNewSkill = (skill) => {
        addSkill({
            variables: {
                name: skill,
            },
        });
    };

    const handleSearch = useCallback(
        (e) => {
            searchSkill({
                variables: {
                    nameIcontains: input,
                },
            });
        },
        [input, searchSkill],
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch();
        }, 500);
        return () => clearTimeout(timer);
    }, [handleSearch]);

    const handleChange = (e) => {
        console.log(e.target.value);
        setInput(e.target.value);
    };

    const handleAdd = (skill) => {
        console.log(skill);
        const isThere = skills.find(
            (skill) => skill.name.toLowerCase() === input.toLowerCase(),
        );
        if (!isThere && skill?.id === 'new') {
            addNewSkill(skill.name);
        }
        if (!isThere && input) {
            setSkills([...skills, { name: input, id: 'new' }]);
        }
        setInput('');
    };

    return (
        <Box
            {...rest}
            sx={{
                ...sx,
            }}
        >
            <Box>
                <SearchField handleChange={handleChange} />
            </Box>
            <Box mt={2}>
                <ListData
                    sx={{
                        width: '100%',
                    }}
                >
                    {result.length ? (
                        result.map((item) => (
                            <ListDataItem
                                handleAdd={handleAdd}
                                key={item.id}
                                item={item}
                            />
                        ))
                    ) : (
                        <>
                            <NotFoundItem />
                        </>
                    )}
                </ListData>
            </Box>
        </Box>
    );
};

export default RealtimeSearch;

function renderRow(props) {
    const {
        index,
        style,
        data: { data, handleAdd },
    } = props;
    return (
        <ListItem
            style={{
                ...style,
                borderBottom: '1px solid #1C3E5E80',
            }}
            key={index}
            component="div"
            disablePadding
        >
            <ListItemButton>
                <ListItemText primary={` ${data[index]?.name}`} />

                <Button onClick={() => handleAdd(data[index])}>
                    <Add />
                </Button>
            </ListItemButton>
        </ListItem>
    );
}
