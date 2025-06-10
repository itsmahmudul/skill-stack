import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <>
            <Outlet></Outlet>
        </>
    );
};

export default RootLayout;