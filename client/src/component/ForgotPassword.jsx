import React, { useState } from "react";
import productImage from "../assets/product.png";
import { MdEmail } from "react-icons/md";
import Input from "../utils/Input";
import Button from "../utils/Button";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../api/userApi"; 

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await sendOTP({ email });

      toast.success(res.message);
      navigate("/verify-otp", { state: { email } }); // pass email
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
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
        <h1 className="text-white text-4xl font-bold mt-8 hidden md:block">Forgot Password</h1>
      </div>

      <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center px-8 py-12 overflow-auto">
        <div className="max-w-md mx-auto w-full">

          <h1 className="text-4xl font-bold text-center md:hidden text-[#013067] mb-8">
            Forgot Password
          </h1>

          <form onSubmit={handleSendOTP} className="space-y-6">
            
            <Input
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MdEmail className="text-[#013067] text-xl" />}
              className="rounded-full"
            />

            <Button
              type="submit"
              className="w-full rounded-full py-3"
              background="#013067"
              textColor="#fff"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>

            <p className="text-center text-gray-600 text-sm cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </p>

          </form>
        </div>
      </div>

    </div>
  );
}
