import { Router } from "express";
import * as controller from "../../controllers/client/song.controllers";
import * as authMiddleware from "../../../../middleware/client/auth.middleware";

const router: Router = Router();
router.get("/:slugSong", controller.list);
router.get("/detail/:slugSong", authMiddleware.authRequest, controller.detail);
router.patch(
  "/like/:typeLike/:songId",
  authMiddleware.authRequest,
  controller.like,
);
router.patch(
  "/favorite/:typeFavorite/:songId",
  authMiddleware.authRequest,
  controller.favorite,
);

export const songRoutes = router;
