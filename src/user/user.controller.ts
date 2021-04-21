import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResponseMessage } from 'src/config/response.util';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.userService.remove(id);
    }

    @Post()
    async createUser(@Body() userData: CreateUserDto) {
        const result = await this.userService.createUser(userData);
        let response = new ResponseMessage().success("성공").body({"insertId": result.id}).build();

        return response;
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: number, @Body() userData: UpdateUserDto) {
        const result = await this.userService.updateUser(id, userData);
        let response = new ResponseMessage().success("성공").build();

        return response;
    }
}
