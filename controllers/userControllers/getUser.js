import { CustomError } from "../../middlewares/ErrorHandler.js";
import { User } from "../../models/user.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(new CustomError("Error while getting user", 500));
  }
};
