import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/community";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    content: "",
    image: "",
    category: "Achievement",
  });
  const [isPosting, setIsPosting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [commentText, setCommentText] = useState("");

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoadingMore(true);
      const res = await axios.get(`${API_BASE_URL}/posts?page=${page}`);
      setPosts((prev) => [...prev, ...res.data]); // Append new posts for pagination
    } catch (err) {
      showNotification("Error fetching posts", "error");
    } finally {
      setLoadingMore(false);
    }
  };

  // Handle creating a post
  const handlePost = async () => {
    if (!newPost.content.trim()) return;
    setIsPosting(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/posts`, newPost);
      setPosts([res.data, ...posts]); // Add new post to top
      setNewPost({ content: "", image: "", category: "Achievement" });
      setIsOpen(false);
      showNotification("Post created successfully!", "success");
    } catch (err) {
      showNotification("Failed to post", "error");
    } finally {
      setIsPosting(false);
    }
  };

  // Handle liking a post
  const handleLike = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/posts/${id}/like`);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === id ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (err) {
      showNotification("Error liking post", "error");
    }
  };

  // Handle adding comments
  const handleComment = async (postId) => {
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(`${API_BASE_URL}/posts/${postId}/comment`, {
        text: commentText,
      });
      setCommentText("");
      setCommentingPostId(null);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, res.data.comment] }
            : post
        )
      );
      showNotification("Comment added!", "success");
    } catch (err) {
      showNotification("Error adding comment", "error");
    }
  };

  // Handle "Load More" button
  const handleLoadMore = async () => {
    setPage((prev) => prev + 1);
    fetchPosts();
  };

  // Show notifications
  const showNotification = (message, type) => {
    setNotifications([...notifications, { message, type }]);
    setTimeout(() => setNotifications((prev) => prev.slice(1)), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-[#2563eb]">Community Hub</h1>
        <p className="text-gray-400">Share your journey, inspire others!</p>
      </div>

      {/* Post Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#2563eb] text-white px-4 py-2 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
      >
        + Post
      </motion.button>

      {/* Post Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
            <textarea
              className="w-full p-2 bg-gray-700 rounded"
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
            />
            <select
              className="w-full mt-3 p-2 bg-gray-700 rounded"
              value={newPost.category}
              onChange={(e) =>
                setNewPost({ ...newPost, category: e.target.value })
              }
            >
              <option value="Achievement">Achievement</option>
              <option value="Reading Progress">Reading Progress</option>
              <option value="Meditation Streak">Meditation Streak</option>
            </select>
            <button
              className="mt-4 w-full bg-[#2563eb] py-2 rounded text-white"
              onClick={handlePost}
              disabled={isPosting}
            >
              {isPosting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="fixed top-4 right-4">
        {notifications.map((notif, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded ${
              notif.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notif.message}
          </div>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="max-w-2xl mx-auto p-4">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-4 my-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <span className="text-gray-300 text-sm">Anonymous</span>
            </div>
            <p className="text-white mb-2">{post.content}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="rounded mt-2 lazy-load"
              />
            )}
            <div className="text-gray-500 text-xs mt-2">
              {new Date(post.createdAt).toLocaleString()}
            </div>
            <div className="flex items-center mt-3 space-x-4">
              <button
                onClick={() => handleLike(post._id)}
                className="text-gray-400 hover:text-[#2563eb] flex items-center"
              >
                ❤️ {post.likes}
              </button>
              <button
                onClick={() => setCommentingPostId(post._id)}
                className="text-gray-400 hover:text-[#2563eb]"
              >
                💬 Comment
              </button>
            </div>
            {commentingPostId === post._id && (
              <div className="mt-3">
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 rounded"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  onClick={() => handleComment(post._id)}
                  className="bg-[#2563eb] px-3 py-1 mt-2 rounded"
                >
                  Comment
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center my-6">
        <button
          className="bg-gray-700 px-4 py-2 rounded text-white"
          onClick={handleLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Community;
