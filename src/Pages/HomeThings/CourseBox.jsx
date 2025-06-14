import React from "react";
import { motion } from "framer-motion";
import {
  CalendarClock,
  Layers,
  User,
  BadgeDollarSign,
  Globe,
  TrendingUp
} from "lucide-react";

const CourseBox = ({ courseData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
    >
      <img
        src={courseData.imageUrl}
        alt={courseData.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">{courseData.title}</h2>
        <p className="text-sm text-gray-600">{courseData.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-indigo-600" />
            {courseData.duration}
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-green-600" />
            {courseData.category}
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-yellow-600" />
            {courseData.level}
          </div>
          <div className="flex items-center gap-2">
            <BadgeDollarSign className="w-4 h-4 text-rose-600" />
            ৳{courseData.price}
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 pt-2">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {courseData.creatorName}
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            {new Date(courseData.createdAt).toLocaleDateString()}
          </div>
        </div>

        <button className="w-full mt-4 text-sm font-medium py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition">
          View More Details
        </button>
      </div>
    </motion.div>
  );
};

export default CourseBox;
