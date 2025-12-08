import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productImage from "../assets/product.png";
import Input from "../utils/Input";
import Button from "../utils/Button";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { resetPassword } from "../api/userApi";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await resetPassword({ newPassword, email });

      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset");
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
        <h1 className="text-white text-4xl font-bold mt-8 hidden md:block">Reset Password</h1>
      </div>

      <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center px-8 py-12">
        <div className="max-w-md mx-auto w-full">

          <h1 className="text-4xl font-bold text-center md:hidden text-[#013067] mb-8">
            Reset Password
          </h1>

          <form onSubmit={handleReset} className="space-y-6">

            <Input
              placeholder="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              icon={<RiLockPasswordFill className="text-[#013067] text-xl" />}
              className="rounded-full"
            />

            <Button
              type="submit"
              className="w-full rounded-full py-3"
              background="#013067"
              textColor="#fff"
            >
              {loading ? "Updating..." : "Reset Password"}
            </Button>

          </form>
        </div>
      </div>

    </div>
  );
}
