import { Body, Controller, Delete, Get, Header, Headers, HttpService, NotFoundException, Param, Patch, Post, Query, Res } from '@nestjs/common';
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
    async findOne(@Param('id') id: string) {
        const result = await this.userService.findOne(id);

        return result
    }

    @Delete('/:id')
    async remove(@Param('id') id: string) {
        const result = await this.userService.remove(id);

        return result;
    }

    @Post()
    async createUser(@Body() userData: CreateUserDto) {
        const result = await this.userService.createUser(userData);

        return result;
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
        const result = await this.userService.updateUser(id, userData);

        return result;
    }

    @Get('/:id/img')
    async getUserProfileImg(@Param('id') id: string) {
        const result = await this.userService.getUserProfileImg(id);

        return result;
    }



}
