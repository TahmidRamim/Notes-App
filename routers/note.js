import express from "express";
import { createNote } from "../controllers/notesControllers/createNote.js";
import { deleteNote } from "../controllers/notesControllers/delete.js";
import { getNote } from "../controllers/notesControllers/getNote.js";
import { updateNote } from "../controllers/notesControllers/update.js";
import { Auth } from "../middlewares/Auth.js";

export const notesRouter = express.Router();

notesRouter.post("/create", Auth, createNote);
notesRouter.put("/update", Auth, updateNote);
notesRouter.delete("/:id", Auth, deleteNote);
notesRouter.get("/:id", Auth, getNote);
