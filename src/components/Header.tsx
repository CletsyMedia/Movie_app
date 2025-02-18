import React, { useState, memo } from "react";
import { User, Search } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { navLinks } from "../constants/navigation";

const Header: React.FC = memo(() => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>(
    new URLSearchParams(location.search).get("q") || ""
  );
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false); // Toggle for search visibility
  const navigate = useNavigate();

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?q=${searchQuery}`);
      setIsSearchVisible(false); // Hide the search form after submitting
    }
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle link clicks
  const handleLinkClick = (path: string) => {
    // Clear search query when navigating to other links
    if (path !== "/search") {
      setSearchQuery("");
    }
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-60">
      <div className="flex items-center justify-between py-4 px-2 md:px-6">
        {/* Logo and Navigation */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-red-600"
          onClick={() => handleLinkClick("/")}
        >
          Movie<span className="text-white">Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link, index) => (
            <div key={index}>
              <Link
                to={link.path}
                onClick={() => handleLinkClick(link.path)} // Ensure the search query is cleared when navigating
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
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Search Form (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:block relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
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
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-lg py-4 px-6">
        {isSearchVisible && (
          <div className="absolute bottom-20 left-0 right-0 w-full px-6 py-4 bg-gray-900">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="px-4 py-2 rounded-xl bg-gray-800 text-white border-2 border-transparent focus:border-red-500 focus:outline-none transition-all w-full"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        )}

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
                  onClick={() => handleLinkClick(link.path)}
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

          {/* Search Icon and Text on Mobile */}
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setIsSearchVisible((prev) => !prev)}
              className="cursor-pointer text-gray-300 hover:text-red-500 transition duration-300"
            >
              <Search size={20} />
            </button>
            <span
              onClick={() => setIsSearchVisible((prev) => !prev)}
              className="cursor-pointer text-gray-300 hover:text-red-500 transition duration-300 text-sm"
            >
              Search
            </span>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
