import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import TitleCard from './ShowblogCard'
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom";



const Home = () => {
  const [blogs, setblogs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (e) => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:8282/blogs/searchBlogs?query=" + search, { headers: { Authorization: `Bearer ${token}` } });
    setblogs(res.data.blogs);
  }
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:8282/blogs/getallblogs?page=${currentPage}`, 
      { headers: { 
        Authorization: `Bearer ${token}` } });
    if (res.status === 200) {
      setblogs(res.data.blogs);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    }
  }

  useEffect(() => {

    fetchData(currentPage);

  }, [currentPage]);
  
  return (
    <>
      <Navbar />
      <div className='mt-30 flex flex-col gap-4 max-w-4xl mx-auto'>
        <div className='flex items-center gap-2 mb-4'>
          <input type='text' placeholder='Search blogs...' value={search}
            onChange={(e) => setSearch(e.target.value)} className="border px-3 py-2 rounded w-full pl-10 bg-gray-800 text-white placeholder-gray-400" />
          <button onClick={(e) => handleSearch(e)} className='bg-indigo-500 text-white p-3 rounded'><FaSearch />
          </button>
        </div>
        <div>
          {blogs.map((element) => (
            <div key={element._id} className='mb-6'>

            <TitleCard key={element._id} title={element.title} description={element.description} author={element.author} id={element._id} />
          
          <Link to={`/blog/${element._id}`} className='text-indigo-400 hover:underline flex items-center gap-1 mt-2'>
            💬 {element.commentCount ?? 0} Comments
          </Link>

        </div>
          ))}
        </div>
        <div className='flex justify-center gap-4 mt-6'>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className='px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50'>
            previous
          </button>
          <span className='text-white'>
            page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className='px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50'>
            next
          </button>
        </div>


      </div>
    </>
  )
}

export default Home