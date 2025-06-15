import React, { useEffect, useState } from "react";
import axiosInstance from "../Lib/axios";
import { motion } from "framer-motion";
import CourseBox from "./HomeThings/CourseBox";
import Lottie from "lottie-react";
import motivationAnimation from "../assets/motivation.json"; // Ensure this path is correct

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">All Courses</h1>
        <p className="mt-2 text-lg text-gray-600">
          Empower yourself with new skills – Start learning today!
        </p>
      </div>

      {/* Lottie Motivation Animation */}
      <div className="max-w-md mx-auto mb-10">
        <Lottie animationData={motivationAnimation} loop={true} />
      </div>

      {/* Motivational Quote Box */}
      <motion.div
        className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl shadow-md mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-xl italic font-medium text-indigo-700">
          “Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela
        </p>
      </motion.div>

      {/* Course Grid */}
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-lg text-red-500">No courses available</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {courses.map((course) => (
            <motion.div
              key={course._id}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CourseBox courseData={course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Courses;
