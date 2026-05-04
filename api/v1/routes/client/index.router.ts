import { topicRoutes } from "./topic.router";
import { Express } from "express";
import { songRoutes } from "./song.router";
import { userRoutes } from "./user.router";
import { favoriteSongRoutes } from "./favorite-song.router";
import * as authMiddleware from "../../../../middleware/client/auth.middleware";
import { searchRoutes } from "./search.router";
import * as userMiddleware from "../../../../middleware/client/user.middleware";

const clientRoutes = (app: Express) => {
  app.use(userMiddleware.infoUser);

  app.use("/topics", topicRoutes);
  app.use("/songs", songRoutes);
  app.use("/users", userRoutes);
  app.use("/favorite-songs", authMiddleware.authRequest, favoriteSongRoutes);
  app.use("/search", searchRoutes);
};

export default clientRoutes;
