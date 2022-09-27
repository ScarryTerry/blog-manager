import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PostsService } from '../services/post.service';

@ApiTags('Posts')
@Controller('/post')
export class PostsController {
  constructor(private readonly postServise: PostsService) {}

  @Get('/all')
  getAll(): Promise<void> {
    return;
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<void> {
    return;
  }

  @Post('/create')
  createUser(@Body() options: any): Promise<void> {
    return;
  }

  @Put('/:id')
  updateUser(@Param('id') id: string): Promise<void> {
    return;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string): Promise<void> {
    return;
  }
}
