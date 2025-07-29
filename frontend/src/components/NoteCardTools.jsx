import React from "react";
import { BiRename } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import useNoteStore from "../store/useNoteStore.js";
import useAuthStore from "../store/useAuthStore.js";

const NoteCardTools = ({
  handleSelectedNote,
  note,
  setShowTitleModal,
  setShowNotes,
}) => {
  const { token } = useAuthStore();
  const deleteNote = useNoteStore((state) => state.deleteNote);

  return (
    <div className="flex gap-1 items-center justify-center">
      <div>
        <BiRename
          color="white"
          size={20}
          data-tooltip-id="rename-tooltip"
          data-tooltip-content="Rename"
          onClick={() => {
            setShowTitleModal(true);
            handleSelectedNote(note);
          }}
        />
        <Tooltip id="rename-tooltip" />
      </div>
      <div>
        <MdDelete
          color="red"
          size={20}
          data-tooltip-id="delete-tooltip"
          data-tooltip-content="Delete"
          onClick={() => {
            deleteNote(note._id, token);
            handleSelectedNote(null);
          }}
        />
        <Tooltip id="delete-tooltip" />
      </div>
      <div>
        <FaEdit
          color="yellowgreen"
          size={20}
          data-tooltip-id="edit-tooltip"
          data-tooltip-content="Edit Note"
          onClick={() => {
            handleSelectedNote(note);
            setShowNotes(false);
          }}
        />
        <Tooltip id="edit-tooltip" />
      </div>
    </div>
  );
};

export default NoteCardTools;
