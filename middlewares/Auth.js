import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.id;

    if (!token) {
      return res.status(401).send({
        message: "Please Login First",
      });
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send({
        message: "Please Login First",
      });
    }
    req.user = user;
    next();
  } catch {
    return res.status(500).send({
      message: "Problem while Authenticating",
    });
  }
};
