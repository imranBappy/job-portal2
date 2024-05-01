import Item from '@mui/material/ListItem';
import { Checkbox, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';

const ListItem = (props) => {
    const { label, value } = props;
    const [state, setState] = props.state;


    const handleSelect = (value) => {
        if (typeof state === 'string') {
            setState(value);
            return;
        }
        if (state.includes(value)) {
            setState((pre) => pre.filter((v) => v !== value))
        } else {
            setState((pre) => [...pre, value])
        }

    }

    const isChecked = (value) => {
        if (typeof state === 'string') {
            return state === value
        }
        return state.includes(value)
    }

    return (
        <Item
            key={value}
            disablePadding
            onClick={() => handleSelect(value)}
        >
            <ListItemButton
                dense>
                <ListItemIcon
                >
                    <Checkbox
                        edge="start"
                        checked={isChecked(value)}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText
                    sx={{
                        color: isChecked(value) ? "#017EF3" : "#000000",
                        "& .MuiTypography-root": {
                            fontWeight: 'bold',
                        }
                    }}

                    id={value}
                    primary={label}
                />
            </ListItemButton>
        </Item >
    );
};

export default ListItem;