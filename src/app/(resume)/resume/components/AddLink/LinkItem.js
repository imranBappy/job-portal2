import { Box, Button } from '@mui/material';
import React from 'react';
import Input from '@/components/Common/Input/LabeledTextField';
import DeleteIcon from '@mui/icons-material/Delete';
import LabeledSelectField from '@/components/Common/Input/LabeledSelectField';

const options = [
    { name: 'Facebook', value: 'facebook' },
    { name: 'LinkedIn', value: 'linkedIn' },
    { name: 'Github', value: 'github' },
    { name: 'Twitter', value: 'twitter' },
    { name: 'Instagram', value: 'instagram' },
];

const LinkItem = ({ register, errors, link, links, handleDelete, setLink }) => {
    const handleChanges = (e) => {
        const { name, value } = e.target;
        const newLinks = [...links];
        const index = newLinks.findIndex((l) => l.id === link.id);
        if (name === 'social') {
            newLinks[index].name = value;
        }
        if (name === 'link') {
            newLinks[index].value = value;
        }
        setLink(newLinks);
    };
    return (
        <Box position={'relative'}>
            <Box
                my={2}
                width={'100%'}
                display={'flex'}
                gap={2}
                justifyContent={'space-bettwin'}
            >
                <LabeledSelectField
                    onChange={handleChanges}
                    fullWidth={true}
                    name={'social'}
                    label={'Social Website'}
                    type="select"
                    helperText={errors?.social?.message}
                    error={!!errors?.social}
                    options={options}
                />
                <Input
                    onChange={handleChanges}
                    fullWidth={true}
                    register={register}
                    required={{
                        required: 'Social Link is required',
                    }}
                    name={'link'}
                    label={link.name || "Link's URL"}
                    type="text"
                    helperText={errors?.link?.message}
                    error={!!errors?.link}
                />
            </Box>
            <Button
                onClick={() => handleDelete(link.id)}
                sx={{ position: 'absolute', right: -50, top: 60 }}
            >
                <DeleteIcon style={{ color: '#808080' }} />
            </Button>
        </Box>
    );
};

export default LinkItem;
