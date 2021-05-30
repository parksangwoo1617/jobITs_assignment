import { PostRepository } from "../entity/entity-repository/postRepository";
import { AdminRepository } from "../entity/entity-repository/adminRepository";
import { FileRepository } from "../entity/entity-repository/fileRepository";
import { ForbiddenError, BadRequestError } from "../shared/exception";
import { Post } from "src/entity/model";
import { FileDto, PostDto } from "src/shared/dto";
import fs from "fs";

try {
    fs.readFileSync('uploads');
} catch(error) {
    fs.mkdirSync('uploads');
}

export class PostService {
    constructor(
        private postRepository: PostRepository,
        private adminRepository: AdminRepository,
        private fileRepository: FileRepository
    ) { }

    private async isAdmin(user_id: number): Promise<boolean> {
        const admin = await this.adminRepository.findOne({
            where: { id: user_id }
        })
        if(!admin) {
            return false;
        }
        return true;
    }

    public async getPosts(page: number): Promise<object[]> {
        const posts: Post[] = await this.postRepository.getPosts(page);
        const files: FileDto[] = await this.fileRepository.getFiles(page);

        if(!posts || !files) {
            throw new BadRequestError();
        }
        const allPost = [ posts, files ];
        return allPost;
    }

    public async createPost(post: PostDto, user_id: number): Promise<void> {
        if(!await this.isAdmin(user_id)) {
            throw new ForbiddenError();
        }
        const create = await this.postRepository.createPost(post);
        await this.fileRepository.createFile(post, create);
    }

    public async deletePost(post_id: number, user_id: number): Promise<void> {
        if(!await this.isAdmin(user_id)) {
            throw new ForbiddenError();
        }
        await this.postRepository.deletePost(post_id);
        await this.fileRepository.deleteFile(post_id);
    }

    public async modifyPost(post: PostDto, post_id: number, user_id: number): Promise<void> {
        if(!await this.isAdmin(user_id)) {
            throw new ForbiddenError();
        }
        await this.postRepository.modifyPost(post, post_id);
        await this.fileRepository.modifyFile(post, post_id);
    }
}