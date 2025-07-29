import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "brookflow-notes",
      resource_type: "auto",
    };
  },
});

const upload = multer({ storage });

export default upload;
