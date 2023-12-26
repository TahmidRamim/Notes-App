import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { notesRouter } from "./routers/note.js";
import { userRouter } from "./routers/user.js";
export const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", notesRouter);
const corsOptions = {
  origin: "http://example.com", // Allow requests from this origin
  methods: "GET,POST,PUT,DELETE", // Allow these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    message: err.message,
  });
});
