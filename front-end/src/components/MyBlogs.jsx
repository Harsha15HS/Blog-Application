import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import EditCard from './EditBlogCard'
import axios from 'axios'
import { API } from '../api'

const MyBlogs = () => {
  const [myBlogs, setBlogs] = useState([])

  const fetchMyBlogs = async () => {
  try {
    const token = localStorage.getItem("token")

    const res = await axios.get(`${API}/blogs/getMyBlogs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,   
        },
      }
    )

    if (res.status === 200) {
      setBlogs(res.data.blogs)
    }
  } catch (err) {
    console.error(err.response?.data || err)
  }
}

  useEffect(() => {
    fetchMyBlogs()
  }, [])

  return (
    <>
      <Navbar />

      <div className="mt-30 flex flex-col gap-4 max-w-4xl mx-auto">
        {myBlogs.length === 0 ? (
          <p className="text-gray-500">You haven’t created any blogs yet.</p>
        ) : (
          myBlogs.map((blog) => (
            <EditCard
              key={blog._id}
              blogId={blog._id}
              title={blog.title}
              refreshBlogs={fetchMyBlogs}
            />
          ))
        )}
      </div>
    </>
  )
}

export default MyBlogs

