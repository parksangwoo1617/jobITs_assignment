import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Post } from "../model/post";
import { PostDto } from "../../shared/dto";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    static getQueryRepository() {
        return getCustomRepository(PostRepository);
    }

    public async getPosts(page: number): Promise<Post[]> {
        return this.createQueryBuilder("post")
            .select("post.title", "title")
            .addSelect("post.content", "content")
            .addSelect("post.id", "id")
            .orderBy("id", "DESC")
            .limit(5)
            .offset(5 * page)
            .getMany()
    }

    public async createPost(post: PostDto): Promise<number> {
        await this.createQueryBuilder()
            .insert()
            .values([
                { title: post.title, content: post.content }
            ])
            .execute()
        return this.createQueryBuilder("post")
            .select("post.id", "id")
            .where("post.title = :title", { title: post.title })
            .getRawOne()
    }

    public async deletePost(post_id: number): Promise<void> {
        await this.createQueryBuilder()
            .delete()
            .from(Post)
            .where("id = :id", { id: post_id })
            .execute()
    }

    public async modifyPost(post: PostDto, post_id: number): Promise<void> {
        await this.createQueryBuilder()
            .update({ title: post.title, content: post.content })
            .where("post.id = :id", { id: post_id })
            .execute()
    }
}