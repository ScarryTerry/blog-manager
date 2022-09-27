import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from '../posts/post.controller';
import { Posts, PostsSchema } from '../../schemas/post.schema';
import { PostsService } from '../posts/post.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
  ],
  exports: [PostsService],
})
export class PostsModule {}
