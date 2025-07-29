import React from "react";

const Color = ({ colors, setColor }) => {
  return (
    <div className="flex gap-5">
      {colors.map((color) => (
        <div
          className="w-[60px] h-[60px] rounded-full shadow-lg  border-b border-black cursor-pointer"
          style={{ backgroundColor: `${color}` }}
          onClick={() => setColor(color)}
          key={color}
        ></div>
      ))}
    </div>
  );
};

export default Color;
