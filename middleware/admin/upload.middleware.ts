import { upload } from "../../helpers/uploadToCloudinary";
import { Request, Response, NextFunction } from "express";

// upload 1 file
export const uploadCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.file) {
    const url = await upload((req as any).file.buffer);
    req.body[req.file.fieldname] = url;
    next();
  } else {
    next();
  }
};

// upload nhiều file
export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  for (const key in req.files) {
    req.body[key] = []; // một mảng chứa các url
    const array = (req as any).files[key];
    for (const item of array) {
      try {
        const url = await upload(item.buffer);
        req.body[key].push(url);
      } catch (error) {
        console.log(error);
      }
    }
  }
  next();
};
