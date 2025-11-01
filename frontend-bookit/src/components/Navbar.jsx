import React, { useState } from "react";
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="flex justify-between bg-gray-50 px-32 py-4 shadow-sm h-[87px] items-center">
      <Link to="/" className="logo cursor-pointer">
        <img src="/logo.png" alt="logoImage" height={"55px"} width={"100px"}/>
      </Link>
      <div className="search flex gap-4 w-[443px] h-[42px]">
        <input type="text" placeholder="Search experiences" className="bg-[#EDEDED] py-3 px-4 rounded-sm w-[340px] text-sm"/>
        <button className="flex items-center justify-center py-3 px-5 bg-[#FFD643] rounded-lg font-medium text-sm cursor-pointer">Search</button>
      </div>
    </div>
  );
};

export default Navbar;
