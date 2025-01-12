import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";


const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    category: "",
    shortDescription: "",
    longDescription: "",
  });
  const { user, loading } = useContext(AuthContext);
  const authorEmail = user.email;
  const postedTime = new Date().toISOString();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner text-info text-5xl"></div>
      </div>
    );
  }

  const categories = ["Technology", "News", "Business & Finance", "Lifestyle", "Education", "Entertainment"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeFormData = { ...formData, authorEmail, postedTime };

    axios
      .post("http://localhost:5000/blogs", completeFormData)
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your blog has been added successfully",
            showConfirmButton: true,
          });
          setFormData({
            title: "",
            imageUrl: "",
            category: "",
            shortDescription: "",
            longDescription: "",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed to add your blog",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r  px-4">
      <form
        onSubmit={handleSubmit}
        className=" border rounded-lg shadow-lg p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="text-4xl font-bold  text-center">Add Blog</h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium ">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border px-4 py-2 border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Enter the blog title"
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium ">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border px-4 py-2 border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Enter the image URL"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium ">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border px-4 py-2 border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium ">
            Short Description
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border px-4 py-2 border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            rows="2"
            placeholder="Write a short description"
            required
          />
        </div>

        <div>
          <label htmlFor="longDescription" className="block text-sm font-medium ">
            Long Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border px-4 py-2 border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            rows="4"
            placeholder="Write a detailed description"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;