import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import axiosInstance from "../Lib/axios";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1 },
    }),
};

export default function AddCourseForm() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        imageUrl: "",
        duration: "",
        category: "",
        price: "",
        level: "",
        requirements: "",
        learnings: "",
        totalSeats: "", // ✅ Added
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("You must be logged in to add a course.");

        const newCourse = {
            ...form,
            price: parseFloat(form.price),
            totalSeats: parseInt(form.totalSeats), // ✅ Cast to integer
            creatorEmail: user.email,
            creatorName: user.displayName || "Anonymous",
            createdAt: new Date().toISOString(),
            enrolledStudents: [],
            isPublished: false,
        };

        try {
            setLoading(true);
            await axiosInstance.post("/courses", newCourse);
            toast.success("🎉 Course added successfully!");
            setForm({
                title: "",
                description: "",
                imageUrl: "",
                duration: "",
                category: "",
                price: "",
                level: "",
                requirements: "",
                learnings: "",
                totalSeats: "",
            });
        } catch (err) {
            console.error(err);
            toast.error("❌ Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const inputs = [
        { name: "title", placeholder: "Course Title" },
        { name: "imageUrl", placeholder: "Image URL" },
        { name: "duration", placeholder: "Duration (e.g., 6 weeks)" },
        { name: "price", placeholder: "Course Price (৳)", type: "number" },
        { name: "totalSeats", placeholder: "Total Seats", type: "number" }, // ✅ New input
    ];

    const textareas = [
        { name: "description", placeholder: "Short Description", rows: 3 },
        { name: "requirements", placeholder: "Requirements", rows: 2 },
        { name: "learnings", placeholder: "What You’ll Learn", rows: 2 },
    ];

    return (
        <div className="bg-gradient-to-br from-purple-200 via-indigo-100 to-pink-100 py-20 px-4 sm:px-6 relative overflow-hidden">
            <div className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-pink-300 rounded-full opacity-30 filter blur-3xl z-0 animate-pulse" />
            <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-indigo-300 rounded-full opacity-30 filter blur-3xl z-0 animate-pulse" />

            <motion.form
                onSubmit={handleSubmit}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto bg-white/60 backdrop-blur-2xl p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 space-y-8"
            >
                <motion.h2
                    className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-800"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    🎓 Add a New Course
                </motion.h2>

                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {inputs.map((input, i) => (
                        <motion.input
                            key={i}
                            custom={i}
                            variants={fadeInUp}
                            name={input.name}
                            type={input.type || "text"}
                            placeholder={input.placeholder}
                            value={form[input.name]}
                            onChange={handleChange}
                            required
                            min={input.type === "number" ? 1 : undefined}
                            whileFocus={{ scale: 1.03 }}
                            className="input-style border border-slate-300 shadow-md px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full"
                        />
                    ))}

                    <motion.select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        custom={inputs.length}
                        variants={fadeInUp}
                        className="input-style border border-slate-300 shadow-md px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md w-full"
                    >
                        <option value="">Select Category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Data Science">Data Science</option>
                    </motion.select>

                    <motion.select
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        required
                        custom={inputs.length + 1}
                        variants={fadeInUp}
                        className="input-style border border-slate-300 shadow-md px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md w-full"
                    >
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </motion.select>
                </div>

                {/* Textareas */}
                <div className="grid grid-cols-1 gap-6">
                    {textareas.map((area, i) => (
                        <motion.textarea
                            key={i}
                            name={area.name}
                            placeholder={area.placeholder}
                            value={form[area.name]}
                            onChange={handleChange}
                            rows={area.rows}
                            custom={inputs.length + 2 + i}
                            variants={fadeInUp}
                            whileFocus={{ scale: 1.01 }}
                            className="input-style border border-slate-300 shadow-md px-4 py-3 rounded-xl bg-white/60 backdrop-blur-md w-full"
                        />
                    ))}
                </div>

                {/* Submit Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    custom={inputs.length + textareas.length + 2}
                    variants={fadeInUp}
                    className="mt-6 cursor-pointer w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-indigo-500 flex items-center justify-center"
                >
                    {loading ? (
                        <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2" />
                    ) : (
                        "🚀 Add Course"
                    )}
                </motion.button>
            </motion.form>
        </div>
    );
}
