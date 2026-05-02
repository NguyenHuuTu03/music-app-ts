import { Router } from "express";
import * as controller from "../../controllers/client/song.controllers";

const router: Router = Router();
router.get("/:slugSong", controller.list);
router.get("/detail/:slugSong", controller.detail);

export const songRoutes = router;
