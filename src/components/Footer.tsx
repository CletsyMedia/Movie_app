import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white  py-4 px-2 md:px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm">
          MovieHub. &copy; {new Date().getFullYear()} All rights reserved.
        </div>

        <div className="flex space-x-6 text-sm">
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms-conditions" className="hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
