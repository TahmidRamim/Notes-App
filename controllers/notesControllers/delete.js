import { CustomError } from "../../middlewares/ErrorHandler.js";
import { Note } from "../../models/note.js";

export const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) {
      return next(new CustomError("Note not found", 404));
    }
    await Note.findByIdAndDelete(id);
    res.status(200).json({
      message: "Note deleted successfully",
      success: true,
    });
  } catch (error) {
    next(new CustomError("Error while deleting note", 500));
  }
};
