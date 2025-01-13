import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <section className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white py-32 px-6 sm:px-12 lg:px-24">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Overlay */}
            <div className="relative container mx-auto text-center z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 w-11/12 mx-auto">
                    Explore Trends, Insights, and Thoughtful Blogs
                </h1>
                <p className="text-lg sm:text-xl mb-8 w-7/12 mx-auto">
                Stay connected to the latest trends, in-depth insights, and diverse perspectives on all things trending. From news to personal stories, find captivating content to keep you informed and inspired.
                </p>
                <Link
                    to='/allBlogs'
                    className="inline-block px-8 py-3 text-lg font-semibold text-purple-600 bg-white rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
                >
                    Explore Blogs
                </Link>
            </div>
        </section>
    );
};

export default Banner;
