import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/config/response.util';
import { profileImg } from 'src/entities/profileImg.entity';
import { User } from 'src/entities/user.entity';
import { getConnection, getManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(profileImg)
        private profileImgRepository: Repository<profileImg>
    ) {}


    async findAll(): Promise<User[]> {
        try {
            const [result] = await this.userRepository.query(`SELECT * FROM user`);
            return result
        } catch(err) {
            return err
        }
    }

    async findOne(id: string) {
        try {
            const result = await this.userRepository.query(`SELECT * FROM user WHERE id = ${id}`);
        
            if(result.length < 1) {
                throw new NotFoundException(`User with Id ${id} not found`).getResponse();
            }

            return new ResponseMessage().success("성공").body(result).build();
        } catch(err) {
            return err;
        }
    }

    async remove(id: string) {
        const checkUser = await this.findOne(id);
        if (checkUser.statusCode == 404) {
            return new ResponseMessage().error(404, `User with Id ${id} not found`).build();
        }

        const result = await this.userRepository.query(`DELETE FROM user WHERE id = ${id}`);

        return new ResponseMessage().success("성공").build();
    }

    async createUser(user: CreateUserDto) {
        try {
            const result = await this.userRepository.query(`INSERT INTO user(firstName, lastName) VALUES("${user.firstName}", "${user.lastName}")`);

            return new ResponseMessage().success("성공").body({"insertId": result.insertId}).build();
        } catch (err) {
            return new ResponseMessage().error(400, err.message);
        }
    }

    async updateUser(id: string, user: UpdateUserDto) {
        try {
            const checkUser = await this.findOne(id);
            if (checkUser.statusCode == 404) {
                return new ResponseMessage().error(404, `User with Id ${id} not found`).build();
            }
            const result = await this.userRepository.query(`UPDATE user SET firstName = "${user.firstName}", lastName = "${user.lastName}" WHERE id = ${id}`);
            
            return new ResponseMessage().success("성공").build();
        } catch (err) {
            return new ResponseMessage().error(400, err.message);
        }
    }

    async getUserProfileImg(id: string) {
        const queryRunner = await getConnection().createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const checkUser = await this.findOne(id);
            if (checkUser.statusCode == 404) {
                return new ResponseMessage().error(404, `User with Id ${id} not found`).build();
            }
            const result = await this.userRepository.query(`SELECT firstName, lastName FROM user WHERE user.id = ${id};`);

            const imgResult = await this.profileImgRepository.query(`SELECT profileImgUrl FROM profile_img WHERE userId = ${id};`);

            await queryRunner.commitTransaction();
            await queryRunner.release();

            const imgs: string[] = [];
            for (const img of imgResult) {
                imgs.push(img.profileImgUrl);
            }
            result[0].profileImg = imgs;

            return new ResponseMessage().success("성공").body(result).build();
        } catch(err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            return new ResponseMessage().error(400, err.message);
        }
    }
}
