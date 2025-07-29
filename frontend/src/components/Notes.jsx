import useNoteStore from "../store/useNoteStore";
import NoteCard from "./NoteCard";
import { formatDate } from "../utils/helpers";
import Spinner from "./Spinner";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Notes = ({
  setSelectedNote,
  setShowTitleModal,
  setShowNotes,
  isLoading,
}) => {
  const { notes } = useNoteStore();

  return (
    <div className="flex flex-col items-center relative pt-16 dark:bg-gray-700">
      {isLoading && <Spinner />}
      <div
        className="absolute top-3 left-5 bg-gray-800 p-1 rounded-full"
        onClick={() => setShowNotes(false)}
      >
        <MdKeyboardDoubleArrowLeft size={30} color="white" />
      </div>
      {notes ? (
        <div className="flex  flex-col items-center justify-center gap-2 w-[100%] sm:w-[75%] lg:w-[50%] px-4 pb-4">
          {notes.map((note) => {
            const createdAtRaw = note.createdAt;
            const updatedAtRaw = note.updatedAt;

            const createdAt = formatDate(createdAtRaw);
            const updatedAt = formatDate(updatedAtRaw);

            const wasUpdated = createdAtRaw !== updatedAtRaw;

            return (
              <div key={note._id} className="w-full">
                <NoteCard
                  noteTitle={note.title}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                  wasUpdated={wasUpdated}
                  handleSelectedNote={setSelectedNote}
                  note={note}
                  setShowTitleModal={setShowTitleModal}
                  setShowNotes={setShowNotes}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>No notes yet...</div>
      )}
    </div>
  );
};

export default Notes;
