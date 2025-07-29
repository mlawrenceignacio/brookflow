import User from "../models/user.model.js";

export const uploadProfilePic = async (req, res) => {
  try {
    const { path } = req.file;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (path !== undefined) {
      user.profilePic = path;
      await user.save();
    }

    res.status(200).json({
      imageUrl: path,
    });
  } catch (error) {
    res.status(500).json({ message: error });
    console.error("Error uploading image.");
  }
};
