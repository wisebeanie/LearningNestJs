import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResponseMessage } from 'src/config/response.util';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        const result = await this.userService.findAll();
        let response = new ResponseMessage().success("성공").body(result).build();

        return response;
    }

    @Get('/:id')
    findOne(@Param() id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Delete('/:id')
    async remove(@Param() id: string): Promise<void> {
        await this.userService.remove(id);
    }
}
