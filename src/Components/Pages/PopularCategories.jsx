import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://blog-website-server-nine.vercel.app/popularCategories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        // console.error("Failed to fetch popular categories:", err);
      });
  }, []);

  return (
    <motion.div
      className="popular-categories w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="w-9/12 mx-auto">
        <h2 className="text-center text-5xl font-extrabold my-12">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="category-card bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-200">Blogs: {category.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PopularCategories;
