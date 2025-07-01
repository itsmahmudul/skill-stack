import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import TitleManager from '../Route/TitleManager';

const RootLayout = () => {
    return (
        <>
            <TitleManager />
            <div className='bg-gray-100'>
                <Navbar />
                <div className='min-h-[calc(100vh-116px)]'>
                    <div>
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default RootLayout;
