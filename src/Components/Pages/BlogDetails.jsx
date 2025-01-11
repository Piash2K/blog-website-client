import { useState, useEffect, useContext } from "react";
import {
  useNavigate,
  useLocation,
  useLoaderData,
  Link,
} from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const BlogDetails = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [blogData, setBlogData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const {
    title,
    imageUrl,
    category,
    shortDescription,
    longDescription,
    _id,
    authorEmail,
  } = data[0] || {};

  useEffect(() => {
    if (user?.email && _id) {
      setDataLoading(true);
      fetch(`http://localhost:5000/blogs/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBlogData(data);
          setDataLoading(false);
        })
        .catch((error) => {
          setDataLoading(false);
        });
    } else if (!user?.email) {
      navigate("/login", { state: { from: location } });
    }
  }, [_id, user, navigate, location]);

  useEffect(() => {
    if (_id) {
      fetch(`http://localhost:5000/comments/${_id}`)
        .then((res) => res.json())
        .then((data) => setComments(data))
        .catch((error) => {});
    }
  }, [_id]);

  const handleCommentPost = (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty comment",
        text: "Please write something before submitting!",
      });
      return;
    }
    const newComment = {
      blogId: _id,
      userName: user.displayName,
      userProfilePicture: user.photoURL,
      comment: commentText,
    };

    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          const addedComment = {
            ...newComment,
            _id: data.insertedId,
          };
          setComments((prevComments) => [addedComment, ...prevComments]);
          setCommentText("");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your comment has been added successfully!",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to post your comment. Please try again later!",
        });
      });
  };

  const isOwner = user?.email === authorEmail;

  if (loading || dataLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-purple-100">
        <div className="loading loading-spinner text-purple-500 text-5xl"></div>
      </div>
    );
  }

  return (
    <div className="blog-details p-6 max-w-7xl mx-auto bg-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">{title}</h1>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={imageUrl}
          alt={title}
          className="w-full md:w-1/2 rounded-lg shadow-lg object-cover h-80"
        />
        <div className="text-content md:w-1/2">
          <p className="text-sm text-purple-500 mb-3 uppercase">{category}</p>
          <p className="text-xl text-gray-700 font-semibold mb-4">
            {shortDescription}
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            {longDescription}
          </p>

          {!isOwner ? null : (
            <Link to={`/update/${_id}`}>
              <button className="mt-6 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-200">
                Update Blog
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="comments-section mt-10">
        <h2 className="text-3xl text-purple-700 font-semibold mb-6">
          Comments
        </h2>
        <div className="comments-list mb-8 space-y-6">
          {comments?.map((comment) => (
            <div
              key={comment._id}
              className="comment flex gap-4 items-start p-4 border border-purple-100 rounded-lg shadow-md"
            >
              <img
                src={comment.userProfilePicture}
                alt={comment.userName}
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
              <div className="comment-content">
                <p className="text-lg font-bold text-purple-600">
                  {comment.userName}
                </p>
                <p className="text-sm text-gray-600 mt-1">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>

        {isOwner ? (
          <p className="text-red-500 text-lg">You cannot comment on your own blog</p>
        ) : (
          <form
            onSubmit={handleCommentPost}
            className="comment-form flex flex-col gap-4"
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows="4"
              className="p-4 border border-purple-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            ></textarea>
            <button
              type="submit"
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
            >
              Post Comment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;