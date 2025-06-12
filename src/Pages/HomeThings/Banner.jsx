import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

// Make sure to import slick-carousel styles!
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
    {
        title: "Innovate Your Future",
        subtitle: "Join us in building technology for tomorrow",
        image: "https://i.ibb.co/gF3nN9Gh/glenn-carstens-peters-npx-XWg-Q33-ZQ-unsplash.jpg",
        buttonText: "Get Started",
        buttonLink: "#get-started",
        icon: "Rocket",
    },
    {
        title: "Empowering Creativity",
        subtitle: "Tools and platforms to unlock your potential",
        image: "https://i.ibb.co/R8SRg5r/linkedin-sales-solutions-UK1-N66-KUk-Mk-unsplash.jpg",
        buttonText: "Explore Tools",
        buttonLink: "#tools",
        icon: "Wand2",
    },
    {
        title: "Drive Change",
        subtitle: "Be the leader of the digital revolution",
        image: "https://i.ibb.co/VcXKjNwt/john-moeses-bauan-b-EY5-No-CSQ8s-unsplash.jpg",
        buttonText: "Join Now",
        buttonLink: "#join",
        icon: "ArrowRight",
    },
];

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        arrows: false,
    };

    return (
        <div className="relative w-full h-[90vh] overflow-hidden">
            <Slider {...settings}>
                {slides.map((slide, index) => {
                    const LucideIcon = Icons[slide.icon];

                    return (
                        <div key={index} className="relative h-[90vh]">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60" />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                                <motion.h1
                                    className="text-4xl md:text-6xl font-bold mb-4"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    {slide.title}
                                </motion.h1>
                                <motion.p
                                    className="text-lg md:text-2xl max-w-2xl mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    {slide.subtitle}
                                </motion.p>
                                <motion.a
                                    href={slide.buttonLink}
                                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    {slide.buttonText}
                                    {LucideIcon && <LucideIcon className="w-5 h-5" />}
                                </motion.a>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default Banner;
