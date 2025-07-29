import axios from "axios";

// USER AUTH CALLS
export const registerUser = async (userData) => {
  return await axios.post("/api/auth/register", userData);
};

export const loginUser = async (credentials) => {
  return await axios.post("/api/auth/login", credentials);
};

export const sendResetCode = async (email) => {
  return await axios.post("/api/auth/forgot-password", { email });
};

export const verifyResetCode = async (email, code) => {
  return await axios.post("/api/auth/verify-reset-code", { email, code });
};

export const resetPass = async (email, newPassword, confirmPass) => {
  return await axios.post("/api/auth/reset-password", {
    email,
    newPassword,
    confirmPass,
  });
};

// NOTE CALLS
export const uploadNoteFile = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post("/api/notes/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(data);

  return data;
};

export const createNote = async (noteData, token) => {
  const { data } = await axios.post("/api/notes", noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getNotes = async (token) => {
  const { data } = await axios.get("/api/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteNote = async (noteId, token) => {
  const { data } = await axios.delete(`/api/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateNote = async (noteId, updatedNote, token) => {
  const { data } = await axios.put(`/api/notes/${noteId}`, updatedNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deleteAllNotes = async (token) => {
  const { data } = await axios.delete("/api/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// USER CALLS
export const uploadProfile = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post("/api/user/upload-profile", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// RANDOM FACTS API
export const getRandomFact = async () => {
  try {
    const { data } = await axios.get(
      "https://uselessfacts.jsph.pl/random.json"
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};
