import { useState } from "react";
import axios from "axios";
import { API } from "../api";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await axios.post(`${API}/blogs/createBlogs`, {title, description}, {headers:{Authorization:`Bearer ${token}`}});
      if(res.status === 201 || res.status === 200){
        alert("Blog created successfully");
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(error.response?.data?.message || "Failed to create blog. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Upload Blog
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your blog description..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium
                     hover:bg-blue-700 transition"
                     onClick={handleSubmit}
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
