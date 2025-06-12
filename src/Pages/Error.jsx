import React from 'react';
import { motion } from 'framer-motion';

const Error = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center min-h-screen px-4"
        >
            <div className="max-w-md text-center">
                {/* Animated 404 */}
                <motion.h1
                    className="text-9xl font-extrabold text-indigo-600 drop-shadow-lg"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                    404
                </motion.h1>

                {/* Shaking 'Oops!' text */}
                <motion.p
                    className="text-2xl md:text-3xl font-semibold mt-4 text-gray-700"
                    animate={{ rotate: [0, 3, -3, 3, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                    Oops! Page not found.
                </motion.p>

                <p className="mt-2 text-gray-500">
                    The page you are looking for doesn’t exist or has been moved.
                </p>

                {/* Animated button */}
                <motion.a
                    href="/"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgb(99 102 241)' }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block mt-6 px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                >
                    Back to SkillStack Home
                </motion.a>

                {/* Animated Robot Illustration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-10 flex justify-center"
                >
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="200"
                        height="200"
                        viewBox="0 0 64 64"
                        fill="none"
                        className="drop-shadow-lg"
                        animate={{
                            y: [0, -10, 0], // floating animation
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: 'easeInOut',
                        }}
                    >
                        {/* Robot head */}
                        <rect
                            x="12"
                            y="20"
                            width="40"
                            height="30"
                            rx="6"
                            ry="6"
                            fill="url(#grad1)"
                            stroke="#4F46E5"
                            strokeWidth="2"
                        />
                        {/* Antenna */}
                        <motion.line
                            x1="32"
                            y1="10"
                            x2="32"
                            y2="20"
                            stroke="#4F46E5"
                            strokeWidth="3"
                            animate={{
                                rotate: [0, 10, -10, 0],
                                originX: "32",
                                originY: "20",
                            }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        />
                        <circle cx="32" cy="8" r="3" fill="#6366F1" />

                        {/* Eyes */}
                        <motion.circle
                            cx="22"
                            cy="33"
                            r="4"
                            fill="white"
                            stroke="#4F46E5"
                            strokeWidth="2"
                            animate={{
                                scale: [1, 0.8, 1],
                            }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        />
                        <motion.circle
                            cx="42"
                            cy="33"
                            r="4"
                            fill="white"
                            stroke="#4F46E5"
                            strokeWidth="2"
                            animate={{
                                scale: [1, 0.8, 1],
                            }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1 }}
                        />

                        {/* Pupils */}
                        <motion.circle
                            cx="22"
                            cy="33"
                            r="1.5"
                            fill="#4F46E5"
                            animate={{
                                y: [0, 1, 0],
                            }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        />
                        <motion.circle
                            cx="42"
                            cy="33"
                            r="1.5"
                            fill="#4F46E5"
                            animate={{
                                y: [0, 1, 0],
                            }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1 }}
                        />

                        {/* Mouth */}
                        <rect x="25" y="45" width="14" height="4" rx="2" ry="2" fill="#4F46E5" />

                        <defs>
                            <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#A5B4FC" />
                                <stop offset="100%" stopColor="#4F46E5" />
                            </linearGradient>
                        </defs>
                    </motion.svg>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Error;
