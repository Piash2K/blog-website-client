import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../Axios/UseAxiosSecure";
import { Helmet } from "react-helmet";

const WishList = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`wishlist?email=${user.email}`).then((response) => {
        setData(response.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user?.email, axiosSecure]);

  // Handle Remove Item
  const handleRemove = (itemId) => {
    axios
      .delete(`https://blog-website-server-nine.vercel.app/wishlist/${itemId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Item removed from Wishlist!",
            showConfirmButton: true,
          });
          setData((prevData) => prevData.filter((item) => item._id !== itemId));
        }
      });
  };
  // Table Columns
  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1
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
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-col gap-2 lg:flex-row space-x-2">
          <Link
            to={`/blogs/${row.blogId}`}
            className="px-5 py-2 ml-2 rounded-md text-white bg-purple-600 hover:bg-purple-700 transition duration-200"
          >
            Details
          </Link>
          <button
            onClick={() => handleRemove(row._id)}
            className="px-5 py-2 rounded-md ml-2 text-white bg-pink-600 hover:bg-pink-700 transition duration-200"
          >
            Delete
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
      <Helmet><title>Wish List | BlogWebsite </title></Helmet>
      <h1 className="text-5xl font-extrabold text-center my-12">Your Wishlist</h1>
      <div className="overflow-x-auto shadow-xl rounded-lg w-11/12 mx-auto">
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
          customStyles={{
            headCells: {
              style: {
                backgroundColor: "#6a5acd",
                color: "white", // White text for header
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
            },
            pagination: {
              style: {
                backgroundColor: "#f3e8ff",
                padding: "10px 0",
                borderTop: "1px solid #d1d5db",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default WishList;