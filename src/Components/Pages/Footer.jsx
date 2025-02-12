import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-12 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700  text-white">
            <div className="px-4 w-10/12 mx-auto ">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Blog Website</h2>
                        <p className=" text-sm w-10/12">
                            Explore insightful articles, the latest news, and updates on various topics to keep you informed, inspired, and engaged.
                        </p>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Explore</h2>
                            <ul>
                                <li>
                                    <Link><p >About Us</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/allReviews'><p>
                                        Reviews
                                    </p></Link>
                                </li>
                                <li>
                                    <a>
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a>
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
                <div className="mt-8 text-center text-sm">
                    &copy; {new Date().getFullYear()} Blog Website. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;