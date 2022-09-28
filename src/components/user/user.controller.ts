import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

import {
  CreateUserBodyDto,
  UpdateUserBodyDto,
  UserDto,
} from 'src/dtos/user.dto';
import { User } from 'src/schemas/user.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userServise: UserService) {}

  @ApiOperation({ summary: 'Endpoint to get list of users' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAll(): Promise<User[]> {
    return this.userServise.getAllUsers();
  }

  @ApiOperation({ summary: 'Endpoint to get user by Id' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userServise.getUserById(id);
  }

  @ApiOperation({ summary: 'Endpoint to create new user' })
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createUser(@Body() userDto: CreateUserBodyDto): Promise<User> {
    return this.userServise.createUser(userDto);
  }

  @ApiOperation({ summary: 'Endpoint to update user by email' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  async updateUserByEmail(
    @Body() userDto: UpdateUserBodyDto,
  ): Promise<UserDto> {
    return this.userServise.updateUserByEmail(userDto);
  }

  @ApiOperation({ summary: 'Endpoint to update user by Id' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async removeUser(@Param('id') id: string): Promise<void> {
    return this.userServise.removeUserById(id);
  }
}
