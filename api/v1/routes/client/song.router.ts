import { Router } from "express";
import * as controller from "../../controllers/client/song.controllers";

const router: Router = Router();
router.get("/:slugSong", controller.list);
router.get("/detail/:slugSong", controller.detail);
router.patch("/like/:typeLike/:songId", controller.like);
router.patch("/favorite/:typeFavorite/:songId", controller.favorite);

export const songRoutes = router;
