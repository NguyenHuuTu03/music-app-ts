import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import * as database from "./config/database";
import mainV1Route from "./api/v1/routes/client/index.router";

const app: Express = express();
const port: number | string = process.env.PORT || 3002;

app.set("views", "./views");
app.set("view engine", "pug");
database.connectDB();

mainV1Route(app);

app.listen(port, () => {
  console.log(`Hãy truy cập vào link: http://localhost:${port}/topics`);
});
