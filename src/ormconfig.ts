import { ConnectionOptions } from "typeorm";
import { config } from "./config";
import { Post, Admin, User, File } from "./entity/model";

export const createOptions: ConnectionOptions = {
    type: "mysql",
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    synchronize: config.dbSynchronize,
    entities: [
        Post, Admin, User, File
    ]
}