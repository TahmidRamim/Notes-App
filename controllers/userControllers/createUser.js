import jwt from "jsonwebtoken";
import { CustomError } from "../../middlewares/ErrorHandler.js";
import { User } from "../../models/user.js";
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new CustomError("User already exists", 400));
    }
    if (!username || !email || !password) {
      return next(new CustomError("Something is missing", 400));
    }

    if (password.length < 6) {
      return next(
        new CustomError("Password must be at least 6 characters", 400)
      );
    }

    function isEmailValid(email) {
      // Regular expression for a basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return emailRegex.test(email);
    }

    if (!isEmailValid(email)) {
      return next(new CustomError("Please enter a valid email address", 400));
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    const options = {
      secure: true,
      sameSite: "none",
      httpOnly: true,
      maxAge: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };
    res.cookie("id", token, options);

    res.status(201).json({
      success: true,
      message: "Successfully created a user",
    });
  } catch (err) {
    // If there's an error during user creation, it will be caught here
    return next(new CustomError("Problem while creating user", 500));
  }
};
