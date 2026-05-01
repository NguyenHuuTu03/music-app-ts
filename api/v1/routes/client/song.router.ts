import { Router } from "express";
import * as controller from "../../controllers/client/song.controllers";

const router: Router = Router();
router.get("/:slugSong", controller.list);

export const songRoutes = router;
