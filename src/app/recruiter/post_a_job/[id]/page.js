"use client"

import React from 'react'
import PostAJob from '@/components/companyProfile/PostAJob'
import { usePathname } from 'next/navigation'

const UpdateJobPost = () => {
    const pathname = usePathname()

    return (
        <PostAJob updateId={pathname.split('/')[pathname.split('/').length - 1]} />
    )
}

export default UpdateJobPost