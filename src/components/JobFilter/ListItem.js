import { useState } from 'react';
import Item from '@mui/material/ListItem';
import { Checkbox, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';

const ListItem = (props) => {
    const { label, value } = props;
    const [checked, setChecked] = useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    return (
        <Item
            key={value}
            disablePadding
            onClick={props.onClick ? () => props.onClick(value) : () => { }}
        >
            <ListItemButton

                role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': value }}
                    />
                </ListItemIcon>
                <ListItemText id={value} primary={label} />
            </ListItemButton>
        </Item >
    );
};

export default ListItem;