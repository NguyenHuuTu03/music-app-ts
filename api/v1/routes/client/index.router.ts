import { topicRoutes } from "./topic.router";
import { Express } from "express";
import { songRoutes } from "./song.router";

const clientRoutes = (app: Express) => {
  app.use("/topics", topicRoutes);
  app.use("/songs", songRoutes);
};

export default clientRoutes;
