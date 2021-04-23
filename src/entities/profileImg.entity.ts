import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class profileImg {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    profileImgUrl: string;
}
