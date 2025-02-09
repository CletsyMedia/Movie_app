import React, { useState, useEffect } from "react";
import { User, Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinks } from "../constants/navigation";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(searchQuery){
        navigate(`/search?q=${searchQuery}`);
    }
  }, [navigate, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-lg z-60">
      <div className="flex items-center justify-between py-4 px-2 md:px-6">
        <Link to="/" className="text-3xl font-extrabold text-red-600">
          Movie<span className="text-white">Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={link.path}
                className={`flex-1 text-center text-lg font-medium transition duration-300 no-underline ${
                  link.path === "/"
                    ? location.pathname === "/"
                      ? "text-red-500 font-bold"
                      : "text-gray-300 hover:text-red-500"
                    : location.pathname.startsWith(link.path)
                    ? "text-red-500 font-bold"
                    : "text-gray-300 hover:text-red-500"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} className="hidden md: relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 rounded-xl bg-gray-800 text-white border-2 border-transparent focus:border-red-500 focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300"
            >
              <Search size={20} />
            </button>
          </form>

          {/* User Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
            <User size={26} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 py-4 px-6"
      >
        <div className="flex justify-between items-center space-x-4">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-2 cursor-pointer hover:text-red-500 transition duration-300">
                  <Icon size={24} />
                </div>
                <Link
                  to={link.path}
                  className={`flex-1 text-center text-base font-medium transition duration-300 no-underline ${
                    link.path === "/"
                      ? location.pathname === "/"
                        ? "text-red-500 font-bold"
                        : "text-gray-300 hover:text-red-500"
                      : location.pathname.startsWith(link.path)
                      ? "text-red-500 font-bold"
                      : "text-gray-300 hover:text-red-500"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              type="submit"
              className="cursor-pointer text-gray-300 hover:text-red-500 transition duration-300"
            >
              <Search size={20} />
            </button>
            <Link
              to={`/search?q=${searchQuery}`}
              className={`text-gray-300 cursor-pointer hover:text-red-500 transition duration-300 ${
                location.pathname.startsWith("/search") ? "text-red-500" : ""
              }`}
            >
              Search
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
