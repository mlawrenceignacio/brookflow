import React, { useEffect, useRef, useState } from "react";

import { toast } from "react-hot-toast";

import useAuthStore from "../store/useAuthStore.js";
import useNoteStore from "../store/useNoteStore.js";

import { createNote, uploadNoteFile } from "../utils/api.js";
import { extractPlainText } from "../utils/helpers.js";

export default function useJournalLogic() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Untitled Note");
  const [color, setColor] = useState("#ffffff");

  const [showTitleModal, setShowTitleModal] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [showTool, setShowTool] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1536);

  const editorRef = useRef();

  const { user, token } = useAuthStore();
  const userId = user.id;

  const { addNote, updateNote } = useNoteStore();

  function handleCreateNote() {
    setSelectedNote(null);
    setContent("");
    setTitle("Untitled Note");
    setColor("#ffffff");
    setWordCount(0);
    setIsEditorEmpty(true);
  }

  async function onSave(e) {
    e.preventDefault();
    setIsLoading(true);

    if (selectedNote) {
      try {
        const updatedNote = {
          _id: selectedNote._id,
          title,
          content,
          color,
        };

        await updateNote(updatedNote._id, updatedNote, token);

        setIsLoading(false);
        setShowTitleModal(false);

        const isRenamedOnly =
          title !== selectedNote.title &&
          content === selectedNote.content &&
          color === selectedNote.color;

        toast.success(
          isRenamedOnly
            ? "Note renamed successfully!"
            : "Note updated successfully!"
        );
      } catch (error) {
        console.error(error);
        toast.error("Error editing note.");
      }

      return;
    }

    const plainText = extractPlainText(content);
    if (!plainText) {
      toast.error("Note content required!");
      return;
    }

    const newNote = {
      userId,
      title,
      content,
      color,
    };

    try {
      const createdNote = await createNote(newNote, token);
      addNote(createdNote);
      setIsLoading(false);
      setContent("");
      setColor("");
      setTitle("Untitled Note");
      setShowTitleModal(false);
      setIsEditorEmpty(true);
      toast.success("Note saved successfully!");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error("Error saving note.");
    }
  }

  async function handleFileChange(e) {
    setIsLoading(true);
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Only image uploads are allowed!");
      return;
    }

    try {
      const uploadedFile = await uploadNoteFile(file, token);

      const fileURL = uploadedFile.url;
      const fileName = file.name;

      setContent((prev) => {
        const updated =
          prev +
          `<img src="${fileURL}" alt="${fileName}" style="max-width:50%; width:100px; margin-top:10px;" />`;

        countWords(updated);
        return updated;
      });

      setIsLoading(false);

      console.log(file, fileName);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Image upload error.");
      setIsLoading(false);
    }
  }

  function countWords(text) {
    const plainText = extractPlainText(text);

    const words = plainText.match(/\b\w+\b/g);
    setWordCount(words ? words.length : 0);
    setIsEditorEmpty(!words || words.length === 0);
  }

  useEffect(() => {
    if (selectedNote) {
      setContent(selectedNote.content || "");
      setTitle(selectedNote.title || "Untitled Note");
      setColor(selectedNote.color || "#ffffff");
      countWords(selectedNote.content || "");

      setTimeout(() => {
        editorRef.current?.focus();
      }, 100);
    } else {
      setContent("");
      setTitle("Untitled Note");
      setColor("#ffffff");
      setWordCount(0);
    }
  }, [selectedNote]);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 1536);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
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
  };
}
