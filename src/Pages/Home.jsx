import React, { useEffect } from "react";
import { Link, useLoaderData } from "react-router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Lottie from "lottie-react";
import education from "../assets/education.json";
import feedback from "../assets/feedback.json";

import Banner from "./HomeThings/Banner";
import CourseBox from "./HomeThings/CourseBox";
import PopularCourse from "./HomeThings/PopularCourse";

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
                    <div className="flex justify-center items-center gap-3 mb-3">
                        <Lottie animationData={education} className="h-16 w-16" loop={true} />
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                            Explore Our Courses
                        </h1>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-8">
                        Choose from a wide range of expert-led courses to level up your skills in marketing, SEO, and digital strategy.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
                    {coursesData.slice(0, 6).map((courseData) => (
                        <CourseBox key={courseData._id} courseData={courseData} />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/courses"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out"
                        >
                            View More Courses
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* students opinion */}
            <section className="bg-gradient-to-b from-white to-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="flex justify-center mb-6">
                        <Lottie animationData={feedback} className="h-40 w-40" loop={true} />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
                        What Our Students Say
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            {
                                name: "Ariana",
                                review: "This platform helped me get my first job in digital marketing!",
                                avatar: "https://i.pravatar.cc/150?img=47",
                            },
                            {
                                name: "Rahim",
                                review: "The courses are well-structured and very practical.",
                                avatar: "https://i.pravatar.cc/150?img=56",
                            },
                            {
                                name: "Ariful",
                                review: "Highly recommend for anyone looking to learn SEO and analytics.",
                                avatar: "https://i.pravatar.cc/150?img=52",
                            },
                        ].map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                            >
                                <div className="flex flex-col items-center">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full mb-4 border-2 border-indigo-500"
                                    />
                                    <p className="text-gray-700 text-base italic mb-4">"{testimonial.review}"</p>
                                    <p className="text-indigo-600 font-semibold text-sm">— {testimonial.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Popular Courses Section */}
            <section>
                <PopularCourse></PopularCourse>
            </section>

            {/* our services */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">Our Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Expert-Led Courses",
                                description: "Learn from industry professionals with years of hands-on experience.",
                                icon: "🎓",
                            },
                            {
                                title: "Career Guidance",
                                description: "Get personalized mentorship and support to kickstart your career.",
                                icon: "💼",
                            },
                            {
                                title: "Certification",
                                description: "Earn globally recognized certificates to boost your resume.",
                                icon: "📜",
                            },
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                            >
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-sm">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-20 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Find answers to common questions about our courses, certifications, and platform features.
                        </p>
                    </div>
                    <div className="space-y-6">
                        {[
                            {
                                question: "Are the courses beginner-friendly?",
                                answer: "Yes! We offer courses for all levels, including complete beginners. Each course clearly states the required experience level.",
                            },
                            {
                                question: "Do I get a certificate after completing a course?",
                                answer: "Absolutely. All our courses come with industry-recognized certificates upon completion.",
                            },
                            {
                                question: "How long will I have access to the course?",
                                answer: "Once enrolled, you’ll have lifetime access to the course materials, including future updates.",
                            },
                            {
                                question: "Can I learn at my own pace?",
                                answer: "Yes, our courses are self-paced, allowing you to learn anytime, anywhere at your convenience.",
                            },
                        ].map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-md transition">
                                <h4 className="text-lg font-semibold text-indigo-600 mb-2">{faq.question}</h4>
                                <p className="text-gray-700 text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



        </div>
    );
};

export default Home;
