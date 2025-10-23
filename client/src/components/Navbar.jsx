import React from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Button";

const Navbar = () => {
  return (
    <nav className="border flex justify-between items-center p-3 mx-4 mt-4 rounded">
      <h1 className="font-bold text-xl">
        <Link to={"/"}>Fantasy Character Creator</Link>
      </h1>
      <div className="flex gap-5">
        <Link to={"/"}>
          <Button text={"Home"} />
        </Link>
        <Link to={"/create"}>
          <Button text={"Create"} />
        </Link>
        <Link to={"/about"}>
          <Button text={"About"} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
