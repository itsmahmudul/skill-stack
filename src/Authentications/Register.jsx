import { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import AuthContext from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axiosInstance from "../Lib/axios";

const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        photoURL: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { createUser, updateUserProfile, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validatePassword = (password, confirmPassword, email) => {
        if (password.length < 8)
            return "Password must be at least 8 characters long.";
        if (!/[A-Z]/.test(password))
            return "Password must include at least one uppercase letter.";
        if (!/[a-z]/.test(password))
            return "Password must include at least one lowercase letter.";
        if (!/[0-9]/.test(password))
            return "Password must include at least one number.";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
            return "Password must include at least one special character.";
        if (password.includes(email))
            return "Password cannot contain the email address.";
        if (password !== confirmPassword)
            return "Password and Confirm Password do not match.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, photoURL, email, password, confirmPassword } = formData;

        const validationError = validatePassword(password, confirmPassword, email);
        if (validationError) return toast.error(validationError);
        if (!acceptedTerms) return toast.error("You must accept the terms and conditions.");

        try {
            // 1. Create user in Firebase Auth
            await createUser(email, password);
            await updateUserProfile({ displayName: name, photoURL });

            // 2. Send user info to your backend to save in DB
            await axiosInstance.post("/register", {
                name,
                email,
                acceptedTerms,
                photoURL
            });

            toast.success("User registered successfully!");
            setTimeout(() => navigate(from, { replace: true }), 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-4 sm:p-6"
            style={{
                backgroundImage:
                    'url("https://i.ibb.co/Kx5RVPw6/miquel-parera-gxdctl-HPVYk-unsplash.jpg")',
            }}
        >
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-black backdrop-blur-sm"
            ></motion.div>

            {/* Glass Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-[2px] border border-white/10 shadow-xl rounded-2xl p-6 sm:p-8 space-y-6"
            >
                <motion.h2
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-3xl font-bold text-center text-white"
                >
                    Create an Account
                </motion.h2>

                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {/* Name, Photo URL, Email Fields */}
                    {[
                        { name: "name", label: "Name", type: "text" },
                        { name: "photoURL", label: "Photo URL", type: "url" },
                        { name: "email", label: "Email", type: "email" },
                    ].map(({ name, label, type }) => (
                        <motion.div key={name} variants={inputVariants}>
                            <label
                                htmlFor={name}
                                className="block mb-1 text-sm font-medium text-white"
                            >
                                {label}
                            </label>
                            <input
                                id={name}
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                required
                                className="w-full border border-white/30 bg-white/30 text-white placeholder-white rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                disabled={loading}
                                placeholder={`Enter your ${label.toLowerCase()}`}
                            />
                        </motion.div>
                    ))}

                    {/* Password */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-white"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPass ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-white/30 bg-white/30 text-white placeholder-white rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            disabled={loading}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass((prev) => !prev)}
                            className="absolute top-10 right-4 text-white"
                            disabled={loading}
                        >
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-1 text-sm font-medium text-white"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full border border-white/30 bg-white/30 text-white placeholder-white rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            disabled={loading}
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute top-10 right-4 text-white"
                            disabled={loading}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </motion.div>

                    {/* Terms */}
                    <motion.div className="flex items-center gap-3" variants={inputVariants}>
                        <input
                            type="checkbox"
                            id="terms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            disabled={loading}
                        />
                        <label htmlFor="terms" className="text-sm text-white">
                            I accept the{" "}
                            <Link to='/terms-conditions' className="text-blue-400 underline">terms and conditions</Link>
                        </label>
                    </motion.div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-md font-semibold text-white transition ${loading
                            ? "bg-indigo-300 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        whileHover={loading ? {} : { scale: 1.05 }}
                        whileTap={loading ? {} : { scale: 0.95 }}
                    >
                        {loading ? "Registering..." : "Register"}
                    </motion.button>

                    {/* Login Link */}
                    <div className="mt-4 text-center text-white">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-indigo-300 hover:underline font-semibold"
                        >
                            Login
                        </Link>
                    </div>
                </motion.form>
            </motion.div>
        </div>

    );
};

export default Register;
