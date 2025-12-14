import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import productImage from "../assets/product.png";
import Input from "../utils/Input";
import Button from "../utils/Button";
import GoogleButton from "../constant/HandleGoogleLoginAndSignup";
import { googlePopup } from "../firebase/firebaseAuth";
import { loginUser, googleLogin } from "../api/userApi";
import { toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginUser({ email, password });

      if (res.accessToken && res.user) {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        res.user.imageUrl
          ? localStorage.setItem("profileImage", res.user.imageUrl)
          : localStorage.removeItem("profileImage");

        window.dispatchEvent(new Event("userLogin"));

        toast.success("Login Successful!");
        navigate(res.user.isAdmin ? "/admin" : "/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const idToken = await googlePopup();
      const data = await googleLogin(idToken);

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("profileImage", data.user.imageUrl);

      window.dispatchEvent(new Event("userLogin"));
      navigate(window.history.length > 1 ? -1 : "/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="w-full max-md:h-screen bg-[#1C1C1C] flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/2 bg-[#013067] flex flex-col items-center justify-center px-8 py-12">
        <div className="w-52 h-52 rounded-full bg-[#0a396f] overflow-hidden flex items-center justify-center shadow-lg">
          <img src={productImage} className="w-full h-full object-cover" alt="product" />
        </div>
        <h1 className="text-white text-4xl font-bold mt-8 hidden md:block">
          Login
        </h1>
      </div>

      <div className="w-full h-screen md:w-1/2 bg-white flex flex-col justify-center px-8 py-12">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-4xl font-bold text-center md:hidden text-[#013067] mb-8">
            Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MdEmail className="text-[#013067] text-xl" />}
              className="rounded-full"
            />

            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<RiLockPasswordFill className="text-[#013067] text-xl" />}
              rightIcon={
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="text-[#013067] text-xl" />
                  ) : (
                    <AiFillEye className="text-[#013067] text-xl" />
                  )}
                </div>
              }
              className="rounded-full"
            />

            <Link
              to="/forgot-password"
              className="text-center text-gray-600 text-sm hover:underline py-4 px-4"
            >
              Forgot password?
            </Link>

            <Button
              type="submit"
              className="w-full rounded-full py-3"
              background="#013067"
              textColor="#fff"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-gray-600 text-sm">
              Don’t have an account?{" "}
              <span
                className="text-[#013067] cursor-pointer font-semibold hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>

            <GoogleButton text="Login with Google" onClick={handleGoogleLogin} />
          </form>
        </div>
      </div>
    </div>
  );
}
