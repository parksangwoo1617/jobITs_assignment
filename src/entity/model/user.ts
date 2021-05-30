import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_tbl')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 45 })
    userId: string;

    @Column({ type: "varchar", length: 45 })
    password: string;
}