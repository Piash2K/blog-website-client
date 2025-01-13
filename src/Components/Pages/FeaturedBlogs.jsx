import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const FeaturedBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Fetch Featured Blogs Data
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await axios.get("https://blog-website-server-nine.vercel.app/featuredBlogs");
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

  // Columns for DataTable
  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Posted Date",
      selector: (row) => new Date(row.postedTime).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-col gap-2 lg:flex-row  space-x-2">
          <Link to={`/blogs/${row._id}`} className="px-5 ml-2 py-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 transition duration-200">
            Details
          </Link>
          <button
            onClick={() => handleWishList(row._id, row.category, row.title)}
            className="px-5 py-2 rounded-md ml-2 text-white bg-pink-600 hover:bg-pink-700 transition duration-200"
          >
            Wishlist
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <Helmet><title>Featured Blogs | BlogWebsite</title></Helmet>
      <h2 className="text-center text-4xl font-bold mb-8">Top 10 Featured Blogs</h2>
      <div className="overflow-x-auto shadow-xl rounded-lg w-11/12 mx-auto">
        <DataTable
          columns={columns}
          data={data}
          highlightOnHover
          responsive
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#6a5acd",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "12px 8px",
              },
            },
            cells: {
              style: {
                padding: "12px 0px 12px 5px",
                fontSize: "16px",
                textAlign: "center",
              },
            },
            rows: {
              style: {
                "&:hover": {
                  backgroundColor: "#f3e8ff",
                },
              },
            }
          }}
        />
      </div>
    </div>
  );
};

export default FeaturedBlogs;