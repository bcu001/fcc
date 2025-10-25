import React from "react";

const Button = ({ text, color = "var(--primary)" }) => {
  return (
    <span
      style={{
        backgroundColor: color,
      }}
      className={`font-bold text-[var(--primaryForeground)] rounded px-5 py-2 flex justify-center items-center active:scale-95 transition-all duration-75 cursor-pointer`}
    >
      {text}
    </span>
  );
};

export default Button;
