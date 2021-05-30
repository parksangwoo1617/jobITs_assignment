import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";
import { initApplication } from "./loader";

dotenv.config({ path: path.join(__dirname, "../.env") });

initApplication()
    .catch(() => console.error("server start failed"));

process.on("uncaughtException", (err: Error) => {
  console.error(err);
});