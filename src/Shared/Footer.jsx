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
        <footer
            className="relative backdrop-blur-md bg-black/50 text-gray-300 py-14"
            style={{
                backgroundImage: 'url(https://i.ibb.co/0ydxjYZt/alicia-christin-gerald-4-Wy-NUXlft-F0-unsplash.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute top-4 right-4">
                <button
                    onClick={handleScrollTop}
                    className="p-2 bg-gray-800 text-white rounded-full hover:bg-white hover:text-black transition"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp />
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 z-10 relative">
                {/* Logo and Slogan */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-3">
                        <img
                            src="https://i.ibb.co/Xf9r53DS/5f5be8ffa2ba0aecf20f0393-Skill-Struck-Profile-Image.png"
                            alt="SkillStack Logo"
                            className="w-12 h-12 rounded-full shadow-xl"
                        />
                        <h2 className="text-2xl font-bold text-white tracking-wide">SkillStack</h2>
                    </div>
                    <p className="text-sm opacity-90">
                        Empowering your learning journey with skill-focused courses.
                    </p>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/courses" className="hover:text-white transition">Courses</Link></li>
                        <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                    </ul>
                </motion.div>

                {/* Support Links */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                        <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                    </ul>
                </motion.div>

                {/* Newsletter */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                >
                    <h3 className="text-lg font-semibold text-white mb-3">Newsletter</h3>
                    <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="px-4 py-2 rounded bg-white/10 text-white placeholder-gray-400 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* Social Icons and Copyright */}
            <div className="mt-12 border-t border-gray-600 pt-6 text-center relative z-10">
                <div className="flex justify-center space-x-6 mb-4">
                    {socialIcons.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 text-xl"
                            whileHover={{
                                scale: 1.3,
                                color: '#ffffff',
                                textShadow: '0px 0px 8px rgba(255,255,255,0.8)',
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
                    &copy; {new Date().getFullYear()} SkillStack. All rights reserved.
                </motion.p>
            </div>
        </footer>
    );
};

export default Footer;
