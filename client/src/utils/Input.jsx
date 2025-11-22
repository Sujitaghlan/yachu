import React from "react";

export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  name, 
  icon,
  borderColor = "#013067",
  textColor = "#013067",
  className = "",
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 bg-white ${className}`}
      style={{
        border: `1.7px solid ${borderColor}`,
      }}
    >
      {icon && <span>{icon}</span>}

      <input
        type={type}
        name={name}                  
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none placeholder:text-gray-500"
        style={{ color: textColor }}
      />
    </div>
  );
}
