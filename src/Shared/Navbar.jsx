import React, { useContext, useState, useEffect } from "react";
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

const Navbar = () => {
  const { logOutUser, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    after:to-indigo-600 after:transition-all after:duration-300 ${scrolled ? "text-blue-600" : "text-blue-700"
    } transition-colors duration-500 ease-in-out`;

  const inactiveClass = `font-semibold transition-colors duration-500 ease-in-out ${scrolled ? "text-gray-700 hover:text-blue-600" : "text-gray-700 hover:text-blue-600"
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
            <Link
              to="/"
              className="flex items-center space-x-2 select-none"
              aria-label="SkillStack Home"
            >
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
          <div className="hidden md:flex space-x-14 mx-auto text-lg">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              Home
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Courses
            </NavLink>
            <NavLink
              to="/add-course"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Add Course
            </NavLink>
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.15, boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)" }}
                  className="w-11 h-11 rounded-full ring-2 ring-blue-500 overflow-hidden cursor-pointer"
                  title={user.displayName || "User"}
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogOut}
                  className="relative cursor-pointer rounded-lg px-6 py-2.5 overflow-hidden group font-semibold shadow-lg transition duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-700"
                >
                  <span className="absolute right-0 w-10 h-36 -mt-16 transition-all duration-1000 transform translate-x-14 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease-in-out"></span>
                  <span className="relative">Log Out</span>
                </motion.button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-6 py-2 rounded-full font-semibold shadow-lg transition duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-700"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
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
            className="md:hidden rounded-b-lg px-6 py-6 space-y-5 border-t bg-white/90 backdrop-blur-lg border-gray-300"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {/* User Avatar and Name */}
            {user && (
              <div className="flex items-center space-x-4 mb-2">
                <motion.div
                  whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)" }}
                  className="w-12 h-12 rounded-full ring-2 ring-blue-500 overflow-hidden cursor-pointer"
                  title={user.displayName || "User"}
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

            <NavLink
              to="/"
              className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300"
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/courses"
              className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300"
              onClick={closeMenu}
            >
              Courses
            </NavLink>
            <NavLink
              to="/add-course"
              className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300"
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
                className="w-full text-center cursor-pointer relative rounded-lg px-6 py-3 overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-700 transition duration-300"
              >
                <span className="absolute right-0 w-10 h-36 -mt-16 transition-all duration-1000 transform translate-x-14 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease-in-out"></span>
                <span className="relative">Log Out</span>
              </motion.button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block w-full text-center text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 rounded-full font-semibold shadow-md hover:from-indigo-600 hover:to-blue-700 transition duration-300"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block w-full text-center border-2 border-blue-600 text-blue-600 px-5 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
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
