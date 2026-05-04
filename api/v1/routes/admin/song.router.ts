import { Router } from "express";
import * as controller from "../../controllers/admin/song.controllers";
import * as uploadMiddleware from "../../../../middleware/admin/upload.middleware";
// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";
import multer from "multer";
const upload = multer();

const router: Router = Router();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadMiddleware.uploadFields,
  controller.createPost,
);

export const songRoutes = router;
