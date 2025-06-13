import { useContext, useState } from "react";
import { toast } from "sonner";
import AuthContext from "../Context/AuthContext";

export default function AddCourseForm() {
  const { user } = useContext(AuthContext);

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
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a course.");
      return;
    }

    const newCourse = {
      ...form,
      price: parseFloat(form.price),
      creatorEmail: user.email,
      creatorName: user.name || "Anonymous",
      createdAt: new Date().toISOString(),
      enrolledStudents: [],
      isPublished: false,
    };

    try {
      const res = await fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });

      if (!res.ok) throw new Error("Failed to create course");

      toast.success("Course added successfully!");
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
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">Add a New Course</h2>

      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Short Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="duration"
        placeholder="Duration (e.g., 6 weeks)"
        value={form.duration}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      >
        <option value="">Select Category</option>
        <option value="Web Development">Web Development</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="Data Science">Data Science</option>
      </select>

      <input
        type="number"
        name="price"
        placeholder="Course Price"
        value={form.price}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />

      <select
        name="level"
        value={form.level}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      >
        <option value="">Select Level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      <textarea
        name="requirements"
        placeholder="Requirements"
        value={form.requirements}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="learnings"
        placeholder="What You’ll Learn"
        value={form.learnings}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add Course
      </button>
    </form>
  );
}
