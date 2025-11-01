import React from "react";
import { FaCheck } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
    const {state} = useLocation();
    const {refId} = state || {};
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex items-center justify-center p-3 mt-16 rounded-full w-20 h-20 text-white bg-green-600">
          <FaCheck size={"80px"} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-medium text-3xl">Booking Confirmed</h2>
          <span className="font-normal text-xl text-[#656565]">Ref ID: {refId}</span>
        </div>
        <Link to="/">
          <button className="bg-[#E3E3E3] py-2 px-4 rounded-sm cursor-pointer">
            Return to Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default Success;
