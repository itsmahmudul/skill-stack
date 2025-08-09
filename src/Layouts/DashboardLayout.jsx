import React from "react";
import { Outlet, NavLink } from "react-router";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 p-5 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <nav className="space-y-3">
                    <NavLink to="/dashboard" end className="block text-gray-700 hover:text-blue-600">Overview</NavLink>
                    <NavLink to="/dashboard/profile" className="block text-gray-700 hover:text-blue-600">Profile</NavLink>
                    <NavLink to="/" className="block text-gray-700 hover:text-blue-600">Back to Home</NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
