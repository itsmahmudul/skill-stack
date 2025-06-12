import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialIcons = [
    { icon: <FaFacebookF />, url: 'https://facebook.com' },
    { icon: <FaTwitter />, url: 'https://twitter.com' },
    { icon: <FaInstagram />, url: 'https://instagram.com' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com' },
];

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`Subscribed with ${email}`);
        setEmail('');
    };

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 to-blue-800 text-gray-300 py-16">
            {/* Scroll to top */}
            <div className="absolute top-6 right-6">
                <button
                    onClick={handleScrollTop}
                    className="p-2 cursor-pointer bg-white/10 backdrop-blur-lg text-white border border-white/20 rounded-full hover:bg-white hover:text-black transition shadow-md"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp />
                </button>
            </div>

            {/* Main Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 z-10 relative">
                {/* Logo & Description */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src="https://i.ibb.co/Xf9r53DS/5f5be8ffa2ba0aecf20f0393-Skill-Struck-Profile-Image.png"
                            alt="SkillStack Logo"
                            className="w-12 h-12 rounded-full shadow-2xl"
                        />
                        <Link to='/' className="text-2xl font-bold text-white tracking-wide">SkillStack</Link>
                    </div>
                    <p className="text-sm text-gray-400">
                        Empowering your learning journey with skill-focused courses.
                    </p>
                </motion.div>

                {/* Quick Links */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white transition duration-300">Home</Link></li>
                        <li><Link to="/courses" className="hover:text-white transition duration-300">Courses</Link></li>
                        <li><Link to="/about" className="hover:text-white transition duration-300">About Us</Link></li>
                    </ul>
                </motion.div>

                {/* Support */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/contact" className="hover:text-white transition duration-300">Contact</Link></li>
                        <li><Link to="/faq" className="hover:text-white transition duration-300">FAQ</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition duration-300">Privacy Policy</Link></li>
                    </ul>
                </motion.div>

                {/* Newsletter */}
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
                    <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
                    <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <button
                            type="submit"
                            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-2 rounded-md font-medium transition-all shadow-md"
                        >
                            Subscribe
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* Bottom Area */}
            <div className="mt-16 border-t border-gray-600 pt-6 text-center relative z-10">
                <div className="flex justify-center space-x-6 mb-4">
                    {socialIcons.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-gray-300 hover:text-white transition"
                            whileHover={{
                                scale: 1.3,
                                color: '#ffffff',
                                textShadow: '0 0 10px rgba(255,255,255,0.8)',
                            }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            {item.icon}
                        </motion.a>
                    ))}
                </div>
                <motion.p
                    className="text-sm text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    &copy; {new Date().getFullYear()} <span className="text-white font-semibold">SkillStack</span>. All rights reserved.
                </motion.p>
            </div>
        </footer>
    );
};

export default Footer;
