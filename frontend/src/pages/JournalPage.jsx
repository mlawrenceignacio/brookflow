import JournalSidebar from "../components/JournalSidebar";
import NoteToolbar from "../components/NoteToolbar";
import TitleModal from "../components/TitleModal.jsx";
import Spinner from "../components/Spinner.jsx";
import UserHeader from "../components/UserHeader.jsx";
import MainEditor from "../components/journal/MainEditor.jsx";
import Notes from "../components/Notes.jsx";

import useJournalLogic from "../hooks/useJournalLogic.js";

const JournalPage = () => {
  const {
    content,
    setContent,
    title,
    setTitle,
    color,
    setColor,
    showTitleModal,
    setShowTitleModal,
    wordCount,
    countWords,
    isLoading,
    selectedNote,
    setSelectedNote,
    isEditorEmpty,
    showTool,
    setShowTool,
    showNotes,
    setShowNotes,
    editorRef,
    onSave,
    handleFileChange,
    handleCreateNote,
    isSmallScreen,
  } = useJournalLogic();

  return (
    <div className="flex overflow-hidden h-[100dvh] 2xl:max-h-screen relative">
      {isLoading && <Spinner />}
      <JournalSidebar
        handleSelectedNote={setSelectedNote}
        selectedNote={selectedNote}
        setShowTitleModal={setShowTitleModal}
        handleCreateNote={handleCreateNote}
      />

      <div className="flex-1 flex flex-col h-[100dvh] overflow-hidden">
        <UserHeader
          handleCreate={handleCreateNote}
          setShowNotes={setShowNotes}
        />

        <div className="shrink-0 p-3 dark:bg-gray-800 2xl:bg-gray-900 2xl:dark:bg-gray-900 bg-gray-800 relative">
          <NoteToolbar
            setShowTitleModal={setShowTitleModal}
            wordCount={wordCount}
            handleFileChange={handleFileChange}
            isEditorEmpty={isEditorEmpty}
            title={selectedNote ? selectedNote.title : ""}
            showTool={showTool}
            setShowNotes={setShowNotes}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {showNotes && isSmallScreen ? (
            <Notes
              setSelectedNote={setSelectedNote}
              setShowTitleModal={setShowTitleModal}
              setShowNotes={setShowNotes}
              isLoading={isLoading}
            />
          ) : (
            <MainEditor
              title={title}
              color={color}
              content={content}
              setColor={setColor}
              wordCount={wordCount}
              setShowTool={setShowTool}
              setContent={setContent}
              editorRef={editorRef}
              countWords={countWords}
              setShowNotes={setShowNotes}
            />
          )}
        </div>

        {showTitleModal && (
          <TitleModal
            setShowTitleModal={setShowTitleModal}
            setTitle={setTitle}
            onSave={onSave}
            title={title}
          />
        )}
      </div>
    </div>
  );
};

export default JournalPage;
