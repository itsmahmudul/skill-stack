import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Banner from "./HomeThings/Banner";
import CourseBox from "./HomeThings/CourseBox";

const Home = () => {
    const coursesData = useLoaderData();
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <div>
            {/* Banner */}
            <div>
                <Banner />
            </div>

            {/* Course Section */}
            <section className="bg-gray-50 mt-28 py-10">
                <motion.div
                    ref={ref}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={controls}
                    className="max-w-7xl mx-auto px-4 text-center"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                        Explore Our Courses
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-8">
                        Choose from a wide range of expert-led courses to level up your skills in marketing, SEO, and digital strategy.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
                    {coursesData.map((courseData) => (
                        <CourseBox key={courseData._id} courseData={courseData} />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/courses"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            View More Courses
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
