import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostsController } from '../posts/post.controller';
import { Posts, PostsSchema } from '../../schemas/post.schema';
import { PostsService } from '../posts/post.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
    UserModule,
    AuthModule,
  ],
  exports: [PostsService],
})
export class PostsModule {}
