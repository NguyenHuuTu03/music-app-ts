import { Router } from "express";
import * as controller from "../../controllers/client/search.controllers";

const router: Router = Router();

router.get("/result", controller.result);

export const searchRoutes = router;
