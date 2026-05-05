import { Router } from "express";
import * as controller from "../../controllers/admin/song.controllers";
import * as uploadMiddleware from "../../../../middleware/admin/upload.middleware";
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
router.get("/edit/:songId", controller.edit);
router.patch(
  "/edit/:songId",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadMiddleware.uploadFields,
  controller.editPatch,
);

export const songRoutes = router;
