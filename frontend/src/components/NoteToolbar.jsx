import React, { useRef, useState } from "react";
import { FaSave, FaHome } from "react-icons/fa";
import { IoImage } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import DeleteAllModal from "./DeleteAllModal.jsx";
import SortSelect from "./SortSelect.jsx";

const NoteToolbar = ({
  setShowTitleModal,
  wordCount,
  handleFileChange,
  isEditorEmpty,
  title,
  showTool,
  setShowNotes,
}) => {
  const inputRef = useRef(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSortSelect, setShowSortSelect] = useState(false);

  function handleClick() {
    setShowNotes(false);
    inputRef.current.click();
  }

  return (
    <div className="flex items-center justify-between 2xl:py-2 lg:px-5 lg:py-5 2xl:px-0">
      {showDeleteModal && (
        <DeleteAllModal setShowDeleteModal={setShowDeleteModal} />
      )}

      <div className="ml-2 2xl:ml-5 flex gap-2 items-center">
        <Link to={"/dashboard"} className="mr-2 2xl:mr-5">
          <FaHome
            color="yellowgreen"
            data-tooltip-id="dashboard-tooltip"
            data-tooltip-content="Go to Dashboard"
            className="text-3xl"
          />
          <Tooltip id="dashboard-tooltip" />
        </Link>
        <div
          className={`items-center gap-2 bg-gray-900 px-2 py-1 rounded-lg ${
            showTool ? "flex " : "hidden 2xl:flex"
          }`}
        >
          <button
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            <MdDeleteSweep
              size={26}
              color="red"
              data-tooltip-id="delete-all-tooltip"
              data-tooltip-content="Delete All Notes"
            />
            <Tooltip id="delete-all-tooltip" />
          </button>
          <button onClick={() => setShowSortSelect(!showSortSelect)}>
            <SortSelect
              setShowSortSelect={setShowSortSelect}
              showSortSelect={showSortSelect}
              options={[
                "Sort (A-Z)",
                "Sort (Z-A)",
                "Sort by Newest",
                "Sort by Oldest",
              ]}
            />
          </button>
        </div>
      </div>

      <div
        className="hidden 2xl:block text-white text-3xl font-bold font-serif truncate whitespace-nowrap max-w-[450px] cursor-pointer"
        data-tooltip-id="title-tooltip"
        data-tooltip-content={title}
      >
        {title ? title.toUpperCase() : "New Note"}
        <Tooltip
          id="title-tooltip"
          className="z-50 text-xs font-sans font-normal"
        />
      </div>

      <div className="flex gap-3 mr-1 2xl:mr-5 items-center">
        <div className="hidden 2xl:block dark:bg-gray-500 bg-white py-1 px-2 rounded-full">
          <p>Word Count: {wordCount}</p>
        </div>

        <div className="bg-gray-900 px-2 py-1 rounded-lg flex gap-2 items-center">
          <button onClick={handleClick}>
            <IoImage
              color="violet"
              size={25}
              data-tooltip-id="insert-file-tooltip"
              data-tooltip-content="Insert Image"
            />
            <Tooltip id="insert-file-tooltip" />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden outline-none"
          />

          <button
            onClick={() => setShowTitleModal(true)}
            disabled={isEditorEmpty}
          >
            <FaSave
              color={`${isEditorEmpty ? "gray" : "cyan"}`}
              size={25}
              data-tooltip-id="save-note-tooltip"
              data-tooltip-content="Save Note"
            />
            <Tooltip id="save-note-tooltip" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteToolbar;
