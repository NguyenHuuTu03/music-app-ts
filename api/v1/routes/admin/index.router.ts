import { dashboardRoutes } from "./dashboard.router";
import { Express } from "express";
import * as systemConfig from "../../../../config/system";
import { topicRoutes } from "./topic.router";
import { songRoutes } from "./song.router";
import { uploadRoutes } from "./upload.router";

const adminRoutes = (app: Express) => {
  const prefixAdmin = systemConfig.pathAdmin.prefixAdmin;
  app.use(prefixAdmin + "/dashboard", dashboardRoutes);
  app.use(prefixAdmin + "/topics", topicRoutes);
  app.use(prefixAdmin + "/songs", songRoutes);
  app.use(prefixAdmin + "/uploads", uploadRoutes);
};

export default adminRoutes;
