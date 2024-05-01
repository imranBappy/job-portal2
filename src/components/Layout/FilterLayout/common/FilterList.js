import { useState } from 'react';
import { Box, Collapse, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ListItem from './ListItem';

const FilterList = (props) => {
    const { label, list } = props;
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Box sx={{ zIndex: 2 }}>

            <ListItemButton onClick={handleClick}>
                <Typography variant={'h6'}>{label}</Typography>
                <ListItemText />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {list.map((lst) => <ListItem
                        onClick={props.onClick}
                        key={lst.value}
                        disablePadding
                        value={lst.value}
                        label={lst.label}
                        state={props.state}
                    />)}
                </List>
            </Collapse>

        </Box>
    );
};

export default FilterList;