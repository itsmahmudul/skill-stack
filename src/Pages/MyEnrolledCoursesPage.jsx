import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import axiosInstance from "../Lib/axios";

const MyEnrolledCourses = () => {
    const { user, getJWTToken } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <p className="text-center mt-10 text-gray-600 animate-pulse">
                Loading your enrollments...
            </p>
        );
    }

    return (
        <div className="max-w-6xl min-h-screen mx-auto p-4 mt-8">
            <h1 className="text-3xl font-bold mb-6 text-center">My Enrolled Courses</h1>

            {enrollments.length === 0 ? (
                <motion.p
                    className="text-center text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    You haven't enrolled in any courses yet.
                </motion.p>
            ) : (
                <div className="overflow-x-auto">
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
                                                className="px-4 cursor-pointer py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
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
            )}
        </div>
    );
};

export default MyEnrolledCourses;
