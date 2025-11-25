import React, { useState } from "react";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Input from "../utils/Input";
import Button from "../utils/Button";
import GoogleButton from "../constant/HandleGoogleLoginAndSignup";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-screen bg-[#1C1C1C] flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#013067] flex flex-col justify-center px-16 py-12">
        <h1 className="text-white text-3xl sm:text-4xl font-bold leading-snug text-left md:text-left">
          Let’s <br />
          Create <br />
          Your <br />
          Account
        </h1>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center px-6 py-12 overflow-auto">
        <div className="max-w-md mx-auto w-full">

          <h1 className="text-4xl font-bold text-center md:hidden text-[#013067] mb-8">
            Signup
          </h1>

          <form onSubmit={handleSignup} className="space-y-5 sm:space-y-6">

            {/* Full Name */}
            <Input
              placeholder="Enter Your Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<MdPerson className="text-[#013067] text-xl" />}
              borderColor="#013067"
              className="flex-1 rounded-full"
            />

            {/* Email */}
            <Input
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MdEmail className="text-[#013067] text-xl" />}
              borderColor="#013067"
                className="flex-1 rounded-full"
            />

            {/* Password */}
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<RiLockPasswordFill className="text-[#013067] text-xl" />}
              borderColor="#013067"
                className="flex-1 rounded-full"
            />

            {/* Retype Password */}
            <Input
              placeholder="Retype Password"
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              icon={<RiLockPasswordFill className="text-[#013067] text-xl" />}
              borderColor="#013067"
                className="flex-1 rounded-full"
            />

            {/* Checkbox */}
            <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
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

            {/* Signup Button */}
            <Button
              type="submit"
              background="#013067"
              textColor="#ffffff"
              className="rounded-full w-full py-3 sm:py-4"
            >
              Signup
            </Button>

            {/* Already Account */}
            <p className="text-center text-gray-700 text-sm sm:text-base">
              Already have an account?{" "}
              <span className="text-[#013067] font-semibold cursor-pointer hover:underline">
                Login
              </span>
            </p>

            {/* Google Signup */}
            <GoogleButton text="Signup with Google" />

          </form>
        </div>
      </div>
    </div>
  );
}
