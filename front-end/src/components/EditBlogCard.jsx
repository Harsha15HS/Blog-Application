import { useNavigate } from "react-router-dom";
import { handleDelete } from "../pages/deleteEdit.js";

function EditCard({ blogId,title, refreshBlogs }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row gap-4 max-w-sm bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 text-center">
                {title}
            </h2>
            <button
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg 
                 hover:bg-blue-700 active:bg-blue-800 
                 focus:outline-none focus:ring-2 focus:ring-blue-400"
                 onClick={()=> navigate(`/edit-blog/${blogId}`)}>
                Edit
            </button>
            <button
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg 
                 hover:bg-red-700 active:bg-red-800 
                 focus:outline-none focus:ring-2 focus:ring-red-400"
                 onClick={()=> handleDelete(blogId, refreshBlogs)}>
                Delete
            </button>
        </div>
    );
}

export default EditCard;
