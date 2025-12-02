import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaUser,
  FaComment,
} from "react-icons/fa";
import Input from "../utils/Input";
import Button from "../utils/Button";
import { sendEmail } from "../api/mailApi";

function ContactUs() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      return alert("Please fill all fields");
    }
    if (!agree) {
      return alert("You must agree to receive commercial information");
    }

    try {
      setLoading(true);
      const res = await sendEmail({
        email: email,
        name: name,
        subject: `Message from ${name}`,
        html: `<p>${message}</p>`,
      });

      if (res.success) {
        alert(res.msg);
        setName("");
        setEmail("");
        setMessage("");
        setAgree(false);
      } else {
        alert(res.msg || "Failed to send email");
      }
    } catch (error) {
      console.error(error);
      alert(error.msg || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 md:px-32 py-6 min-h-screen">
      <h2 className="font-headline text-h1 mb-12 text-primary text-center">
        Contact Us
      </h2>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 w-full max-w-6xl">
        {[
          {
            icon: <FaPhone size={24} />,
            title: "Phone Number",
            lines: ["+977-01-5927179", "+977-9808731770"],
          },
          {
            icon: <FaMapMarkerAlt size={24} />,
            title: "Our Office Location",
            lines: ["Baneshwor, Kathmandu"],
          },
          {
            icon: <FaClock size={24} />,
            title: "Business Hours",
            lines: ["Sunday - Saturday: 10am-6pm"],
          },
        ].map((info, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md flex-1"
          >
            <div className="bg-primary text-white p-5 rounded-full">
              {info.icon}
            </div>
            <div>
              <h4 className="font-headline text-h2 text-primary mb-2">
                {info.title}
              </h4>
              {info.lines.map((line, i) => (
                <p key={i} className="font-paragraph text-tertiary">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <form
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-3xl md:max-w-4xl flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <p className="font-paragraph text-tertiary text-center mb-4">
          Want to know more about our products or services? <br />
          Get in touch today — we’re just a message away!
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<FaUser className="text-primary" />}
            borderColor="#003366"
            textColor="#003366"
            className="flex-1 rounded-full"
          />
          <Input
            type="email"
            placeholder="Enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<FaEnvelope className="text-primary" />}
            borderColor="#003366"
            textColor="#003366"
            className="flex-1 rounded-full"
          />
        </div>

        <Input
          type="text"
          placeholder="Enter Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          icon={<FaComment className="text-primary" />}
          borderColor="#003366"
          textColor="#003366"
          className="rounded-full"
        />

        <label className="flex items-center gap-2 text-sm font-paragraph text-tertiary">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          I agree to receive commercial information from Uchi Yachu
        </label>

        <Button
          type="submit"
          background="#003366"
          hoverBackground="#4169E1"
          textColor="#FFFFFF"
          padding="14px 20px"
          borderRadius="30px"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default ContactUs;
