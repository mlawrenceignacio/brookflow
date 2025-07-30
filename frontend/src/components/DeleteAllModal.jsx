import React from "react";

import useAuthStore from "../store/useAuthStore.js";
import useNoteStore from "../store/useNoteStore.js";

const DeleteAllModal = ({ setShowDeleteModal }) => {
  const { token } = useAuthStore();
  const deleteAllNotes = useNoteStore((state) => state.deleteAllNotes);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
      <div className="bg-black text-white py-10 2xl:py-16 px-3 2xl:px-5 rounded-xl border border-white w-[90%] sm:w-[65%] lg:w-[40%] 2xl:w-[450px]">
        <p className="text-center mb-8 text-lg 2xl:text-xl font-mono px-5">
          Are you sure you want to delete all notes? This action can't be
          undone.
        </p>
        <div className="flex items-center justify-center gap-5 text-lg w-full">
          <button
            className="bg-green-900 py-2 rounded-lg w-[30%] hover:bg-green-700"
            onClick={() => {
              deleteAllNotes(token);
              setShowDeleteModal(false);
            }}
          >
            I'm Sure
          </button>
          <button
            className="bg-red-900 py-2 rounded-lg w-[30%] hover:bg-red-700"
            onClick={() => {
              setShowDeleteModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAllModal;
