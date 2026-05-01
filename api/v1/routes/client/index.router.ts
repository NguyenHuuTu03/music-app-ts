import { topicRoutes } from "./topic.router";
import { Express } from "express";

const mainV1Route = (app: Express) => {
  app.use("/topics", topicRoutes);
};

export default mainV1Route;
