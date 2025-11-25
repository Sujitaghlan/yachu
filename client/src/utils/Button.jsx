import React, { useState } from "react";

export default function Button({
  children,
  type = "button",
  onClick,
  background = "#013067",
  textColor = "#FFFFFF",
  hoverBackground = "#002451",
  padding = "14px 20px",
  width = "100%",
  borderRadius = "30px",
  borderColor = "transparent",
  borderWidth = "0px",
  className = "",
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`font-semibold text-lg transition-all duration-200 ${className}`}
      style={{
        width,
        padding,
        borderRadius,
        backgroundColor: isHover ? hoverBackground : background,
        color: textColor,
        border: `${borderWidth} solid ${borderColor}`,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
