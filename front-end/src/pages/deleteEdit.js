//  import axios from "axios";
//  const handleDelete = async (blogId)=>{
//         const token = localStorage.getItem("token");
//         const res = await axios.post("http://localhost:8282/blogs/deleteBlogs",{blogId:blogId},{headers:{Auth:token}});
//         if(res.status === 200){
//             alert("Blog deleted successfully");
//         }
//         console.log(res);
        
//     }
//     const handleEdit = async (blogId)=>{
//         const token = localStorage.getItem("token");
//         const res = await axios.post("http://localhost:8282/blogs/updateBlogs",{blogId:blogId},{headers:{Auth:token}});
//         if(res.status === 200){
//             alert("Blog updated successfully");
//         }
//         console.log(res);

//     }
// export {handleDelete, handleEdit};
import axios from "axios";

const handleDelete = async (blogId, refreshBlogs) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;

  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://localhost:8282/blogs/deleteBlogs",
    { blogId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (res.status === 200) {
    alert("Blog deleted successfully");
    refreshBlogs && refreshBlogs();
  }
};

export { handleDelete };