import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import DarkMode from "../DarkMode/DarkMode";
import { ThemeToggle } from "../DarkMode/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 px-4 py-2 rounded-lg font-semibold shadow-md"
            : "text-gray-200 hover:text-white px-4 py-2 transition-colors duration-300"
        }
        onClick={closeMenu}
      >
        Home
      </NavLink>
      <NavLink
        to="/addBlog"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 px-4 py-2 rounded-lg font-semibold shadow-md"
            : "text-gray-200 hover:text-white px-4 py-2 transition-colors duration-300"
        }
        onClick={closeMenu}
      >
        Add Blog
      </NavLink>
      <NavLink
        to="/allBlogs"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 px-4 py-2 rounded-lg font-semibold shadow-md"
            : "text-gray-200 hover:text-white px-4 py-2 transition-colors duration-300"
        }
        onClick={closeMenu}
      >
        All Blogs
      </NavLink>
      <NavLink
        to="/featuredBlogs"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 px-4 py-2 rounded-lg font-semibold shadow-md"
            : "text-gray-200 hover:text-white px-4 py-2 transition-colors duration-300"
        }
        onClick={closeMenu}
      >
        Featured Blogs
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 px-4 py-2 rounded-lg font-semibold shadow-md"
            : "text-gray-200 hover:text-white px-4 py-2 transition-colors duration-300"
        }
        onClick={closeMenu}
      >
        Wish List
      </NavLink>
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 shadow-lg text-gray-100 sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Navbar Start */}
        <div className="flex items-center">
          <div className="dropdown lg:hidden relative z-50">
            <button
              tabIndex={0}
              className="text-white focus:outline-none"
              aria-label="Menu"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <ul
                className="menu menu-sm bg-gray-800 rounded-lg shadow-lg mt-3 w-52 space-y-2 p-3 absolute top-full left-0 z-50"
              >
                {links}
              </ul>
            )}
          </div>
          <Link
            to="/"
            className="text-3xl font-bold hidden lg:block tracking-wide"
            onClick={closeMenu}
          >
            <span className="text-purple-200">Blog</span>
            <span className="text-purple-300">Website</span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="hidden lg:flex lg:space-x-6">{links}</div>

        {/* Navbar End */}
        
        <div className="flex flex-row gap-4 items-center">
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  {user.photoURL && (
                    <Link onClick={closeMenu}>
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
                      />
                    </Link>
                  )}
                </div>
                <button
                  onClick={() => {
                    logOut();
                    closeMenu();
                  }}
                  className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-800 hover:via-purple-600 hover:to-purple-900 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-x-3">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-800 hover:via-purple-600 hover:to-purple-900 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-800 hover:via-purple-600 hover:to-purple-900 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <ThemeToggle></ThemeToggle>
          {/* <DarkMode></DarkMode> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;