import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productImage from "../assets/product.png";
import { toast } from "react-hot-toast";
import Input from "../utils/Input";
import Button from "../utils/Button";
import { verifyOTP } from "../api/userApi";
import { MdOutlineVerified } from "react-icons/md";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await verifyOTP({ otp, email });

      toast.success("OTP Verified!");
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#1C1C1C] flex flex-col md:flex-row overflow-hidden">

      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#013067] flex flex-col items-center justify-center px-8 py-12">
        <div className="w-52 h-52 rounded-full bg-[#0a396f] flex items-center justify-center overflow-hidden">
          <img src={productImage} className="w-full h-full object-cover" alt="product" />
        </div>
        <h1 className="text-white text-4xl font-bold mt-8 hidden md:block">Verify OTP</h1>
      </div>

      <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center px-8 py-12">
        <div className="max-w-md mx-auto w-full">

          <h1 className="text-4xl font-bold text-center md:hidden text-[#013067] mb-8">
            Verify OTP
          </h1>

          <form onSubmit={handleVerify} className="space-y-6">

            <Input
              placeholder="Enter 6-digit OTP"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              icon={<MdOutlineVerified className="text-[#013067] text-xl" />}
              className="rounded-full"
            />

            <Button
              type="submit"
              className="w-full rounded-full py-3"
              background="#013067"
              textColor="#fff"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <p className="text-center text-gray-600 text-sm cursor-pointer hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Resend OTP?
            </p>

          </form>
        </div>
      </div>

    </div>
  );
}
