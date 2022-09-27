import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from 'src/controllers/post.controller';
import { Posts, PostsSchema } from 'src/schemas/post.schema';
import { PostsService } from 'src/services/post.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
  ],
  exports: [PostsService],
})
export class PostsModule {}
