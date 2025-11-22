import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import productImage from "../assets/product.png";
import Input from "../utils/Input";
import Button from "../utils/Button";
import GoogleButton from "../constant/HandleGoogleLoginAndSignup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // handle login logic here
  };

  return (
    <div className="w-full h-screen bg-[#1C1C1C] flex flex-col md:flex-row overflow-hidden">

      {/* Left Section (Image + Blue background) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#013067] flex flex-col items-center justify-center px-8 py-12">
        <div className="w-52 h-52 rounded-full bg-[#0a396f] overflow-hidden flex items-center justify-center shadow-lg">
          <img
            src={productImage}
            className="w-full h-full object-cover"
            alt="product"
          />
        </div>
        <h1 className="text-white text-4xl font-bold mt-8 hidden md:block">
       Login
        </h1>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center px-8 py-12 overflow-auto">
        <div className="max-w-md mx-auto w-full">

          <h1 className="text-4xl font-bold text-center md:hidden text-[#013067] mb-8">
            Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MdEmail className="text-[#013067] text-xl" />}
              className="flex-1 rounded-full"
            />

            {/* Password Input */}
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<RiLockPasswordFill className="text-[#013067] text-xl" />}
              className="flex-1 rounded-full"
            />

            {/* Forgot Password */}
            <p className="text-center text-gray-600 text-sm cursor-pointer hover:underline">
              Forgot password?
            </p>

            <Button type="submit">Login</Button>

            <p className="text-center text-gray-600 text-sm">
              Don’t have an account?{" "}
              <span className="text-[#013067] cursor-pointer font-semibold hover:underline">
                Sign up
              </span>
            </p>

            {/* Google Login */}
            <GoogleButton text="Login with Google" />
          </form>
        </div>
      </div>
    </div>
  );
}
