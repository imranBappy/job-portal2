"use client"

import React from 'react'
import JobPostDetail from '@/components/companyProfile/JobPostDetail'
import { usePathname } from 'next/navigation'

const JobDetail = () => {
    const pathname = usePathname()

    return (
        <JobPostDetail id={pathname.split('/')[pathname.split('/').length - 1]} />
    )
}

export default JobDetail