import axios from 'axios';
import { API } from '../api';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");

    const fetchBlog = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/blogs/getBlog/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        settitle(res.data.blog.title);
        setdescription(res.data.blog.description);
    }
    useEffect(() => {
        fetchBlog();
    }, []);
    const handleUpdate = async () => {
        const token = localStorage.getItem("token");

        const res = await axios.post(`${API}/blogs/updateBlogs`, 
            { blogId: id, title, description }, 
            { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 200) {
            alert("blog updated successfully");
            navigate("/my-blogs");
        }
    }
    return (
        <div className='max-w-xl mx-auto mt-24 bg-white p-6 rounded-lg shadow-md'>
            <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
            <input
                className="w-full mb-4 p-2 border rounded"
                value={title}
                onChange={(e) => settitle(e.target.value)}
            />

            <textarea
                className="w-full mb-4 p-2 border rounded"
                rows="5"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
            />
            <div className="flex gap-3">
                <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >Update
                </button>
                <button onClick={() => navigate("/my-blogs")}
                    className='px-4 py-2 bg-gray-600 text-white rounded'>
                    Cancel
                </button>
            </div>
        </div>
    )
}

            export default EditBlog