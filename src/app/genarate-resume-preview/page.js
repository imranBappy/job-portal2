"use client";

import ResumePreviewComponent from '@/components/ResumePreview';
import React from 'react';
import { useSearchParams } from 'next/navigation'

const GenerateResumePreview = () => {
    const query = useSearchParams();
    console.log(query.get("token"))
    return (<ResumePreviewComponent />)
};

export default GenerateResumePreview;