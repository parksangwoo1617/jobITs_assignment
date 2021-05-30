import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import { PostController } from "../controller/post.controller";
import { upload } from "../config/multer";

const router: Router = Router();
export const postServiceRouter = (app:Router) => {
    const postController: PostController = new PostController();

    app.use("/posts", router);

    router.get(
        "/",
        verifyTokenMiddleware,
        errorHandler(postController.getPosts)
    );

    router.post(
        "/",
        verifyTokenMiddleware,
        upload.single('img'),
        errorHandler(postController.createPost)
    );

    router.patch(
        "/:post_id",
        verifyTokenMiddleware,
        upload.single('img'),
        errorHandler(postController.modifyPost)
    );

    router.delete(
        "/:post_id",
        verifyTokenMiddleware,
        errorHandler(postController.deletePost)
    );
}