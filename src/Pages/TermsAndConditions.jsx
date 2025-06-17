import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import termsAnimation from "../assets/terms.json";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      {/* Lottie Animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-60 mx-auto mb-6"
      >
        <Lottie animationData={termsAnimation} loop={true} />
      </motion.div>

      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Terms & Conditions
      </motion.h1>

      <motion.section
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {[
          {
            title: "1. Use of the Platform",
            text: "Skill Stack offers online courses for educational purposes. You may not misuse our services or use them for any unlawful activities.",
          },
          {
            title: "2. Account Responsibilities",
            text: "You are responsible for maintaining the confidentiality of your account and password. Notify us immediately of any unauthorized access.",
          },
          {
            title: "3. Course Enrollment",
            text: "Enrollment is for personal, non-commercial use only. Redistribution or resale of course content is strictly prohibited.",
          },
          {
            title: "4. Payments & Refunds",
            text: "All payments are final unless stated otherwise. Refunds are considered only within 7 days of purchase.",
          },
          {
            title: "5. Intellectual Property",
            text: "All materials and content belong to Skill Stack and its instructors. Unauthorized use is not allowed.",
          },
          {
            title: "6. Termination",
            text: "We may suspend or terminate your account for violating these terms at our sole discretion.",
          },
          {
            title: "7. Changes to Terms",
            text: "Terms may change at any time. Please review this page regularly.",
          },
          {
            title: "8. Contact",
            text: `For questions, contact us at support@skillstack.com`,
          },
        ].map(({ title, text }, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-5 shadow-md border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p>{text}</p>
          </motion.div>
        ))}
      </motion.section>

      <motion.p
        className="text-center mt-10 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        Last updated: June 17, 2025
      </motion.p>
    </div>
  );
};

export default TermsAndConditions;
