import React from "react";
import { Link } from "react-router-dom";

const ListCards = (props) => {
  return (
    <div className="flex flex-col w-64 h-[312px] rounded-xl bg-[#F0F0F0]">
      <div className="h-[170px] overflow-hidden">
        <img
          src={props.image}
          className="h-[170px] rounded-t-xl w-64 object-cover"
        />
      </div>
      <div className="flex flex-col gap-5 py-3 px-4 ">
        <div className="flex flex-col gap-3">
          <p className="flex justify-between items-center">
            <span className="font-medium">{props.title}</span>
            <span className="py-1 px-2 rounded-sm bg-[#D6D6D6] font-medium text-xs">
              {props.location}
            </span>
          </p>
          <p className="text-xs font-normal text-[#6C6C6C]">
            {props.description}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <span className="text-xs font-normal">From</span>
            <span className="text-xl font-medium">₹{props.price}</span>
          </span>
          <Link to={`/details/${props.id}`}>
            <button className="bg-[#FFD643] rounded-sm py-1.5 px-2 font-medium text-sm cursor-pointer">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCards;
