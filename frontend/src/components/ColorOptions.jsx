import React from "react";
import { ChromePicker } from "react-color";
import Color from "./Color";

const ColorPicker = ({ setColor, color }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="scale-[0.7] sm:scale-100 ">
        <p className="text-center mb-3 font-mono font-medium hidden 2xl:block dark:text-white">
          Change Page Color:
        </p>
        <ChromePicker
          onChange={(color) => setColor(color.hex)}
          color={color}
          className="cursor-pointer"
        />
      </div>

      <div className="hidden 2xl:flex flex-col items-center justify-center h-full gap-5">
        <div>
          <Color colors={["#46A84E", "#2C92CB"]} setColor={setColor} />
        </div>
        <div>
          <Color colors={["#F35696", "#F04A4A"]} setColor={setColor} />
        </div>
        <div>
          <Color colors={["#DDEA65", "#9976F0"]} setColor={setColor} />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
