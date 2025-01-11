import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-16 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Blog Website</h2>
                        <p className="text-gray-400 text-sm w-10/12">
                            Explore insightful articles, the latest news, and updates on various topics to keep you informed, inspired, and engaged.
                        </p>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Explore</h2>
                            <ul>
                                <li>
                                    <Link><p className='text-gray-400'>About Us</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/allReviews'><p className='text-gray-400'>
                                        Reviews
                                    </p></Link>
                                </li>
                                <li>
                                    <a className='text-gray-400'>
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a className='text-gray-400'>
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
                            <div className="flex space-x-4">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    className=" transition"
                                >
                                    <FaFacebook className='text-4xl'></FaFacebook>
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    className="transition"
                                >
                                    <FaTwitter className='text-4xl'></FaTwitter>
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    className=" transition"
                                >
                                    <FaInstagram className='text-4xl'></FaInstagram>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Blog Website. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;