'use client';
import { resumeResources } from '@/app/faq/page';
import Accordion from '@/components/Common/UI/Accordion';
// ResumeResources
import * as React from 'react';

export default function ResumeResources() {
    return (
        <div>
            {resumeResources.map((question) => (
                <Accordion
                    key={question.id}
                    title={question.title}
                    body={question.body}
                />
            ))}
        </div>
    );
}
