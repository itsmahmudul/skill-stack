import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import AuthContext from '../Context/AuthContext';
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const PrivetRouts = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Lottie animationData={loadingAnimation} style={{ width: 200, height: 200 }} />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={location.pathname} />;
    }

    return children;
};

export default PrivetRouts;
