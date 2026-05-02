import { topicRoutes } from "./topic.router";
import { Express } from "express";
import { songRoutes } from "./song.router";
import { userRoutes } from "./user.router";

const clientRoutes = (app: Express) => {
  app.use("/topics", topicRoutes);
  app.use("/songs", songRoutes);
  app.use("/users", userRoutes);
};

export default clientRoutes;
