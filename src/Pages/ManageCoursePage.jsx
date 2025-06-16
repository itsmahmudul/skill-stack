import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axiosInstance from "../Lib/axios";
import AuthContext from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import emptyAnimation from "../assets/emty.json";
import warningAnimation from "../assets/warning.json";

export default function MyCourses() {
    const { user, getJWTToken } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [deletingCourseId, setDeletingCourseId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const coursesPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [searchTerm, courses]);

    const fetchCourses = async () => {
        try {
            const token = await getJWTToken();
            const res = await axiosInstance.get(`/courses?user=${user?.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCourses(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load courses");
        } finally {
            setIsLoading(false);
        }
    };

    const filterCourses = () => {
        const filtered = courses.filter((course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCourses(filtered);
        setCurrentPage(1);
    };

    const handleDelete = async () => {
        try {
            const token = await getJWTToken();
            await axiosInstance.delete(`/courses/${deletingCourseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Course deleted");
            const updatedCourses = courses.filter((c) => c._id !== deletingCourseId);
            setCourses(updatedCourses);
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            toast.error("Deletion failed");
        }
    };

    const openModal = (id) => {
        setDeletingCourseId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDeletingCourseId(null);
    };

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    return (
        <div className="min-h-screen max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6 flex-col md:flex-row gap-4">
                <h2 className="text-2xl font-bold">My Courses</h2>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
                />
            </div>

            {/* Loading Animation */}
            {isLoading ? (
                <div className="flex justify-center items-center h-[300px]">
                    <Lottie animationData={loadingAnimation} style={{ height: 180 }} />
                </div>
            ) : filteredCourses.length === 0 ? (
                // Empty State Animation
                <div className="flex flex-col items-center justify-center py-10">
                    <Lottie animationData={emptyAnimation} style={{ height: 200 }} />
                    <p className="mt-4 text-gray-500 text-lg">No courses found.</p>
                </div>
            ) : (
                <>
                    {/* Table for desktop */}
                    <div className="hidden md:block overflow-x-auto rounded-xl shadow">
                        <table className="min-w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="px-6 py-4 border-b">Title</th>
                                    <th className="px-6 py-4 border-b">Short Description</th>
                                    <th className="px-6 py-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCourses.map((course) => (
                                    <tr key={course._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 border-b">{course.title}</td>
                                        <td className="px-6 py-4 border-b">
                                            {course.description.slice(0, 60)}...
                                        </td>
                                        <td className="px-6 py-4 border-b space-x-2">
                                            <button
                                                onClick={() => navigate(`/edit-course/${course._id}`)}
                                                className="bg-blue-600 text-white px-4 py-1 cursor-pointer rounded hover:bg-blue-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => openModal(course._id)}
                                                className="bg-red-600 text-white px-4 py-1 cursor-pointer rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card layout for mobile */}
                    <div className="md:hidden space-y-4">
                        {currentCourses.map((course) => (
                            <motion.div
                                key={course._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border rounded-lg p-4 shadow-sm bg-white"
                            >
                                <h3 className="text-lg font-semibold">{course.title}</h3>
                                <p className="text-sm text-gray-700 mb-2">
                                    {course.description.slice(0, 100)}...
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/edit-course/${course._id}`)}
                                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 w-full"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openModal(course._id)}
                                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 w-full"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-6 flex justify-center items-center space-x-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-gray-800 text-white" : ""
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <div className="flex flex-col items-center mb-4">
                                <Lottie animationData={warningAnimation} style={{ height: 80 }} />
                                <h3 className="text-lg font-semibold mt-2 text-center">
                                    Are you sure you want to delete this course?
                                </h3>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
