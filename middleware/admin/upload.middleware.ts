import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { Request, Response, NextFunction } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

let streamUpload = (buffer: any) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // (mọi loại file)
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
const upload = async (buffer: any) => {
  let result = await streamUpload(buffer);
  return (result as any).url;
};

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
