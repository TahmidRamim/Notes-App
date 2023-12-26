import jwt from "jsonwebtoken";
import { CustomError } from "../../middlewares/ErrorHandler.js";
import { User } from "../../models/user.js";
// a function that logs in a user
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return next(new CustomError("Invalid email or password", 400));
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    const options = {
      secure: true,
      sameSite: "none",
      httpOnly: true,
      maxAge: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };

    res.cookie("id", token, options).status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    next(new CustomError("Error while login ", 500));
  }
};
