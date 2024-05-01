

import CircularLoader from '@/components/Loader/CircularLoader';
import { Box } from '@mui/material';

const Loading = () => {

    return (
        <Box sx={{ flex: 1, height: '95vh', width: '100%' }}>
            <CircularLoader />
        </Box>
    )
};

export default Loading;
