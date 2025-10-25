import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { path: "/", pathName: "Home" },
  { path: "/create", pathName: "Create" },
  { path: "/about", pathName: "About" },
  { path: "/search", pathName: "Search" },
];

const Navbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="border flex justify-between items-center p-3 mx-4 mt-4 rounded">
        <h1 className="font-bold text-xl">
          <Link to={"/"}>FCC</Link>
        </h1>
        <div className="flex gap-5">
          {navLinks.map((nav) => (
            <Link key={nav.pathName} to={nav.path}>
              <span>{nav.pathName}</span>
            </Link>
          ))}
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
