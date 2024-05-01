import { getPaginationPageCount } from '@/utils';
import { Box, Pagination } from '@mui/material';

const CommonPagination = ({ fetchMore, pageSize, totalCount, setPage, page }) => {

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchMore({
            variables: {
                first: pageSize,
                offset: (newPage - 1) * pageSize,
            },
        })

    };


    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Pagination
                color="primary"
                count={getPaginationPageCount(totalCount, pageSize)}
                shape="rounded"
                page={page}
                onChange={handleChangePage}
            />
        </Box>
    );
};

export default CommonPagination;
