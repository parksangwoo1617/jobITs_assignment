import { Post } from "./post";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("file_tbl")
export class File {
    @JoinColumn()
    @PrimaryColumn()
    @ManyToOne(() => Post, post => post.id)
    post_id: number;

    @Column({ type: "varchar", length: 300 })
    path: string;

    @Column({ type: "varchar", length: 45 })
    filename: string;
}