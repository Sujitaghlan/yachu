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
    if (!token) return navigate("/login");

    if (!name.trim() || !email.trim() || !message.trim()) {
      return alert("Please fill all fields");
    }
    if (!agree) {
      return alert("You must agree to receive commercial information");
    }

    try {
      setLoading(true);
      const res = await sendEmail({
        email,
        name,
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

  const contactInfos = [
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
  ];

  return (
    <div className="w-full py-10 bg-white">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto animate-fade-in-up">
        <h2 className="font-headline text-h1 mb-10 md:mb-12 text-primary text-center">
          Contact Us
        </h2>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 w-full">
          {contactInfos.map((info, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1"
            >
              <div className="bg-primary text-white p-4 rounded-full flex-shrink-0">
                {info.icon}
              </div>
              <div>
                <h4 className="font-headline text-h2 text-primary mb-2">{info.title}</h4>
                {info.lines.map((line, i) => (
                  <p key={i} className="font-paragraph text-tertiary text-base">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <form
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl mx-auto flex flex-col gap-6 animate-fade-in-up"
          onSubmit={handleSubmit}
        >
          <p className="font-paragraph text-tertiary text-center mb-4 text-lg">
            Want to know more about our products or services? <br />
            Get in touch today — we're just a message away!
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

          <div className="relative">
            <div className="absolute left-4 top-4 text-primary">
              <FaComment className="text-xl" />
            </div>
            <textarea
              placeholder="Enter Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className="w-full pl-12 pr-4 py-4 border-2 border-[#003366] rounded-2xl text-black outline-none font-paragraph text-lg focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
            />
          </div>

          <label className="flex items-center gap-3 text-base font-paragraph text-tertiary">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-5 h-5 accent-primary"
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
            className="text-lg font-semibold"
          >
            {loading ? "Submitting..." : "Submit Message"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
