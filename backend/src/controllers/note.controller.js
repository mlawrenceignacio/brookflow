import Note from "../models/note.model.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, color } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: "Note content required!" });
    }

    const note = await Note.create({
      userId,
      title,
      content,
      color,
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note: ", error);
    return res
      .status(500)
      .json({ message: "Server error while creating note." });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const { path, originalname } = req.file;

    return res.status(200).json({
      url: path,
      fileName: originalname,
    });
  } catch (error) {
    console.error("Upload error: ", error);
    return res.status(500).json({ message: "Upload failed." });
  }
};

export const getUserNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const notes = await Note.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Errort fetching notes: ", error);
    res.status(500).json({ message: "Failed to fetch notes." });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    await Note.findByIdAndDelete(noteId);

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.error("Errort deleting note: ", error);
    res.status(500).json({ message: "Error deleting note." });
  }
};

export const deleteAllNotes = async (req, res) => {
  try {
    await Note.deleteMany({});
    res.status(200).json({ message: "All notes deleted successfully." });
  } catch (error) {
    console.error("Errort deleting all notes: ", error);
    res.status(500).json({ message: "Error deleting all notes." });
  }
};

export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const { content, title, color } = req.body;

    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (color !== undefined) note.color = color;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note: ", error);
    res.status(500).json({ message: "Error updating note." });
  }
};
