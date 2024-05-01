import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';

const NotFoundItem = () => {
    return (
        <ListItem component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`No Result Found`} />
            </ListItemButton>
        </ListItem>
    );
};

export default NotFoundItem;
