import { Request, Response } from "express";

// [POST] /admin/uploads
export const index = (req: Request, res: Response) => {
  res.json({
    location: req.body.file,
  });
};
