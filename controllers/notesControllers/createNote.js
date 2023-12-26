import { CustomError } from "../../middlewares/ErrorHandler.js";
import { Note } from "../../models/note.js";
export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const newNote = await Note.create({
      title,
      content,
      author: req.user._id,
    });
    res.status(200).json({
      message: "Note created successfully",
      success: true,
    });
  } catch (error) {
    next(new CustomError("Error while creating note", 500));
  }
};
