import React from "react";

const TitleModal = ({ setShowTitleModal, setTitle, onSave, title }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50">
      <form
        onSubmit={onSave}
        className="dark:bg-gray-800 bg-green-900 flex flex-col gap-5 py-8 2xl:py-16 px-10 rounded-lg w-[90%] sm:w-[60%] lg:w-[40%] 2xl:w-[30%] shadow-lg items-center border border-black"
      >
        <p className="text-center text-white text-xl font-mono">
          Enter your note's title:
        </p>
        <input
          type="text"
          placeholder="e.g. My Day"
          value={title}
          className="bg-black rounded-md p-3 text-lg text-center focus:outline-none text-white w-[95%] font-mono border-b border-white"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-evenly text-lg w-full">
          <button
            type="submit"
            className="bg-green-700 rounded-md w-[45%] py-3 border-b border-black text-white hover:bg-green-600"
          >
            Save
          </button>
          <button
            className="bg-red-700 text-white rounded-md w-[45%] py-3 border-b border-black  hover:bg-red-600"
            onClick={() => setShowTitleModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TitleModal;
