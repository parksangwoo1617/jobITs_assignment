import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "./admin";
import { File } from "./file";

@Entity("post_tbl")
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ type: "varchar", length: 300 })
    content: string;

    @Column({ type: "varchar", length: 300 })
    img: string;

    @JoinColumn()
    @ManyToOne(() => Admin, admin => admin.id)
    admin_id: Admin;
    
    @OneToMany(() => File, file => file.post_id)
    files: File[];
}