import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RecentBlogs = () => {
    const [recent, setRecent] = useState([]);
    const { user } = useContext(AuthContext);

    // fetching data for recenblogs
    useEffect(() => {
        axios
            .get("https://blog-website-server-nine.vercel.app/recentBlogs")
            .then((res) => setRecent(res.data));
    }, []);

    const handleWishList = (_id, category, title) => {
        if (!user?.email) {
            Swal.fire({
                position: "top-center",
                icon: "warning",
                title: "Please log in to add items to your wishlist!",
                showConfirmButton: true,
            });
            return;
        }

        const newWishlist = {
            blogId: _id,
            userName: user.displayName,
            userEmail: user.email,
            category,
            title,
        };

        // send wishlist data to backend
        axios
            .post("https://blog-website-server-nine.vercel.app/wishlist", newWishlist)
            .then((res) => {
                if (res.status === 200 && res.data.acknowledged) {
                    Swal.fire({
                        icon: "success",
                        title: "Added to Wishlist successfully!",
                        showConfirmButton: true,
                    });
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 409) {
                    Swal.fire({
                        icon: "info",
                        title: "This blog is already in your wishlist!",
                        showConfirmButton: true,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to add to Wishlist.",
                        showConfirmButton: true,
                    });
                }
            });
    };

    return (
        <div className="w-11/12 md:w-9/12 mx-auto">
            <div className="text-center text-5xl font-extrabold my-12">
                Recent Blogs
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recent.map((blog) => (
                    <div
                        key={blog._id}
                        className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col "
                    >
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-2xl font-semibold mb-3">
                                {blog.title}
                            </h3>
                            <p className=" mb-4 text-sm leading-relaxed">
                                {blog.shortDescription.length > 120
                                    ? `${blog.shortDescription.slice(0, 120)}...`
                                    : blog.shortDescription}
                            </p>
                            <p className="text-xs mb-4">
                                Posted on {new Date(blog.postedTime).toLocaleDateString()}
                            </p>
                            <div className="flex justify-between items-center mt-auto">
                                <button
                                    onClick={() =>
                                        handleWishList(blog._id, blog.category, blog.title)
                                    }
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Add to Wishlist
                                </button>
                                <Link
                                    to={`/blogs/${blog._id}`}
                                    className="px-4 py-2 border border-purple-700 text-purple-600  text-sm rounded-lg hover:border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentBlogs;