import { Edit } from '@mui/icons-material';
import { Box } from '@mui/material';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Button from '../../Common/UI/Button';

const ResumeDetailCard = ({ handleEdit, handleDelete, children, data }) => {
    return (
        <Box
            sx={{
                border: 1.5,
                borderColor: "rgba(0,0,0,0.4)",
                borderRadius: 5,
                py: 1.8,
                px: 2.4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                my: 2,
            }}
        >
            <Box sx={{ display: 'flex' }}>{children}</Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                    style={{
                        width: '110px',
                        fontSize: '16px',
                        fontWeight: 600,
                    }}
                    startIcon={<Edit fontSize="small" />}
                    onClick={() => handleEdit(data)}
                    label="Edit"
                />{' '}
                {/* <Button
                    onClick={() => handleDelete(data.id)}
                    style={{
                        border: 2,
                        borderColor: 'red',
                        color: 'red',
                        width: '110px',
                        fontSize: '16px',
                        fontWeight: 600,
                        '&:hover': {
                            border: 2,
                            borderColor: 'red',
                        },
                    }}
                    variant="outlined"
                    startIcon={
                        <RiDeleteBin5Line color="error" fontSize="small" />
                    }
                    label="Delete"
                /> */}
            </Box>
        </Box>
    );
};

export default ResumeDetailCard;
