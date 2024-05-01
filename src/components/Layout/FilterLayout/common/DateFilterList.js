import { useState } from 'react';
import { Box, Collapse, Typography, List, ListItemButton, ListItemText, ListItemIcon, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Item from '@mui/material/ListItem';

const DateFilterList = (props) => {
    const { label, list } = props;
    const [open, setOpen] = useState(true);
    const [checked, setChecked] = useState([]);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleToggle = (value) => () => {
        if (checked.length > 0) {
            checked[0] === value ? setChecked([]) : setChecked([value])
        } else {
            setChecked([value])
        }
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



                    {list.map((lst) => <Item
                        key={lst.value}
                        disablePadding
                        onClick={props.onClick ? () => props.onClick(lst.value) : () => { }}
                    >
                        <ListItemButton
                            role={undefined} onClick={handleToggle(lst.value)} dense>
                            <ListItemIcon
                            >
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(lst.value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': lst.value }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    color: checked.indexOf(lst.value) !== -1 ? "#017EF3" : "#000000",

                                    "& .MuiTypography-root": {
                                        fontWeight: 'bold',
                                    }
                                }}

                                id={lst.value}
                                primary={lst.label}
                            />
                        </ListItemButton>
                    </Item >)}
                </List>
            </Collapse>

        </Box>
    );
};

export default DateFilterList;