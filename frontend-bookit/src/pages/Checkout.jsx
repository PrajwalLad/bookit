import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { experience, slotId, date, time, quantity, subtotal, taxes, total } =
    state || {};
  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handlePromoApply = async () => {
    try {
      setIsApplying(true);
      if (promo.toLowerCase() === "welcome10") {
        setDiscount(0.1);
      } else if (promo.toLowerCase() === "festive20") {
        setDiscount(0.2);
      } else {
        alert("Invalid promo code");
        setDiscount(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsApplying(false);
    }
  };

  const discountedSubtotal = subtotal * (1 - discount);
  const totalAmount = discountedSubtotal + taxes;

  const handleBookingConfirm = async () => {
    try {
      setIsConfirming(true);
      const bookingData = {
        experienceId: id,
        slotId,
        user: { name: fullName, email },
        promoCode: promo,
        totalPrice: totalAmount,
      };

      const res = await API.post("/booking", bookingData);
      console.log(res);

      alert("Booking confirmed successfully!");
      navigate("/success", {
        state: {
          refId: res.data.refId,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong while confirming the booking.");
    } finally {
      setIsConfirming(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex py-5 px-32 gap-7 ">
        <div className="left flex flex-col">
          <p className="flex gap-2 items-center cursor-pointer w-20">
            <Link to={`/details/${id}`}>
              <IoMdArrowRoundBack className="w-5 h-5" />
            </Link>
            <span className="font-medium text-sm w-11">Checkout</span>
          </p>
          <form className="flex flex-col bg-[#EFEFEF] rounded-xl p-6 gap-4 mt-5 w-[739px]">
            <div className="flex gap-5">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-sm font-medium text-gray-700">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <input
                id="promo"
                value={promo}
                type="text"
                placeholder="Promo code"
                onChange={(e) => setPromo(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => handlePromoApply()}
                disabled={isApplying}
                className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 text-sm font-medium cursor-pointer"
              >
                {isApplying ? "Applying..." : "Apply"}
              </button>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <input type="checkbox" />I agree to the terms and safety policy
            </label>
          </form>
        </div>
        <div className="right bg-[#EFEFEF] rounded-xl p-6 w-[320px] h-fit mt-9">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">Experience</span>
            <span className="font-medium">{experience || "—"}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">Date</span>
            <span>{date || "—"}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">Time</span>
            <span>{time || "—"}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">Qty</span>
            <span>{quantity || 1}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{discountedSubtotal.toFixed(0)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2 text-green-600 text-sm">
              <span>Promo Discount</span>
              <span>-{(discount * 100).toFixed(0)}%</span>
            </div>
          )}
          <div className="flex justify-between mb-3 text-sm">
            <span className="text-gray-600">Taxes</span>
            <span>₹{taxes || 59}</span>
          </div>

          <div className="border-t border-gray-300 my-3" />

          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(0)}</span>
          </div>

          <button
            onClick={() => handleBookingConfirm()}
            disabled={isConfirming}
            className="w-full bg-[#FFD643] hover:bg-[#f2c800] py-3 rounded-lg font-medium cursor-pointer"
          >
            {isConfirming ? "Processing..." : "Pay and Confirm"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
