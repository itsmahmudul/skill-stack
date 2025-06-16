import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import axiosInstance from "../Lib/axios";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import emptyAnimation from "../assets/emty.json";
import warningAnimation from "../assets/warning.json";

const MyEnrolledCourses = () => {
    const { user, getJWTToken } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchEnrollments = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                const token = await getJWTToken();
                const res = await axiosInstance.get(`/my-enrollments?email=${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEnrollments(res.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load enrollments");
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [user, getJWTToken]);

    const handleRemove = async (enrollmentId) => {
        if (!window.confirm("Are you sure you want to remove this enrollment?")) return;

        try {
            const token = await getJWTToken();
            await axiosInstance.delete(`/enrollments/${enrollmentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Enrollment removed successfully");
            setEnrollments((prev) => prev.filter((enroll) => enroll._id !== enrollmentId));
        } catch (err) {
            console.error(err);
            toast.error("Failed to remove enrollment");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Lottie animationData={loadingAnimation} style={{ width: 200, height: 200 }} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh] text-center text-red-500">
                <Lottie animationData={warningAnimation} style={{ width: 200, height: 200 }} />
                <p className="mt-4 text-lg font-semibold">Something went wrong. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl min-h-screen mx-auto p-4 mt-8">
            <h1 className="text-3xl font-bold mb-6 text-center">My Enrolled Courses</h1>

            {enrollments.length === 0 ? (
                <div className="flex flex-col justify-center items-center text-gray-600">
                    <Lottie animationData={emptyAnimation} style={{ width: 250, height: 250 }} />
                    <motion.p
                        className="text-center text-gray-600 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        You haven't enrolled in any courses yet.
                    </motion.p>
                </div>
            ) : (
                <>
                    {/* Table for medium and larger screens */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left">Course Title</th>
                                    <th className="py-3 px-4 text-left">Instructor</th>
                                    <th className="py-3 px-4 text-left">Price</th>
                                    <th className="py-3 px-4 text-left">Enrolled At</th>
                                    <th className="py-3 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((enroll) => {
                                    const course = enroll.course;
                                    return (
                                        <motion.tr
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            key={enroll._id}
                                            className="border-t hover:bg-gray-100"
                                        >
                                            <td className="py-3 px-4">
                                                {course?.title || (
                                                    <span className="text-gray-400 italic">[Deleted]</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                {course?.instructor || (
                                                    <span className="text-gray-400">{user.displayName}</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                ৳{course?.price?.toFixed(2) || "0.00"}
                                            </td>
                                            <td className="py-3 px-4">
                                                {new Date(enroll.enrolledAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleRemove(enroll._id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                                >
                                                    Remove
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Card layout for small screens */}
                    <div className="md:hidden space-y-4">
                        {enrollments.map((enroll) => {
                            const course = enroll.course;
                            return (
                                <motion.div
                                    key={enroll._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border rounded-lg p-4 shadow-md bg-white"
                                >
                                    <h2 className="text-lg font-semibold mb-1">
                                        {course?.title || (
                                            <span className="text-gray-400 italic">[Deleted]</span>
                                        )}
                                    </h2>
                                    <p className="text-sm text-gray-700">
                                        <strong>Instructor:</strong>{" "}
                                        {course?.instructor || user.displayName}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Price:</strong> ৳{course?.price?.toFixed(2) || "0.00"}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Enrolled At:</strong>{" "}
                                        {new Date(enroll.enrolledAt).toLocaleDateString()}
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleRemove(enroll._id)}
                                        className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                    >
                                        Remove
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyEnrolledCourses;
