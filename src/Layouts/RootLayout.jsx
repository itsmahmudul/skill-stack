import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import TitleManager from '../Route/TitleManager';

const RootLayout = () => {
    return (
        <>
            <TitleManager /> {/* ⬅️ Add here */}
            <div>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default RootLayout;
