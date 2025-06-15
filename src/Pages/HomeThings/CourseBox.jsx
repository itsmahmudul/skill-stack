import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
    CalendarClock,
    Layers,
    User,
    BadgeDollarSign,
    Globe,
    TrendingUp
} from "lucide-react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Link } from "react-router";

const CourseBox = ({ courseData }) => {
    const uniqueId = courseData.id;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col"
        >
            <img
                src={courseData.imageUrl}
                alt={courseData.title}
                className="w-full h-48 object-cover"
            />

            <div className="p-5 flex flex-col flex-grow">
                <div className="space-y-3 flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {courseData.title}
                    </h2>
                    <p className="text-sm text-gray-600">{courseData.description}</p>

                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                        <div
                            className="flex items-center gap-2"
                            id={`duration-${uniqueId}`}
                        >
                            <CalendarClock className="w-4 h-4 text-indigo-600" />
                            {courseData.duration}
                        </div>
                        <div className="flex items-center gap-2" id={`category-${uniqueId}`}>
                            <Layers className="w-4 h-4 text-green-600" />
                            {courseData.category}
                        </div>
                        <div className="flex items-center gap-2" id={`level-${uniqueId}`}>
                            <TrendingUp className="w-4 h-4 text-yellow-600" />
                            {courseData.level}
                        </div>
                        <div className="flex items-center gap-2" id={`price-${uniqueId}`}>
                            <BadgeDollarSign className="w-4 h-4 text-rose-600" />
                            ৳{courseData.price}
                        </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 pt-2">
                        <div className="flex items-center gap-1" id={`creator-${uniqueId}`}>
                            <User className="w-4 h-4" />
                            {courseData.creatorName}
                        </div>
                        <div className="flex items-center gap-1" id={`date-${uniqueId}`}>
                            <Globe className="w-4 h-4" />
                            {new Date(courseData.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <Link to={`/course-details/${courseData._id}`}>
                    <button className="w-full cursor-pointer mt-4 text-sm font-semibold py-2.5 px-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2 group">
                        View More Details
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </Link>
            </div>

            {/* ✅ Tooltips */}
            <ReactTooltip anchorSelect={`#duration-${uniqueId}`} content="Course Duration" />
            <ReactTooltip anchorSelect={`#category-${uniqueId}`} content="Course Category" />
            <ReactTooltip anchorSelect={`#level-${uniqueId}`} content="Course Level" />
            <ReactTooltip anchorSelect={`#price-${uniqueId}`} content="Course Price" />
            <ReactTooltip anchorSelect={`#creator-${uniqueId}`} content="Instructor" />
            <ReactTooltip anchorSelect={`#date-${uniqueId}`} content="Created Date" />
        </motion.div>
    );
};

export default CourseBox;
