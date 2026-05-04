import { Router } from "express";
import * as controller from "../../controllers/admin/dashboard.controllers";

const router: Router = Router();
router.get("/", controller.index);

export const dashboardRoutes = router;
