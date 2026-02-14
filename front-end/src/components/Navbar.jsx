import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-3xl font-bold text-gray-800">
          Blogs
        </div>

        {/* Navigation Links */}
        <Link to={"/myblogs"}>
          <ul className="hidden md:flex gap-8 text-gray-700 text-lg">
            <li className="cursor-pointer hover:text-gray-900 transition">
              My Blogs
            </li>
          </ul>
        </Link>


        <Link to="/createblog">
          <button className="hidden md:block px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
            Create Blog
          </button>
        </Link>
      </div>
    </nav>
  );
}