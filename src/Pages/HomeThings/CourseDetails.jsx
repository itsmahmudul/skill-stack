import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router";
import Lottie from "lottie-react";
import successAnimation from "../../assets/success.json";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axiosInstance from "../../Lib/axios";
import AuthContext from "../../Context/AuthContext";
import { Star, ArrowLeft } from "lucide-react";

// Framer Motion variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CourseDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axiosInstance.get(`/courses/${id}`);
                setCourse(res.data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load course");
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    useEffect(() => {
        const checkEnrollment = async () => {
            if (!user) return;
            try {
                const res = await axiosInstance.get(`/enrollments?email=${user.email}&courseId=${id}`);
                if (res.data?.enrolled) setIsEnrolled(true);
            } catch (error) {
                console.log(error);
                console.error("Enrollment check failed");
            }
        };
        checkEnrollment();
    }, [user, id]);

    const handleEnroll = async () => {
        if (!user) return;

        if (course.seatsLeft === 0) {
            toast.error("Course is full. No seats left.");
            return;
        }

        try {
            await axiosInstance.post("/enrollments", {
                email: user.email,
                courseId: id,
            });
            toast.success("Successfully Enrolled!");
            setIsEnrolled(true);

            setCourse(prev => ({
                ...prev,
                seatsLeft: prev.seatsLeft - 1
            }));

            // Show success animation
            setShowAnimation(true);
            setTimeout(() => setShowAnimation(false), 3000);
        } catch (error) {
            console.log(error);
            toast.error("Enrollment failed or already enrolled.");
        }
    };

    if (loading) return <div className="text-center py-20 text-lg font-semibold animate-pulse">Loading...</div>;
    if (!course) return <div className="text-center py-20 text-red-500 text-lg">Course not found</div>;

    const requirementsList = course.requirements?.split(/[,•\n]+|\s{2,}/).map(item => item.trim()).filter(Boolean);
    const learningsList = course.learnings?.split(/[,•\n]+|\s{2,}/).map(item => item.trim()).filter(Boolean);

    return (
        <motion.div
            className="max-w-6xl mx-auto px-6 py-10 my-20 bg-gradient-to-br from-white via-gray-50 to-white shadow-xl rounded-3xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
        >
            {/* Back Button */}
            <motion.div whileHover={{ scale: 1.05 }} className="mb-8 inline-block">
                <Link
                    to="/courses"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full shadow-sm transition-all"
                >
                    <ArrowLeft size={18} /> Back to Courses
                </Link>
            </motion.div>

            {/* Course Image */}
            <motion.img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-72 object-cover rounded-2xl shadow-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            />

            {/* Title + Rating */}
            <motion.h1 className="text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">
                {course.title}
            </motion.h1>

            {course.rating && (
                <motion.div className="flex items-center gap-1 mb-4 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.2 }}>
                            <Star
                                size={22}
                                fill={i < Math.round(course.rating) ? "#facc15" : "none"}
                                stroke="#facc15"
                            />
                        </motion.div>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                        {course.rating.toFixed(1)} ({course.totalReviews || 0} reviews)
                    </span>
                </motion.div>
            )}

            {/* Description */}
            <p className="text-gray-700 text-base leading-relaxed mb-6">
                {course.description}
            </p>

            {/* Course Info */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-8">
                <p><strong>⏳ Duration:</strong> {course.duration}</p>
                <p><strong>📚 Category:</strong> {course.category}</p>
                <p><strong>📈 Level:</strong> {course.level}</p>
                <p><strong>💰 Price:</strong> ৳{course.price}</p>
                <p><strong>👨‍🏫 Instructor:</strong> {course.creatorName}</p>
                <p><strong>📅 Date:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Requirements */}
            {requirementsList.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">📌 Requirements</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        {requirementsList.map((req, index) => (
                            <motion.li key={index} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.05 }}>
                                {req}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            )}

            {/* What You'll Learn */}
            {learningsList.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">🎯 What You'll Learn</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                        {learningsList.map((learn, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-100 p-3 rounded-xl shadow-sm"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {learn}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Seats Progress */}
            {typeof course.seatsLeft === "number" && typeof course.totalSeats === "number" && (
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 font-medium mb-1">
                        <span>
                            Seats Filled: {course.totalSeats - course.seatsLeft}/{course.totalSeats}
                        </span>
                        <span>
                            {course.seatsLeft > 0 ? (
                                <span className="text-green-600">{course.seatsLeft} seats left</span>
                            ) : (
                                <span className="text-red-500">🚫 No seats left</span>
                            )}
                        </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                            className={`h-full ${course.seatsLeft > 0 ? "bg-green-500" : "bg-red-500"}`}
                            style={{
                                width: `${((course.totalSeats - course.seatsLeft) / course.totalSeats) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Enroll Button */}
            {user ? (
                <motion.button
                    onClick={handleEnroll}
                    disabled={isEnrolled || course.seatsLeft === 0}
                    whileHover={{ scale: isEnrolled ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full cursor-pointer py-3 text-lg rounded-xl font-semibold transition-all duration-300 shadow-md tracking-wide
                    ${isEnrolled || course.seatsLeft === 0
                            ? "bg-green-500 text-white cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white animate-pulse"
                        }`}
                >
                    {isEnrolled
                        ? "🎉 Enrolled"
                        : course.seatsLeft === 0
                            ? "🚫 Full - No Seats"
                            : "🚀 Enroll Now"}
                </motion.button>
            ) : (
                <div className="text-center text-red-500 font-medium text-sm mt-6">
                    🔒 Please log in to enroll in this course.
                </div>
            )}

            {/* Reviews */}
            {course.reviews?.length > 0 && (
                <motion.div className="mt-12" initial="hidden" animate="visible" variants={fadeInUp}>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">💬 Student Reviews</h2>
                    <div className="space-y-4">
                        {course.reviews.slice(0, 3).map((review, index) => (
                            <motion.div
                                key={index}
                                className="bg-white border p-4 rounded-xl shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <p className="text-gray-700 italic">“{review.comment}”</p>
                                <div className="mt-2 text-sm text-gray-500">— {review.name}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ✅ Lottie Animation Overlay */}
            {showAnimation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <Lottie
                        animationData={successAnimation}
                        style={{ width: 250, height: 250 }}
                        loop={false}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default CourseDetails;
