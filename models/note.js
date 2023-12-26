import mongoose from "mongoose";

// Define the Note schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  links: {
    type: Array,
    default: [],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

// Create the Note model
export const Note = mongoose.model("Note", noteSchema);
