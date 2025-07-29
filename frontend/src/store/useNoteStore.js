import { create } from "zustand";
import {
  getNotes,
  updateNote as updateNoteAPI,
  deleteAllNotes,
  deleteNote as deleteANote,
} from "../utils/api.js";
import toast from "react-hot-toast";

const useNoteStore = create((set) => ({
  notes: [],

  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),

  setSort: (option) =>
    set((state) => {
      const sorted = [...state.notes];

      switch (option) {
        case "Sort (A-Z)":
          sorted.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "Sort (Z-A)":
          sorted.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "Sort by Newest":
          sorted.sort(
            (a, b) =>
              new Date(b.updatedAt || b.createdAt) -
              new Date(a.updatedAt || a.createdAt)
          );
          break;
        case "Sort by Oldest":
          sorted.sort(
            (a, b) =>
              new Date(a.updatedAt || a.createdAt) -
              new Date(b.updatedAt || b.createdAt)
          );
          break;
      }

      return { notes: sorted };
    }),

  getAllNotes: async (token) => {
    try {
      const allNotes = await getNotes(token);
      set({ notes: allNotes });
    } catch (error) {
      console.error(error);
    }
  },

  updateNote: async (noteId, newNote, token) => {
    try {
      const updatedNote = await updateNoteAPI(noteId, newNote, token);

      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === noteId ? updatedNote : note
        ),
      }));
    } catch (error) {
      console.error(error);
      toast.error("Error updating note.");
    }
  },

  deleteNote: async (noteId, token) => {
    try {
      await deleteANote(noteId, token);

      set((state) => ({
        notes: state.notes.filter((note) => note._id !== noteId),
      }));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting note.");
    }
  },

  deleteAllNotes: async (token) => {
    try {
      await deleteAllNotes(token);

      set({ notes: [] });
      toast.success("All notes deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting all notes.");
    }
  },
}));

export default useNoteStore;
