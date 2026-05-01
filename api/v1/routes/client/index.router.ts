import { topicRoutes } from "./topic.router";
import { Express } from "express";

const clientRoutes = (app: Express) => {
  app.use("/topics", topicRoutes);
};

export default clientRoutes;
