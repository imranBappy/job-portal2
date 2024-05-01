"use client"

import FilterLayout from '@/components/Layout/FilterLayout';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { COMPANY_LIST_QUERY } from '@/graphql/company/companyQuery';
import CompanyFilter from '@/app/(filter)/jobs/[id]/components/CompanyFilter';
import GridCard from '../Common/card/Companies/GridCard';
import ColumnCard from '../Common/card/Companies/ColumnCard';
import ComanayHeader from './ComanayHeader';
import handleContent from '@/utils/handleContent';
import { Box, Pagination, Stack } from '@mui/material';


const Company = () => {
    // layout
    const [layout, setLayout] = useState('grid');


    // filter
    const [openFilter, setOpenFilter] = useState(false)

    // pagination
    const PER_PAGE = 12;
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);


    // all filtering state
    const [custom, setCustom] = useState("")
    const [categories, setCategories] = useState([]);
    const [location, setLocation] = useState(null)



    const { data, loading, error, refetch } = useQuery(COMPANY_LIST_QUERY, {
        variables: {
            first: PER_PAGE,
            offset: page,
            name: custom,
            countryNames: location ? location : null,
            industryNames: categories
        }
    })
    const companies = data?.companyList?.edges || [];



    const handleOpenFilter = () => {
        setOpenFilter((pre) => !pre);
    };



    const handleSearch = (value) => {
        setCustom(value)

        refetch({
            variables: {
                first: PER_PAGE,
                offset: page,
                name: value,
                countryNames: location ? location : null,
                industryNames: categories
            }
        })
    }

    const changePage = (value) => {
        setPage((value - 1) * PER_PAGE);
    };

    useEffect(() => {
        refetch({
            variables: {
                first: PER_PAGE,
                offset: page,
                name: custom,
                countryNames: location ? location : null,
                industryNames: categories
            }
        }).then((res) => {
            setTotal(Math.ceil(res?.data?.companyList?.totalCount / PER_PAGE));
        })
    }, [page, refetch, custom, location, categories])


    useEffect(() => {
        if (data?.companyList?.totalCount) {
            setTotal(Math.ceil(data?.companyList?.totalCount / PER_PAGE));
        }
    }, [data?.companyList?.totalCount]);



    console.log({ data });

    let content = null;
    switch (layout) {
        case 'grid':
            content = companies.map((company) => <GridCard key={company?.id} data={company.node} />);
            break;
        default:
            content = companies.map((company) => <ColumnCard key={company?.id} data={company.node} />);
    }

    return (
        <FilterLayout
            header={<ComanayHeader
                locationState={[location, setLocation]}
                handleSearch={handleSearch}
                title1={'Explore jobs by'}
                title2={'best companies'}
                subtitle={'We ensure your next step is a step forward. Here’s an overview of technology best companies that you will love to browse.'}
            />}
            paginationState={{
                PER_PAGE,
                totalState: [total, setTotal],
                pageState: [page, setPage],
            }}
            filterContainer={<CompanyFilter
                companyCategoryState={[categories, setCategories]}
                handleOpenFilter={handleOpenFilter} />}

            filterBar={{
                title: 'All Company',
                subtitle: `Showing ${data?.companyList?.edges?.length || 0} results`,
                setLayout: setLayout,
                shortIsShow: false
            }}
            totalCount={data?.companyList?.totalCount}

            filterOpenState={[openFilter, setOpenFilter]}
        ><>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '15px',
                    }}

                    justifyContent={{
                        xs: 'center',
                        sm: 'center',
                        md: 'center',
                        lg: 'flex-start',
                        xl: 'flex-start',
                    }}
                >
                    {
                        handleContent(
                            content,
                            loading,
                            error
                        )
                    }
                </Box>
                {
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '50px 0',
                        }}
                    >
                        <Stack spacing={2}>
                            <Pagination
                                color="primary"
                                count={total}
                                shape="rounded"
                                defaultPage={1}
                                onChange={(e, value) => changePage(value)}
                            />
                        </Stack>
                    </Box>
                }
            </>
        </FilterLayout>
    );
};

export default Company;