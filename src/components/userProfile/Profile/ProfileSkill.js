import Button from '@/components/Common/UI/Button';
import { Clear, Delete } from '@mui/icons-material';
import React from 'react';

const ProfileSkill = ({ skill, id, onClick }) => {
    return (
        <Button
            style={{
                backgroundColor: '#F8F8FD',
                color: '#4640DE',
                borderRadius: '10px',
            }}
            variant="normal"
        >
            {skill}
            <Clear onClick={onClick} style={{ marginLeft: '1rem', color: "#ff5b5b" }} />
        </Button>
    );
};

export default ProfileSkill;
