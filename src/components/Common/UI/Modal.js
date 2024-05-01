import React from 'react';

import MuiModel from '@mui/material/Modal';
import { Box, Button } from '@mui/material';
import { Clear } from '@mui/icons-material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,

};
const Modal = (props) => {
    return (
        <MuiModel
            // style={{
            //     minHeight: '    ',
            // }}
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>

                <Box sx={{
                    ...style, ...props.style,


                }}>
                    <Box
                        display={'flex'}
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                        mb={2}
                    >
                        <Button
                            sx={{
                                minWidth: 0,
                                p: 0,
                                m: 0,
                            }}
                            onClick={props.onClose}
                        >
                            <Clear style={{
                                fontSize: 30,
                                color: '#000',
                            }} onClick={props.onClose} />
                        </Button>

                    </Box>

                    {props.children}</Box>
            </>

        </MuiModel>
    );
};

export default Modal;
