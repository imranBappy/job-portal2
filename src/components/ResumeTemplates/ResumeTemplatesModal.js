"use client"

import React, { useState } from 'react';
import { GET_ALL_BASE_TEMPLATE_LIST } from '../ResumeSection/graphql/query';
import CModal from '@/common/CModal';
import CarouselTemplate from '@/sections/Home/CarouselTemplate';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/system';
import CommonPagination from '@/common/DataTable/CommonPagination';



const ResumeTemplatesModal = ({
    open,
    onClose,
    onTemplateSelect
}) => {

    const [page, setPage] = useState(0);
    const perPage = 6;
    const { data, fetchMore } = useQuery(GET_ALL_BASE_TEMPLATE_LIST, {
        variables: {
            first: perPage,
            offset: page * perPage,
        }
    });
    let templateList = data?.baseTemplateList?.edges?.map((item) => item.node)




    return (
        <CModal
            maxWidth="lg"
            title="All Templates"
            onClose={onClose} open={open}
            style={{
                height: "93vh",
                position: "relative",
                width: "100%",
                overflowY: 'scroll',
                overflowX: 'hidden',
                // style scrollbar
                "&::-webkit-scrollbar": {
                    width: "0.5em",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#1C3E5E4D",
                    outline: "1px solid slategrey",
                    borderRadius: "100px",
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    // height: "75vh",
                    gap: '1rem',
                    paddingBottom: '3rem',
                }}
                alignItems={{
                    xs: 'center',
                    sm: 'center',
                    md: 'center',
                    lg: 'flex-start',
                }}

            >
                {templateList?.map((item) => (
                    <Box
                        key={`template_${item.id}`}
                        width={{
                            xs: '100%',
                            sm: '48%',
                            md: '32%',
                            lg: '32%',
                        }}
                    >
                        <CarouselTemplate
                            data={item}
                            onTemplateSelect={onTemplateSelect}
                            currentTemplate={''}
                            style={{
                                maxHeight: '530px',
                            }}
                        />
                    </Box>
                ))}
            </Box>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 50,
                    backgroundColor: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    minWidth: '250px',
                }}
                left={'calc(50% - 125px)'}
            >
                <CommonPagination
                    fetchMore={fetchMore}
                    pageSize={perPage}
                    totalCount={data?.baseTemplateList?.totalCount}
                    setPage={(page) => setPage(page - 1)}
                    page={page + 1}
                />
            </Box>


        </CModal >
    );
};

export default ResumeTemplatesModal;