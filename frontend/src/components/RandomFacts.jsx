import React, { useEffect, useState } from "react";
import { getRandomFact } from "../utils/api.js";
import useAuthStore from "../store/useAuthStore.js";
import { PiLightbulbFilamentDuotone } from "react-icons/pi";
import { ImSpinner6 } from "react-icons/im";

const RandomFacts = () => {
  const [randomFact, setRandomFact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthStore();

  useEffect(() => {
    setIsLoading(true);
    if (!user?.id) return;

    const userId = user.id;
    const today = new Date().toLocaleDateString();

    const savedFact = localStorage.getItem(`savedFact-${userId}`);
    const savedDate = localStorage.getItem(`savedDate-${userId}`);

    if (savedFact && savedDate === today) {
      setRandomFact(savedFact);
      setIsLoading(false);
    } else {
      async function getFact() {
        const fact = await getRandomFact();
        setRandomFact(fact.text);

        localStorage.setItem(`savedFact-${userId}`, fact.text);
        localStorage.setItem(`savedDate-${userId}`, today);
      }

      getFact();
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="dark:bg-gray-600 bg-green-400 h-full rounded-lg p-5  flex flex-col items-center justify-center relative border border-black">
      {isLoading && (
        <div className="absolute bg-black/70 rounded-lg inset-0 flex items-center justify-center">
          <ImSpinner6 className="animate-spin" size={30} color="orange" />
        </div>
      )}
      <div className="flex items-center justify-center gap-2 mb-3">
        <PiLightbulbFilamentDuotone size={25} color="maroon" />
        <h3 className="text-xl xl:text-2xl font-semibold font-mono ">
          Daily Fact:
        </h3>
      </div>
      <p className="text-lg xl:text-xl text-center">"{randomFact}"</p>
    </div>
  );
};

export default RandomFacts;
