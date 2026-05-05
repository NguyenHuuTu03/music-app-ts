import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import * as database from "./config/database";
import clientRoutes from "./api/v1/routes/client/index.router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import adminRoutes from "./api/v1/routes/admin/index.router";
import * as systemConfig from "./config/system";
import path from "path";
import methodOverride from "method-override";
const app: Express = express();
const port: number | string = process.env.PORT || 3002;

app.use(express.static(`${__dirname}/public`));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
database.connectDB();

app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.locals.prefixAdmin = systemConfig.pathAdmin.prefixAdmin;

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

/* New Route to the TinyMCE Node module */
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce")),
);

adminRoutes(app);
clientRoutes(app);

app.listen(port, () => {
  console.log(`Hãy truy cập vào link: http://localhost:${port}/topics`);
});
