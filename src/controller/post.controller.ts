import { PostRepository } from "../entity/entity-repository/postRepository";
import { AdminRepository } from "../entity/entity-repository/adminRepository";
import { FileRepository } from "../entity/entity-repository/fileRepository";
import { PostService } from "../service/post.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { upload } from "../config/multer";
import { BadRequestError } from "../shared/exception";
import { PostDto } from "src/shared/dto";

export class PostController {
    private postService: PostService = new PostService(
        PostRepository.getQueryRepository(),
        AdminRepository.getQueryRepository(),
        FileRepository.getQueryRepository()
    );

    public getPosts: BusinessLogic = async (req, res, next) => {
        const posts: object[] = await this.postService.getPosts(+req.query.page);
        res.status(200).json(posts);
    }

    public createPost: BusinessLogic = async (req, res, next) => {
        await this.postService.createPost(req.body, +req.decoded.sub);
        res.status(201).json({
            message: "success"
        });
    }

    public deletePost: BusinessLogic = async (req, res, next) => {
        await this.postService.deletePost(+req.params.post_id, +req.decoded.sub);
        res.status(200).json({
            message: "success"
        })
    }

    public modifyPost: BusinessLogic = async (req, res, next) => {
        await this.postService.modifyPost(req.body, +req.params.post_id, +req.decoded.sub);
        res.status(200).json({
            message: "success"
        })
    }
}