import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border flex justify-between items-center p-3 mx-4 mt-4 rounded">
      <h1 className="font-bold text-xl">
        <Link to={"/"}>FCC</Link>
      </h1>
      <div className="flex gap-5">
        <Link to={"/"}>
          <span>Home</span>
        </Link>
        <Link to={"/create"}>
          <span>Create</span>
        </Link>
        <Link to={"/about"}>
          <span>About</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
