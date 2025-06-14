import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axiosInstance from "../../Lib/axios";
import {
  Pencil,
  FileText,
  ImageIcon,
  Clock,
  Layers,
  User2,
  Mail
} from "lucide-react";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    duration: "",
    category: "",
    creatorName: "",
    creatorEmail: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load course");
        console.error(err);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, ...formData } = form;
      await axiosInstance.put(`/courses/${id}`, formData);
      toast.success("Course updated!");
      setTimeout(() => navigate("/manageCourses"), 500);
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };


  const InputWithIcon = ({ icon: Icon, label, name, value, onChange, type = "text" }) => {
    const isActive = Boolean(value?.trim());

    return (
      <div className="relative w-full">
        <label
          htmlFor={name}
          className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-1"
        >
          <Icon size={16} /> {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="pl-10 pt-2 pb-2 pr-3 w-full border border-gray-300 rounded-xl bg-white/60 backdrop-blur-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={label}
        />
        <motion.div
          className={`absolute left-3 top-[38px] pointer-events-none ${isActive ? "text-blue-500" : "text-gray-400"
            }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon size={18} />
        </motion.div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center mt-16 text-lg text-gray-600 animate-pulse">Loading course data...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[url('https://images.unsplash.com/photo-1543269865-cbf427effbad')] bg-cover bg-center">
      <motion.div
        className="w-full max-w-3xl bg-white/50 backdrop-blur shadow-2xl rounded-3xl p-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Edit Course</h2>

        {form.imageUrl && (
          <div className="mb-6">
            <img
              src={form.imageUrl}
              alt="Course Preview"
              className="w-full h-52 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <User2 size={16} /> Creator Name
              </label>
              <input
                type="text"
                value={form.creatorName || "Unknown"}
                readOnly
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Mail size={16} /> Creator Email
              </label>
              <input
                type="email"
                value={form.creatorEmail || "Unknown"}
                readOnly
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700"
              />
            </div>
          </div>

          <InputWithIcon
            icon={Pencil}
            label="Course Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
              <FileText size={16} /> Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputWithIcon
              icon={ImageIcon}
              label="Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />
            <InputWithIcon
              icon={Clock}
              label="Duration"
              name="duration"
              value={form.duration}
              onChange={handleChange}
            />
            <div className="relative w-full">
              <label
                htmlFor="category"
                className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-1"
              >
                <Layers size={16} /> Category
              </label>
              <motion.select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.01 }}
                className="pl-10 pt-2 pb-2 pr-3 w-full border border-slate-300 rounded-xl bg-white/60 backdrop-blur-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Science">Data Science</option>
              </motion.select>
              <motion.div
                className={`absolute left-3 top-[38px] pointer-events-none ${form.category ? "text-blue-500" : "text-gray-400"
                  }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Layers size={18} />
              </motion.div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r cursor-pointer w-full from-blue-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Save Changes
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
