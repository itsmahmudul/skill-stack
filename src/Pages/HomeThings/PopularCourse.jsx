import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import CourseBox from "./CourseBox";
import Lottie from "lottie-react";
import trophy from "../../assets/trophy.json";

const PopularCourse = () => {
    const [popularCourses, setPopularCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://skill-stack-server.vercel.app/popular-courses")
            .then((res) => {
                setPopularCourses(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch popular courses:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 text-gray-600 font-medium">
                Loading popular courses...
            </div>
        );
    }

    return (
        <section className="relative bg-gray-100 py-20 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>

            <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="w-32 mx-auto mb-6"
                >
                    <Lottie animationData={trophy} className="h-40 w-40" loop={true} />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-extrabold text-gray-800 mb-4"
                >
                    Most Popular Courses
                </motion.h2>

                <p className="text-gray-600 text-base max-w-2xl mx-auto mb-12">
                    🚀 These are the top-enrolled courses in our entire platform. Learn what others love the most!
                </p>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {popularCourses.slice(0, 3).map((course) => (
                        <motion.div
                            key={course._id}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <CourseBox courseData={course} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PopularCourse;
