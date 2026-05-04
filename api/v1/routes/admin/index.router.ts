import { dashboardRoutes } from "./dashboard.router";
import { Express } from "express";
import * as systemConfig from "../../../../config/system";
import { topicRoutes } from "./topic.router";
import { songRoutes } from "./song.router";

const adminRoutes = (app: Express) => {
  const prefixAdmin = systemConfig.pathAdmin.prefixAdmin;
  app.use(prefixAdmin + "/dashboard", dashboardRoutes);
  app.use(prefixAdmin + "/topics", topicRoutes);
  app.use(prefixAdmin + "/songs", songRoutes);
};

export default adminRoutes;
