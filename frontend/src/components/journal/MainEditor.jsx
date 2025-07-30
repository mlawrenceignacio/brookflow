import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import ColorPicker from "../ColorOptions";
import Editor from "../Editor";

const MainEditor = ({
  title,
  color,
  content,
  setColor,
  wordCount,
  setShowTool,
  setContent,
  editorRef,
  countWords,
  setShowNotes,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 flex-1 p-4 2xl:p-8 flex flex-col  2xl:flex-row 2xl:gap-5 overflow-hidden w-full h-full">
      <div className="flex items-center justify-center between w-[100%] 2xl:w-auto">
        <div
          className="2xl:hidden dark:text-gray-300 text-green-800 text-xl sm:text-3xl lg:text-4xl font-bold font-serif truncate whitespace-nowrap w-[80%] 2xl:max-w-[450px] cursor-pointer text-center"
          data-tooltip-id="title-tooltip"
          data-tooltip-content={title}
        >
          {title ? title.toUpperCase() : "New Note"}
          <Tooltip
            id="title-tooltip"
            className="z-50 text-xs font-sans font-normal"
          />
        </div>

        <div className="hidden 2xl:block dark:hidden">
          <ColorPicker setColor={setColor} color={color} />
        </div>
      </div>

      <div className=" flex items-center justify-center py-1  text-center w-[100%] 2xl:hidden my-2 sm:mb-4 gap-3">
        <p className="flex-1 sm:flex-none sm:w-[30%] dark:bg-gray-900 dark:text-white bg-green-200  rounded-lg py-1 h-full flex items-center justify-center lg:text-xl">
          Word Count: {wordCount}
        </p>
        <div
          onClick={() => {
            setShowTool(true);
            setShowNotes(true);
          }}
          className="flex items-center justify-center dark:bg-gray-900 dark:text-white bg-green-200 px-3 py-2 rounded-lg shrink-0 gap-2"
        >
          <img
            src="/noteIcon.png"
            alt="Note Icon"
            className="w-[25px] h-[25px]"
          />
          <p className="lg:text-xl">View Notes</p>
        </div>
      </div>

      <div className="flex-1 sm:flex sm:items-center sm:justify-center">
        <div className="h-full flex flex-col sm:w-[80%] lg:w-[60%] 2xl:w-[100%]">
          <div className="flex-1 overflow-auto rounded-xl shadow-inner">
            <Editor
              content={content}
              setContent={setContent}
              color={color}
              countWords={countWords}
              editorRef={editorRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainEditor;
