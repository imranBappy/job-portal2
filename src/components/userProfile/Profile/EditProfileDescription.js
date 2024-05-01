import Button from '@/components/Common/UI/Button';
import Modal from '@/components/Common/UI/Modal';
import CInput from '@/components/companyProfile/formElement/CInput';
import CTextArea from '@/components/companyProfile/formElement/CTextArea';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const EditProfileDescription = ({ open, onClose, data }) => {
    const [description, setDescription] = React.useState(data);

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <Modal style={{ width: 1200 }} onClose={onClose} open={open}>
            <form>
                <Box sx={{ my: 5 }}>
                    <CTextArea
                        style={{ padding: 10 }}
                        label="Description"
                        minRow={10}
                        value={description}
                        onChange={handleChange}
                    />
                </Box>
                <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={onClose}
                        label="Save"
                        style={{ fontSize: 20, px: 10 }}
                    />
                </Box>
            </form>
        </Modal>
    );
};

export default EditProfileDescription;
