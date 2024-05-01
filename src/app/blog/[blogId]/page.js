"use client"
import BlogDetails from '@/components/BlogDetails';
import { BLOG_DETAILS } from '@/graphql/news/newsQuery';
import { useQuery } from '@apollo/client';
import React from 'react';

const page = ({ params }) => {
    const { data } = useQuery(BLOG_DETAILS, {
        variables: {
            id: params?.blogId,
        },
    });

    const blog = data?.singlePost || {};

    return (
        <>
            <BlogDetails blog={blog} />
        </>
    );
};

export default page;