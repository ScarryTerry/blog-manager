import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateUserBodyDto,
  UpdateUserBodyDto,
  UserDto,
} from 'src/dtos/user.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from '../services/user.service';
import { RolesService } from 'src/services/roles.service';
import mongoose from 'mongoose';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @ApiOperation({ summary: 'Endpoint to get list of users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Get('/all')
  async getAll(): Promise<User[]> {
    return this.userServise.getAllUsers();
  }

  @ApiOperation({ summary: 'Endpoint to get user by Id' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userServise.getUserById(id);
  }

  @ApiOperation({ summary: 'Endpoint to create new user' })
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Post('/create')
  async createUser(@Body() userDto: CreateUserBodyDto): Promise<User> {
    return this.userServise.createUser(userDto);
  }

  @ApiOperation({ summary: 'Endpoint to update user by email' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Put('/update')
  async updateUserByEmail(
    @Body() userDto: UpdateUserBodyDto,
  ): Promise<UserDto> {
    return this.userServise.updateUserByEmail(userDto);
  }

  @ApiOperation({ summary: 'Endpoint to update user by Id' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Put('/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() userDto: UpdateUserBodyDto,
  ): Promise<UserDto> {
    return this.userServise.updateUserById(id, userDto);
  }

  @ApiOperation({ summary: 'Endpoint to delete user by Id' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Delete('/:id')
  async removeUser(@Param('id') id: string): Promise<void> {
    return this.userServise.removeUserById(id);
  }
}
