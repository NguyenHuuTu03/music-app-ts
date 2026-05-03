import { Request, Response } from "express";

export const result = (req: Request, res: Response) => {
  res.render("clien/pages/search/result", {
    pageTitle: "Kết quả tìm kiếm",
  });
};
