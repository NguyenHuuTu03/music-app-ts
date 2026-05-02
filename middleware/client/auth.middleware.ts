import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";

export const authRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.cookies.tokenUser) {
    res.redirect("/users/login");
  } else {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
      status: "active",
    }).select("-password");
    if (!user) {
      res.redirect("/users/login");
    } else {
      res.locals.user = user;
      next();
    }
  }
};
