import { CustomError } from "../../middlewares/ErrorHandler.js";
import { Note } from "../../models/note.js";
export const updateNote = async (req, res, next) => {
  try {
    const { title, content, links = [], id } = req.body;
    const note = await Note.findById(id);
    if (!note) {
      return next(new CustomError("Note not found", 404));
    }
    const newTitle = title || note.title;
    const newContent = content || note.content;
    const newLinks = links || note.links;
    const updatedNote = await Note.updateOne(
      { _id: id },
      {
        $set: {
          title: newTitle,
          content: newContent,
          links: newLinks,
        },
      }
    );
    res.status(200).json({
      message: "Note updated successfully",
      success: true,
    });
  } catch (error) {
    next(new CustomError("Error while updating note", 500));
  }
};
