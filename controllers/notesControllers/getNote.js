import { CustomError } from "../../middlewares/ErrorHandler.js";
import { Note } from "../../models/note.js";

export const getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return next(new CustomError("Note not found", 404));
    }
    res.status(200).json(note);
  } catch (error) {
    next(new CustomError("Error while getting note", 500));
  }
};
