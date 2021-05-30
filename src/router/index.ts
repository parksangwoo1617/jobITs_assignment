import { Router } from "express";
import { authServiceRouter } from "./auth.router";
import { postServiceRouter } from "./post.router";

export const postRouter = () => {
    const app = Router();

    authServiceRouter(app);
    postServiceRouter(app);

    return app;
}