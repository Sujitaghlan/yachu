import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import productImage from "../assets/product.png";
import Input from "../utils/Input";
import Button from "../utils/Button";
import GoogleButton from "../constant/HandleGoogleLoginAndSignup";
import { googlePopup } from "../firebase/firebaseAuth";
import { loginUser, googleLogin } from "../api/userApi";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      setLoading(true);
      const res = await loginUser(userData);

      if (res.accessToken && res.user) {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("user", JSON.stringify(res.user));

        if (res.user.profileImage) {
          localStorage.setItem("profileImage", res.user.profileImage);
        } else {
          localStorage.removeItem("profileImage");
        }

        if (res.user.isAdmin) {
          alert("Admin login successful!");
          navigate("/admin");
        } else {
          alert("Login successful!");
          navigate("/"); 
        }
      } else {
        alert("Login failed: invalid user data!");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const idToken = await googlePopup();
      const data = await googleLogin(idToken);
      console.log("Google Login Response:", data);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Authenticated User:", data.user);
      alert("Login Successful!");
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="w-full h-screen bg-[#1C1C1C] flex flex-col md:flex-row overflow-hidden">
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

      <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center px-8 py-12 overflow-auto">
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<RiLockPasswordFill className="text-[#013067] text-xl" />}
              className="rounded-full"
            />

            <p className="text-center text-gray-600 text-sm cursor-pointer hover:underline">
              Forgot password?
            </p>

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

            <GoogleButton
              text="Login with Google"
              onClick={handleGoogleLogin}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
