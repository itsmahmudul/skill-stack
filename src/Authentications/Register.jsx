import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import AuthContext from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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
            await createUser(email, password);
            await updateUserProfile({ displayName: name, photoURL });
            toast.success("User registered successfully!");
            setTimeout(() => navigate(from, { replace: true }), 2000);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 space-y-6"
            >
                <motion.h2
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-3xl font-bold text-center text-blue-800"
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
                    aria-live="polite"
                    aria-busy={loading}
                >
                    {[
                        { name: "name", label: "Name", type: "text" },
                        { name: "photoURL", label: "Photo URL", type: "url" },
                        { name: "email", label: "Email", type: "email" },
                    ].map(({ name, label, type }) => (
                        <motion.div key={name} variants={inputVariants}>
                            <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
                                {label}
                            </label>
                            <input
                                id={name}
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                disabled={loading}
                            />
                        </motion.div>
                    ))}

                    {/* Password */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPass ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            aria-describedby="password-toggle"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass((prev) => !prev)}
                            id="password-toggle"
                            aria-label={showPass ? "Hide password" : "Show password"}
                            className="absolute top-10 right-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                            disabled={loading}
                        >
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            aria-describedby="confirm-password-toggle"
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            id="confirm-password-toggle"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            className="absolute top-10 right-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
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
                            className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            disabled={loading}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700 select-none cursor-pointer">
                            I accept the{" "}
                            <span className="text-blue-600 underline cursor-pointer">terms and conditions</span>
                        </label>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        className={`w-full cursor-pointer py-3 font-semibold text-white rounded-lg transition duration-200 ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        whileHover={loading ? {} : { scale: 1.05 }}
                        whileTap={loading ? {} : { scale: 0.95 }}
                        aria-live="polite"
                        aria-disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
};

export default Register;
