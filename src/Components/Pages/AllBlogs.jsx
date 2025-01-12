import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [count, setCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useContext(AuthContext);

    const categories = ["Technology", "News", "Business & Finance", "Lifestyle", "Education", "Entertainment"];

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        fetch("http://localhost:5000/blogsCount")
            .then((res) => res.json())
            .then((data) => {
                setCount(data.count);
            })
            .catch((error) => {
                console.error("Error fetching blogs count:", error.message);
            });
    }, []);

    useEffect(() => {
        const query = `http://localhost:5000/blogs?page=${currentPage}&size=${itemsPerPage}${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ""}${searchQuery ? `&search=${searchQuery}` : ""}`;

        fetch(query)
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
            })
            .catch(() => {
                console.error("Error fetching blogs");
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
        setCurrentPage(0);
    };

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
            .post("http://localhost:5000/wishlist", newWishlist)
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

    return (
        <div className="shop-container p-4">
            <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>

            <div>
                {/* Filter Bar */}
                <div className="filter-bar flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <div className="text-lg font-semibold text-gray-800">
                        Total Blogs: {blogs.length}
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
                            className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col bg-gradient-to-r from-gray-100 via-white to-gray-100 border border-gray-200"
                        >
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                                    {blog.shortDescription.length > 120
                                        ? `${blog.shortDescription.slice(0, 120)}...`
                                        : blog.shortDescription}
                                </p>
                                <p className="text-xs text-gray-500 mb-4">
                                    Category:{" "}
                                    <span className="text-gray-700 font-semibold">
                                        {blog.category}
                                    </span>
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
                                        className="text-purple-700 font-medium text-sm hover:underline"
                                    >
                                        View Details
                                    </Link>
                                </div>
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
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AllBlogs;
