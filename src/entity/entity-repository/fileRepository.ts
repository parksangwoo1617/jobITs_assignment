import { FileDto, PostDto } from "src/shared/dto";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { File } from "../model/file";

@EntityRepository(File) 
export class FileRepository extends Repository<File> {
    static getQueryRepository() {
        return getCustomRepository(FileRepository);
    }

    public async getFiles(page: number): Promise<FileDto[]> {
        return this.createQueryBuilder("file")
            .select("file.path", "path")
            .addSelect("file.post_id", "post_id")
            .addSelect("file.filename", "filename")
            .orderBy("id", "DESC")
            .limit(5)
            .offset(5 * page)
            .getMany();
    }

    public async createFile(post: PostDto, post_id: number): Promise<void> {
        await this.createQueryBuilder()
            .insert()
            .values([
                { post_id: post_id, path: post.path, filename: post.filename }
            ])
            .execute()
    }

    public async deleteFile(post_id: number): Promise<void> {
        await this.createQueryBuilder()
            .delete()
            .from(File)
            .where("post_id = :id", { id: post_id })
            .execute()
    }

    public async modifyFile(file: PostDto, post_id: number): Promise<void> {
        await this.createQueryBuilder()
            .update({ path: file.path, filename: file.filename })
            .where("file.post_id = :id", { id: post_id })
            .execute()
    }
}