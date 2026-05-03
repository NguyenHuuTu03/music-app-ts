import { Router } from "express";
import * as controller from "../../controllers/client/search.controllers";

const router: Router = Router();

router.get("/:type", controller.result);

export const searchRoutes = router;
