import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [count, setCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { user, loading } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    const categories = ["Technology", "News", "Business & Finance", "Lifestyle", "Education", "Entertainment"];

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    // Fetch total blog count for pagination
    useEffect(() => {
        setIsLoading(true);
        fetch("https://blog-website-server-nine.vercel.app/blogsCount")
            .then((res) => res.json())
            .then((data) => {
                setCount(data.count);
                setIsLoading(false);
            })
            .catch(() => {
                // console.log('error', error.message)
            });
    }, []);

    // Fetch blogs based on pagination, category, and search query
    useEffect(() => {
        setIsLoading(true);
        const query = `https://blog-website-server-nine.vercel.app/blogs?page=${currentPage}&size=${itemsPerPage}${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ""
            }${searchQuery ? `&search=${searchQuery}` : ""}`;

        fetch(query)
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                setIsLoading(false);
            })
            .catch(() => {
                // console.error('Error')
                setIsLoading(false);
            });

    }, [currentPage, itemsPerPage, selectedCategory, searchQuery]);

    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(0); // Reset to first page when performing a new search
    };

    // Adding data to wishlist
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

        axios
            .post("https://blog-website-server-nine.vercel.app/wishlist", newWishlist)
            .then((res) => {
                if (res.status === 200 && res.data.acknowledged) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Added to Wishlist successfully!",
                        showConfirmButton: true,
                    });
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 409) {
                    Swal.fire({
                        position: "top-center",
                        icon: "info",
                        title: "This blog is already in your wishlist!",
                        showConfirmButton: true,
                    });
                } else {
                    Swal.fire({
                        position: "top-center",
                        icon: "error",
                        title: "Failed to add to Wishlist.",
                        showConfirmButton: true,
                    });
                }
            });
    };

    if (loading || isLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full border-purple-600 border-t-transparent"></div>
          </div>
        );
    }
 
    return (
        <div className="shop-container p-4">
            <Helmet><title>All Blogs | BlogWebsite </title></Helmet>
            <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>


            <div>
                {/* Filter Bar */}
                <div className="filter-bar flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <div className="text-lg font-semibold text-gray-800">
                        Total Blogs: {count}
                    </div>

                    {/* Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center w-full md:w-auto px-4 py-2 bg-gray-100 rounded-md shadow-sm border focus-within:border-purple-500"
                    >
                        <input
                            type="text"
                            placeholder="Search blogs by title"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow p-2 bg-transparent outline-none"
                        />
                        <button
                            type="submit"
                            className="ml-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-md hover:bg-purple-600 text-sm"
                        >
                            Search
                        </button>
                    </form>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-2 bg-gray-100 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Blogs Grid */}
                <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs?.map((blog) => (
                        <div
                            key={blog._id}
                            className="blog-card border rounded-lg p-4 shadow-md flex flex-col justify-between"
                        >
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold">{blog.title}</h2>
                                <p className="text-gray-600 text-sm mt-2">
                                    {blog.shortDescription}
                                </p>
                                <div className="text-sm font-medium text-gray-500 mt-2">
                                    {blog.category}
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    onClick={() =>
                                        handleWishList(blog._id, blog.category, blog.title)
                                    }
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
                                >
                                   Add to Wishlist
                                </button>
                                <Link to={`/blogs/${blog._id}`}>
                                    <button className="text-purple-700 font-medium text-sm hover:underline">
                                       View Details
                                    </button>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination flex flex-col items-center mt-6">
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrevPage}
                            className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Prev
                        </button>
                        {pages.map((page) => (
                            <button
                                className={`px-3 py-1 rounded-md ${currentPage === page
                                    ? "bg-purple-500 text-white"
                                    : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                onClick={() => setCurrentPage(page)}
                                key={page}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button
                            onClick={handleNextPage}
                            className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPage}
                        className="mt-4 p-2 border rounded-md"
                    >
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AllBlogs;