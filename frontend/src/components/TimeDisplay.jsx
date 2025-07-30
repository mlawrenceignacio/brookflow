import React, { useEffect, useState } from "react";
import { formatDateAndTime } from "../utils/helpers.js";
import { ImSpinner6 } from "react-icons/im";

const TimeDisplay = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const intervalId = setInterval(() => {
      const now = Date.now();
      const { time, date } = formatDateAndTime(now);

      setTime(time);
      setDate(date);
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="bg-black text-white rounded-lg flex flex-col items-center justify-center xl:h-full py-6 xl:py-0 sm:px-7 lg:py-14">
      {isLoading ? (
        <div className="xl:px-28 px-10">
          <ImSpinner6 className="animate-spin " color="green" size={40} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 ">
          <h2 className="text-2xl xl:text-4xl font-semibold">{time}</h2>
          <p className="text-xl xl:text-2xl text-green-300">{date}</p>
        </div>
      )}
    </div>
  );
};

export default TimeDisplay;
