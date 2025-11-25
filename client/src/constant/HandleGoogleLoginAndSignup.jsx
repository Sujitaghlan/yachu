import React from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "../utils/Button";

export default function GoogleButton({ text = "Login with Google", onClick }) {
  return (
    <Button
      onClick={onClick}
      background="#A3C2F5"
      textColor="#013067"
      className="flex items-center justify-center gap-3 rounded-full py-3"
    >
      <FcGoogle className="w-5 h-5" />
      <span className="font-semibold">{text}</span>
    </Button>
  );
}
