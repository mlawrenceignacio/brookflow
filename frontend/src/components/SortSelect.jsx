import React, { useEffect, useRef } from "react";
import { BiSort } from "react-icons/bi";
import useNoteStore from "../store/useNoteStore.js";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const SortSelect = ({ options, setShowSortSelect, showSortSelect }) => {
  const dropdownRef = useRef();

  const setSort = useNoteStore((state) => state.setSort);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef && !dropdownRef.current.contains(e.target)) {
        setShowSortSelect(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      data-tooltip-id="sort-notes-tooltip"
      data-tooltip-content="Sort Notes"
    >
      <BiSort
        size={23}
        color="orange"
        onClick={() => setShowSortSelect(!showSortSelect)}
      />
      <Tooltip id="sort-notes-tooltip" />
      {showSortSelect && (
        <div className="fixed dark:bg-gray-900 bg-black top-32 left-16 lg:top-36 lg:left-20 2xl:top-16 2xl:left-[470px] p-4 rounded-lg text-white border dark:border-white border-green-600 z-50">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSort(option);
                  setShowSortSelect(false);
                }}
                className="hover:bg-green-400 px-2 py-1 rounded-lg hover:text-black"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortSelect;
