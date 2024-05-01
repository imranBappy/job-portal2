import React, { useState } from 'react';

// ----- Material UI Provider -----
import {
    Box,
    LinearProgress,
    MenuItem,
    Pagination,
    Select,
    Typography,
    styled,
} from '@mui/material';
import {
    DataGrid,
} from '@mui/x-data-grid';
import { getPaginationPageCount } from '@/utils';

const customOverrides = {
    MuiDataGrid: {
        root: {
            border: 'none',
        },
    },
};


const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));




const DataTable = ({
    rows,
    rowHeight,
    columns,
    loading,
    totalCount,
    pgSize,
    style,
    autoHeight,
    rowId,
    handlePagination,
    filter,
    hideColumns,
    hidePagination,
    fetchMore,
    isLocalSort,
}) => {
    // ----- States -----

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // function CustomToolbar() {
    //     return (
    //         <GridToolbarContainer>
    //             <GridToolbarColumnsButton />
    //             <GridToolbarExport />
    //         </GridToolbarContainer>
    //     );
    // }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchMore({
            variables: {
                first: pageSize,
                offset: (newPage - 1) * pageSize,
            },
        });
    };

    const handleChangeRowsPerPage = (event) => {
        let size = parseInt(event.target.value, 10);
        setPageSize(size);
        setPage(0);
        fetchMore({
            variables: {
                first: size,
            },
        });
    };

    // ----- Sorting Function -----
    const handleSortModelChange = React.useCallback((sortModel) => {
        if (isLocalSort) return;
        let sortingQuery = sortModel[0];
        if (sortingQuery) {
            let sortField = `${sortingQuery.sort === 'asc' ? '' : '-'}${sortingQuery.field
                }`;
            fetchMore({
                variables: {
                    orderBy: sortField,
                },
            });
        }
    }, []);

    return (
        <Box
            sx={{
                height: 'auto',
                width: '100%',
                position: 'relative',
                ...style,
            }}
        >
            <DataGrid
                getRowId={(row) => (row[rowId] ? row[rowId] : row.id)}
                sortingMode="server"
                onSortModelChange={handleSortModelChange}
                disableSelectionOnClick
                columns={columns}
                autoHeight={autoHeight ?? true}
                rows={rows}
                rowHeight={rowHeight ? rowHeight : 60}
                slots={{
                    loadingOverlay: LinearProgress,
                    columnMenu: 'none',
                    columnMenuIcon: 'none',


                }}
                loading={loading}
                pagination
                rowSelection={false}
                paginationMode="server"
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            ...hideColumns,
                        },
                    },
                }}
                rowCount={totalCount ? totalCount : 0}
                // density="compact"
                hideFooterPagination
                hideFooter={hidePagination}
                sx={{
                    bgcolor: 'white',
                    // borderRadius: '10px',
                    overflow: 'hidden',
                    p: 1,
                    padding: 0,
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontSize: '16px',
                        color: 'text.secondary',
                    },
                }}

            />
            {/* {!hidePagination ? (
            ) : null} */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                    alignItems: 'center',
                }}
            >
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Typography variant="bodyNormal" color="text.secondary">
                        View
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={pageSize}
                        onChange={handleChangeRowsPerPage}
                        size="small"
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>

                    <Typography variant="bodyNormal" color="text.secondary">
                        Per Page
                    </Typography>
                </Box>
                <Pagination
                    color="primary"
                    count={getPaginationPageCount(totalCount, pageSize)}
                    shape="rounded"
                    page={page}
                    onChange={handleChangePage}
                />
                {/* <TablePagination
                    component="div"
                    count={totalCount ? totalCount : 0}
                    page={page}
                    rowsPerPage={pageSize}
                    rowsPerPageOptions={[25, 100, 500, 1000]}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            </Box>
        </Box>
    );
};

export default DataTable;
