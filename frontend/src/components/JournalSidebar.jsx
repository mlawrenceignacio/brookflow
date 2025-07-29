import React, { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore.js";
import useNoteStore from "../store/useNoteStore.js";
import NoteCard from "./NoteCard.jsx";
import { GrNotes } from "react-icons/gr";
import { FaCirclePlus } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ImSpinner6 } from "react-icons/im";

import { formatDate } from "../utils/helpers.js";

const JournalSidebar = ({
  handleSelectedNote,
  selectedNote,
  setShowTitleModal,
  handleCreateNote,
}) => {
  const { user, token } = useAuthStore();

  const { notes, getAllNotes } = useNoteStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      await getAllNotes(token);
      setIsLoading(false);
    };

    fetchNotes();
  }, []);

  return (
    <div className="hidden dark:border-r dark:border-gray-500 bg-gray-900 p-5 shrink-0 2xl:flex flex-col min-h-screen w-[380px]">
      {isLoading && (
        <div className="bg-black/30 z-40 flex items-center justify-center">
          <ImSpinner6 size={20} className="animate-spin" />
        </div>
      )}
      <div className="flex gap-5 items-center justify-between bg-gray-700 rounded-md mb-4 py-5 px-4">
        <div className="flex gap-2 items-center">
          <div>
            <img
              src={user.profilePic ? user.profilePic : "/defaultProfile.jpg"}
              alt="User Profile Picture"
              className="rounded-full w-[50px] h-[50px]"
            />
          </div>
          <div>
            <p className="text-white font-bold text-2xl">
              @{user.username.toUpperCase()}
            </p>
          </div>
        </div>
        <button className="text-blue-200" onClick={() => handleCreateNote()}>
          <FaCirclePlus
            size={25}
            data-tooltip-id="create-note-tooltip"
            data-tooltip-content="Create Note"
          />
          <Tooltip id="create-note-tooltip" />
        </button>
      </div>

      {isLoading ? (
        <div className="bg-black/30 z-40 flex items-center justify-center">
          <ImSpinner6 size={20} className="animate-spin" />
        </div>
      ) : (
        <>
          {notes && notes.length > 0 ? (
            <div className="flex flex-col gap-2 mt-5 py-2 overflow-x-hidden overflow-y-auto scrollbar-hide h-full w-full ">
              {notes.map((note) => {
                const createdAtRaw = note.createdAt;
                const updatedAtRaw = note.updatedAt;

                const createdAt = formatDate(createdAtRaw);
                const updatedAt = formatDate(updatedAtRaw);

                const wasUpdated = createdAtRaw !== updatedAtRaw;

                return (
                  <div className="w-[100%] " key={note._id}>
                    <NoteCard
                      noteTitle={note.title}
                      createdAt={createdAt}
                      updatedAt={updatedAt}
                      wasUpdated={wasUpdated}
                      handleSelectedNote={handleSelectedNote}
                      setSelectedNote={handleSelectedNote}
                      selectedNote={selectedNote}
                      note={note}
                      setShowTitleModal={setShowTitleModal}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-green-900 py-8 rounded-md text-white flex items-center justify-center gap-2 ">
              <GrNotes size={18} />
              <p className="text-xl font-mono">No notes yet...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JournalSidebar;
