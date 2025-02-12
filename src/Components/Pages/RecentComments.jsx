import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecentComments = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://blog-website-server-nine.vercel.app/recentComments");
                setComments(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load recent comments");
                setLoading(false);
            }
        };

        fetchRecentComments();
    }, []);

    return (
        <div className="recent-comments w-9/12 mx-auto">
            <div className="">
                <h2 className="text-center text-5xl font-extrabold my-12">
                    Recent Comments
                </h2>

                {loading ? (
                    <p className="text-center text-xl animate-pulse">Loading comments...</p>
                ) : error ? (
                    <p className="text-center text-red-200 font-medium">{error}</p>
                ) : comments.length === 0 ? (
                    <p className="text-center text-lg text-gray-200">
                        No recent comments available.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="comment-card bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden  transform transition-all duration-500 hover:scale-105"
                            >
                                <div className="flex items-center gap-4 bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-4">
                                    <img
                                        src={comment.userProfilePicture}
                                        alt={comment.userName}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-white"
                                    />
                                    <h3 className="text-lg font-bold text-white">
                                        {comment.userName}
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl mb-2">{comment.blogTitle}</h3>
                                    <p className="italic text-gray-600 text-lg">"{comment.comment}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentComments;
