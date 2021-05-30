import { Post } from "./post";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("admin_tbl")
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 45 })
    adminId: string;

    @Column({ type: "varchar", length: 45 })
    password: string;

    @OneToMany(() => Post, post => post.id)
    post: Post[];
}