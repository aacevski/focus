import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import "reflect-metadata";

import logger from "./config/logger";
import dataSource from "./data-source";
import routes from "./routes";

dotenv.config({ path: `${__dirname}/.env` });

dataSource
  .initialize()
  .then(() => {
    logger.info("Data source has been initialized");
  })
  .catch((error) => {
    logger.error(error);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(1337, () => {
  logger.info(`🚀 Server has started...`);
  logger.info("http://localhost:1337");
});
