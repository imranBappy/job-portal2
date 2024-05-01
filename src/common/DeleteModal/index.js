import Button from '@/components/Common/UI/Button';
import { Images } from '@/utils/imagePath';
import { Box, Dialog, Typography } from '@mui/material';
import Image from 'next/image';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '3.5rem',
    },
};

const DeleteModal = ({ setIsOpen, isOpen, handleDelete, message }) => {
    const handleModalClose = () => {
        setIsOpen(false);
    };
    return (
        <Dialog
            open={isOpen}
            onClose={handleModalClose}
            fullWidth={true}
            maxWidth={'sm'}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    width: '60rem',
                    p: 3,
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        height: 100,
                        width: 100,
                        marginBottom: 2,
                        position: 'relative',
                    }}
                >
                    <Image
                        alt="delete icon"
                        src={Images.DELETE_ICON}
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box>

                <Box sx={{ width: '85%' }}>
                    <Typography variant="h5">
                        Are you sure you want to delete {message}?
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        gap: '2rem',
                        marginTop: 3,
                    }}
                >
                    <Button
                        style={{
                            borderRadius: '0.5rem',
                            backgroundColor: '#f8f8f8',
                            border: 'none',
                            width: '100%',
                            borderRadius: '10rem',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                boxShadow: 'none',
                            },
                        }}
                        label="Cancel"
                        className="cancel_btn"
                        onClick={handleModalClose}
                    />
                    <Button
                        label="Delete"
                        style={{
                            color: '#ff4d4f',
                            width: '100%',
                            backgroundColor: 'rgba(255, 77, 79, 0.2)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 77, 79, 0.3)',
                                boxShadow: 'none',
                            },
                        }}
                        onClick={handleDelete}
                    />
                </Box>
            </Box>
        </Dialog>
    );
};

export default DeleteModal;
