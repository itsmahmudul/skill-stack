import React, { useContext, useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

const profileMenuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
};

const Navbar = () => {
  const { logOutUser, user, loading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error("Logout failed. Please try again.");
        console.log(error);
      });
  };

  const activeClass = `relative font-semibold after:absolute after:-bottom-1 after:left-0
    after:h-[2.5px] after:w-full after:rounded-lg after:bg-gradient-to-r after:from-blue-400
    after:to-indigo-600 after:transition-all after:duration-300 ${
      scrolled ? "text-blue-600" : "text-blue-700"
    } transition-colors duration-500 ease-in-out`;

  const inactiveClass = `font-semibold transition-colors duration-500 ease-in-out ${
    scrolled ? "text-gray-700 hover:text-blue-600" : "text-gray-700 hover:text-blue-600"
  }`;

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-500 ease-in-out bg-white/40 backdrop-blur-md border-gray-200 shadow-md`}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer space-x-3">
            <Link to="/" className="flex items-center space-x-2 select-none">
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-10 w-auto rounded-lg shadow-md"
                src="https://i.ibb.co/DSVbBJ2/images.png"
                alt="SkillStack Logo"
              />
              <span className="text-3xl font-extrabold tracking-wide text-blue-700">
                SkillStack
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-14 mx-auto text-lg">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Home</NavLink>
            <NavLink to="/courses" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Courses</NavLink>
            <NavLink to="/add-course" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Add Course</NavLink>
            {!loading && user && (
              <>
                <NavLink to="/manageCourses" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Manage Courses</NavLink>
                <NavLink to="/my-enrolled-courses" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>My Enrolled Courses</NavLink>
              </>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-2">
            {!loading && (
              user ? (
                <div className="relative" ref={profileRef}>
                  {/* Profile Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="w-11 h-11 rounded-full ring-2 ring-blue-500 overflow-hidden cursor-pointer"
                    title={user.displayName || "User"}
                  >
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </motion.div>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={profileMenuVariants}
                        className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                      >
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            handleLogOut();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <NavLink to="/login" className="px-6 py-2 rounded-full font-semibold shadow-lg transition duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-700">Login</NavLink>
                  <NavLink to="/register" className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-300">Register</NavLink>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-blue-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="lg:hidden rounded-b-lg px-6 py-6 space-y-5 border-t bg-white/90 backdrop-blur-lg border-gray-300"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {!loading && user && (
              <div className="flex items-center space-x-4 mb-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full ring-2 ring-blue-500 overflow-hidden cursor-pointer"
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </motion.div>
                <span className="font-semibold text-gray-800">{user.displayName || "User"}</span>
              </div>
            )}

            <NavLink to="/" onClick={closeMenu} className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">Home</NavLink>
            <NavLink to="/courses" onClick={closeMenu} className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">Courses</NavLink>
            <NavLink to="/add-course" onClick={closeMenu} className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">Add Course</NavLink>
            {!loading && user && (
              <>
                <NavLink to="/manageCourses" onClick={closeMenu} className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">Manage Courses</NavLink>
                <NavLink to="/my-enrolled-courses" onClick={closeMenu} className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">My Enrolled Courses</NavLink>
                <NavLink to="/dashboard" onClick={closeMenu} className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">Dashboard</NavLink>
              </>
            )}
            <hr className="border-gray-300" />
            {!loading && (
              user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleLogOut();
                    closeMenu();
                  }}
                  className="w-full text-center cursor-pointer relative rounded-lg px-6 py-3 overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-700 transition duration-300"
                >
                  <span className="absolute right-0 w-10 h-36 -mt-16 transition-all duration-1000 transform translate-x-14 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease-in-out"></span>
                  <span className="relative">Log Out</span>
                </motion.button>
              ) : (
                <>
                  <NavLink to="/login" onClick={closeMenu} className="block w-full text-center text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 rounded-full font-semibold shadow-md hover:from-indigo-600 hover:to-blue-700 transition duration-300">Login</NavLink>
                  <NavLink to="/register" onClick={closeMenu} className="block w-full text-center border-2 border-blue-600 text-blue-600 px-5 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition duration-300">Register</NavLink>
                </>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
