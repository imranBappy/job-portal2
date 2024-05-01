import { Button, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

const ListDataItem = ({ item, handleAdd }) => {
    return (
        <ListItemButton>
            <Button
                onClick={() => handleAdd(item)}
                variant="contained"
                sx={{
                    backgroundColor: '#0079D1',
                    borderRadius: 0,
                    boxShadow: 'none',
                }}
            >
                ADD
            </Button>
            <ListItemText
                sx={{
                    marginLeft: 2,
                }}
                primary={item.name}
            />
        </ListItemButton>
    );
};

export default ListDataItem;
