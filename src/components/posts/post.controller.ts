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
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto, PostDto, UpdatePostBodyDto } from 'src/dtos/post.dto';
import { Posts } from 'src/schemas/post.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

import { PostsService } from './post.service';

@ApiTags('Posts')
@Controller('/post')
export class PostsController {
  constructor(private readonly postServise: PostsService) {}

  @ApiOperation({ summary: 'Endpoint to get all posts' })
  @ApiResponse({ status: 200, type: [Posts] })
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
  getAll(): Promise<void> {
    return;
  }

  @ApiOperation({ summary: 'Endpoint to get post by Id' })
  @ApiResponse({ status: 200, type: [Posts] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @ApiBearerAuth()
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/self')
  getPostsByEmail(@Body() email: string): Promise<PostDto[]> {
    return this.postServise.getPostsByEmail(email);
  }

  @ApiOperation({ summary: 'Endpoint to create new post' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createPost(@Body() dto: CreatePostDto): Promise<Posts> {
    return this.postServise.createPost(dto);
  }

  @ApiOperation({ summary: 'Endpoint to update post by Id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updatePost(
    @Param('id') id: string,
    @Body() dto: UpdatePostBodyDto,
  ): Promise<void> {
    return this.postServise.updatePostById(id, dto);
  }

  @ApiOperation({ summary: 'Endpoint to delete post by Id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server Error' })
  @Roles('admin', 'user')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  removeUser(@Param('id') id: string): Promise<void> {
    return this.postServise.deletePost(id);
  }
}
