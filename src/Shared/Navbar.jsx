import React, { useContext, useState } from 'react';
import { Menu, X } from "lucide-react";
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import AuthContext from '../Context/AuthContext';

const mobileMenuVariants = {
    hidden: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.25, ease: "easeInOut" },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.25, ease: "easeInOut" },
    },
};

const Navbar = () => {
    const { logOutUser, user } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                toast.success('Logged out successfully!');
            })
            .catch(error => {
                toast.error('Logout failed. Please try again.');
                console.log(error);
            });
    };

    const activeClass = "text-blue-600 border-b-2 border-blue-600";
    const inactiveClass = "text-gray-700 hover:text-blue-600 transition-colors duration-300";

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center space-x-3 cursor-pointer">
                        <Link to="/" className="flex items-center space-x-2">
                            <img
                                className="h-10 w-auto rounded-lg shadow-md transform transition-transform duration-300 hover:scale-110"
                                src="https://i.ibb.co/DSVbBJ2/images.png"
                                alt="SkillStack Logo"
                            />
                            <span className="text-2xl font-extrabold text-blue-700 tracking-wide select-none">
                                SkillStack
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-12 mx-auto font-semibold text-lg">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? activeClass : inactiveClass}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/courses"
                            className={({ isActive }) => isActive ? activeClass : inactiveClass}
                        >
                            Courses
                        </NavLink>
                        <NavLink
                            to="/add-course"
                            className={({ isActive }) => isActive ? activeClass : inactiveClass}
                        >
                            Add Course
                        </NavLink>
                    </div>

                    {/* Auth Buttons (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user && (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2 overflow-hidden"
                                >
                                    <img
                                        src={user.photoURL}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </motion.div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogOut}
                                    className="cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-blue-700 hover:bg-blue-600 text-white transition-all ease-out duration-300"
                                >
                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                    <span className="relative">Log Out</span>
                                </motion.button>
                            </>
                        )}

                        {!user && (
                            <>
                                <NavLink
                                    to="/login"
                                    className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-500 transition duration-300"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="px-5 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            className="p-2 cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            {isOpen ? <X className="h-6 w-6 text-blue-600" /> : <Menu className="h-6 w-6 text-blue-600" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with Framer Motion */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={mobileMenuVariants}
                        className="md:hidden bg-white shadow-lg rounded-b-lg px-6 py-5 space-y-4"
                    >
                        <NavLink
                            to="/"
                            className="block text-gray-700 font-semibold hover:text-blue-600 transition"
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/courses"
                            className="block text-gray-700 font-semibold hover:text-blue-600 transition"
                            onClick={closeMenu}
                        >
                            Courses
                        </NavLink>
                        <NavLink
                            to="/add-course"
                            className="block text-gray-700 font-semibold hover:text-blue-600 transition"
                            onClick={closeMenu}
                        >
                            Add Course
                        </NavLink>
                        <hr className="border-gray-300" />

                        {user ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    handleLogOut();
                                    closeMenu();
                                }}
                                className="w-full text-center cursor-pointer relative rounded px-5 py-2.5 overflow-hidden group bg-blue-700 hover:bg-blue-600 text-white transition-all ease-out duration-300"
                            >
                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                <span className="relative">Log Out</span>
                            </motion.button>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="block w-full text-center text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full font-semibold shadow-md hover:from-indigo-600 hover:to-blue-500 transition"
                                    onClick={closeMenu}
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="block w-full text-center border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition"
                                    onClick={closeMenu}
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
