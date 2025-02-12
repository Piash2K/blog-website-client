import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <section
      className=" bg-gradient-to-r from-gray-100 via-white to-gray-200 text-gray-800 pb-12 mt-4"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl sm:text-5xl font-extrabold py-12 text-gray-900">
          Stay Informed, Stay Inspired
        </h2>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          Subscribe to our newsletter and be the first to know about our latest blog posts, exclusive content, and special updates. 
          Join our community to stay inspired and never miss a moment!
        </p>

        <form
          onSubmit={handleSubscribe}
          className="max-w-lg mx-auto flex flex-col sm:flex-row items-center bg-white rounded-lg p-4 shadow-lg border border-gray-300"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 mb-4 sm:mb-0 sm:mr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner text-gray-800"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md"
          >
            Subscribe!
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;