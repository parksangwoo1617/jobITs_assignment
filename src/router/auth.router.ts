import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { AuthController } from "../controller/auth.controller";
import { verifyRefreshTokenMiddleware } from "../middleware/verifyToken";

const router: Router = Router();
export const authServiceRouter = (app: Router) => {
    const authController: AuthController = new AuthController();

    app.use('/auth', router);

    router.get(
        "/refresh",
        verifyRefreshTokenMiddleware,
        errorHandler(authController.refreshToken)
    );

    router.post(
        "/login",
        errorHandler(authController.login)
    );

    router.post(
        "/signup",
        errorHandler(authController.createUser)
    );
}