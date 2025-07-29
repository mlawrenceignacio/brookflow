import React from "react";
import NoteCardTools from "./NoteCardTools";

const NoteCard = ({
  noteTitle,
  createdAt,
  updatedAt,
  wasUpdated,
  handleSelectedNote,
  note,
  setShowTitleModal,
  setShowNotes,
}) => {
  return (
    <div className="dark:bg-gray-800 bg-green-900 p-4 rounded-md flex items-start w-[100%] ">
      <div className="flex-1 flex  flex-col gap-1">
        <h3
          className="font-bold text-2xl text-green-100 cursor-pointer mb-2 truncate whitespace-nowrap overflow-hidden max-w-[200px] 2xl:max-w-[250px]"
          onClick={() => {
            handleSelectedNote(note);
            setShowNotes(false);
          }}
        >
          {noteTitle.toUpperCase()}
        </h3>
        <div className="text-md text-white flex flex-col ">
          <small>Created: {createdAt}</small>
          {wasUpdated && <small>Updated: {updatedAt}</small>}
        </div>
      </div>

      <div className="relative cursor-pointer ">
        <div>
          <NoteCardTools
            handleSelectedNote={handleSelectedNote}
            note={note}
            setShowTitleModal={setShowTitleModal}
            setShowNotes={setShowNotes}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
