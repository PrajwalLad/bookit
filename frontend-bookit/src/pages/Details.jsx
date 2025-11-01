import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import API from "../api/axios";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const fetchDetails = async () => {
    const res = await API.get(`/experiences/${id}`);
    setDetails(res.data.data);
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="flex py-5 px-32 gap-7 ">
        <div className="left flex-col">
          <p className="flex gap-2 items-center cursor-pointer w-20">
            <Link to="/">
              <IoMdArrowRoundBack className="w-5 h-5" />
            </Link>
            <span className="font-medium text-sm w-11">Details</span>
          </p>
          <div className="flex w-[765px] h-[381px] mt-5">
            <img
              src={details?.image}
              alt={details?.title}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          <div className="info flex flex-col mt-5 gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-medium text-2xl">{details?.title}</h2>
              <p className="font-normal text-[#6C6C6C]">
                {details?.description}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="font-medium text-lg">Choose date</h3>
                <div className="flex flex-row gap-4">
                  {details?.slots?.map((slot) => (
                    <button
                      key={slot._id}
                      onClick={() => setSelectedDate(slot)}
                      className={`text-sm rounded-sm font-normal py-2 px-3 border cursor-pointer ${
                        selectedDate?._id === slot._id
                          ? "bg-yellow-400 border-yellow-400"
                          : "bg-gray-100 border-gray-300"
                      }`}
                    >
                      {slot.date}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <h3 className="font-medium mb-3">Choose time</h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedDate.times.map((t) => (
                      <button
                        key={t._id}
                        disabled={t.isSoldOut}
                        onClick={() => setSelectedSlot(t)}
                        className={`px-3 py-1.5 text-sm rounded-md border ${
                          t.isSoldOut
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : selectedSlot?._id === t._id
                            ? "bg-yellow-400 border-yellow-400"
                            : "bg-white hover:bg-yellow-100 border-gray-300"
                        }`}
                      >
                        {t.time}
                        {t.isSoldOut ? (
                          <span className="ml-1 text-xs">(Sold out)</span>
                        ) : (
                          <span className="ml-1 text-xs text-gray-500">
                            ({t.seatsLeft} left)
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-medium mb-3">About</h3>
                <p className="text-sm text-gray-600 bg-[#EEEEEE] py-1.5 px-2.5">
                  Secure routes, trained guides, and safety briefings included.
                  Minimum age: 15+.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-[#EFEFEF] rounded-xl p-6 gap-2 mt-10 w-96 h-72">
          <p className="flex items-center justify-between">
            <span className="text-[#656565]">Starts at</span>
            <span className="text-lg">₹{details?.price}</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Quantity</span>
            <span className="flex items-center border-gray-300 rounded-lg gap-2">
              <button
                onClick={decrease}
                className="text-lg font-medium text-gray-600 hover:text-black"
              >
                −
              </button>
              <span className="px-1 text-base">{quantity}</span>
              <button
                onClick={increase}
                className="text-lg font-medium text-gray-600 hover:text-black"
              >
                +
              </button>
            </span>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-[#656565]">Subtotal</span>
            <span className="text-lg">₹{details?.price * quantity}</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-[#656565]">Taxes</span>
            <span className="text-lg">₹59</span>
          </p>
          <div className="bg-[#D9D9D9] h-0.5" />
          <p className="flex items-center justify-between">
            <span className="font-medium text-xl">Total</span>
            <span className="text-lg">₹{details?.price * quantity + 59}</span>
          </p>
          <Link
            to={`/checkout/${id}`}
            state={{
              experience: details.title,
              slotId: selectedSlot?._id,
              date: selectedDate?.date,
              time: selectedSlot?.time,
              quantity,
              subtotal: details.price * quantity,
              taxes: 59,
              total: details.price * quantity + 59,
            }}
          >
            <button
              className={`${
                selectedSlot === null ? "bg-[#D7D7D7]" : "bg-[#FFD643]"
              } w-full px-5 py-3 rounded-xl cursor-pointer font-medium`}
            >
              Confirm
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Details;
