/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Input from "../utils/Input";
import Button from "../utils/Button";
import GoogleButton from "../constant/HandleGoogleLoginAndSignup";
import { registerUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";   

export default function Signup() {
  const navigate = useNavigate(); 

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!agree) return alert("Please agree to Terms & Privacy");
    if (password !== retypePassword) return alert("Passwords do not match");

    const userData = {
      name: fullName,
      email,
      password,
    };

    try {
      setLoading(true);
      const res = await registerUser(userData);
      alert("Account created successfully!");
      navigate("/login"); 
    } catch (error) {
      console.log(error);
      alert(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#1C1C1C] flex flex-col md:flex-row overflow-hidden">

      {/* Left Section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#013067] flex flex-col justify-center px-16 py-12">
        <h1 className="text-white text-3xl sm:text-4xl font-bold leading-snug">
          Let’s <br /> Create <br /> Your <br /> Account
        </h1>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center px-6 py-12 overflow-auto">
        <div className="max-w-md mx-auto w-full">

          <h1 className="text-4xl font-bold text-center md:hidden text-[#013067] mb-8">
            Signup
          </h1>

          <form onSubmit={handleSignup} className="space-y-5 sm:space-y-6">
            <Input
              placeholder="Enter Your Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<MdPerson className="text-[#013067] text-xl" />}
              borderColor="#013067"
              className="rounded-full"
            />

            <Input
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MdEmail className="text-[#013067] text-xl" />}
              borderColor="#013067"
              className="rounded-full"
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<RiLockPasswordFill className="text-[#013067] text-xl" />}
              borderColor="#013067"
              className="rounded-full"
            />

            <Input
              placeholder="Retype Password"
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              icon={<RiLockPasswordFill className="text-[#013067] text-xl" />}
              borderColor="#013067"
              className="rounded-full"
            />

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="w-4 h-4 accent-[#013067]"
              />
              I agree to the{" "}
              <span className="font-semibold text-[#013067] cursor-pointer">
                Terms & Privacy
              </span>
            </label>

            <Button
              type="submit"
              background="#013067"
              textColor="#fff"
              className="rounded-full w-full py-3"
            >
              {loading ? "Creating Account..." : "Signup"}
            </Button>

            <p className="text-center text-gray-700 text-sm">
              Already have an account?{" "}
              <span
                className="text-[#013067] font-semibold cursor-pointer"
                onClick={() => navigate("/login")}    
              >
                Login
              </span>
            </p>

            <GoogleButton text="Signup with Google" />
          </form>
        </div>
      </div>
    </div>
  );
}
