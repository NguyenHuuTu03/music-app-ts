import { Request, Response } from "express";
import md5 from "md5";
import User from "../../../../models/user.model";
import * as generateHelpers from "../../../../helpers/generate";

// [GET] /users/register
export const register = (req: Request, res: Response) => {
  res.render("client/pages/users/register", {
    pageTitle: "Đăng ký",
  });
};

//[POST] /users/register
export const registerPost = async (req: Request, res: Response) => {
  const exitsEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (exitsEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại!",
    });
    return;
  }
  req.body.password = md5(req.body.password);
  const tokenUser = generateHelpers.generateRandomString(30);
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    tokenUser: tokenUser,
  });
  await user.save();
  res.cookie("tokenUser", tokenUser);
  res.redirect("/topics");
};

// [GET] /users/login
export const login = (req: Request, res: Response) => {
  res.render("client/pages/users/login", {
    pageTitle: "Đăng nhập",
  });
};

//[POST] /users/loginPost
export const loginPost = async (req: Request, res: Response) => {
  const exitsEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (!exitsEmail) {
    res.redirect("/users/login");
    return;
  }
  if (md5(req.body.password) != exitsEmail.password) {
    res.redirect("/users/login");
    return;
  }
  if (exitsEmail.status != "active") {
    res.redirect("/users/login");
    return;
  }
  res.cookie("tokenUser", exitsEmail.tokenUser);
  res.redirect("/topics");
};

// [GET] /users/logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("tokenUser");
  res.redirect("/topics");
};
