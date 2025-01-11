import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const FeaturedBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Fetch Featured Blogs Data
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/featuredBlogs");
        setData(response.data.slice(0, 10)); // Top 10 featured blogs
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-center text-4xl font-bold mb-8 ">
        Top 10 Featured Blogs
      </h2>
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table-auto w-full text-center border-collapse">
          <thead className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <tr>
              <th className="py-3 px-5 text-lg font-semibold">No.</th>
              <th className="py-3 px-5 text-lg font-semibold">Title</th>
              <th className="py-3 px-5 text-lg font-semibold">Category</th>
              <th className="py-3 px-5 text-lg font-semibold">Posted Date</th>
              <th className="py-3 px-5 text-lg font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((blog, index) => (
              <tr
                key={blog._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <th className="py-3 px-5 text-lg font-semibold">{index + 1}</th>
                <td className="py-3 px-5 text-lg font-semibold">{blog.title}</td>
                <td className="py-3 px-5 text-lg font-semibold">
                  {blog.category}
                </td>
                <td className="py-3 px-5 text-lg font-semibold">
                  {new Date(blog.postedTime).toLocaleDateString()}
                </td>
                <td className="py-3 px-5 text-lg font-semibold">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="inline-block mb-2"
                  >
                    <button className="px-5 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 transition duration-200">
                      Details
                    </button>
                  </Link>
                  <button
                    onClick={() =>
                      handleWishList(blog._id, blog.category, blog.title)
                    }
                    className="px-5 py-2 rounded-md ml-2 text-white bg-pink-600 hover:bg-pink-700 transition duration-200"
                  >
                    Wishlist
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;