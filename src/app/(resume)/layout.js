import LayoutProvider from '@/components/Layout/LayoutProvider';
import React from 'react';

const layout = ({
    children
}) => {
    return (
        <LayoutProvider>
            {children}
        </LayoutProvider>
    );
};

export default layout;