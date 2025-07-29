import React from "react";
import { ImSpinner } from "react-icons/im";

const Spinner = ({ color }) => {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      <ImSpinner className="animate-spin" size={70} color={color} />
    </div>
  );
};

export default Spinner;
