import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import MyBlogs from './components/MyBlogs' ;
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog'
import AuthGate from './components/AuthGate';
import SingleBlog from './components/comments/singleBlog';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {


  return (
    <>
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<AuthGate/>}/>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/home" element={<> <Navbar/> <Home/> </>}></Route>
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/createblog" element={<CreateBlog/>}></Route>
        <Route path="/edit-blog/:id" element={<EditBlog/>}></Route>
        <Route path="/blog/:id" element={<SingleBlog />} />
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
