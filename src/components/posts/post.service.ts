import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { Posts, PostsDocument } from 'src/schemas/post.schema';
import { CreatePostDto, PostDto, UpdatePostBodyDto } from 'src/dtos/post.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name)
    private postModel: Model<PostsDocument>,
    private userService: UserService,
  ) {}

  public async getAllPosts(): Promise<PostDto[]> {
    return this.postModel.find();
  }

  public async getPostsByEmail(email: string): Promise<PostDto[]> {
    return this.postModel.find({ authorEmail: email });
  }

  public async getPostById(id: string): Promise<PostDto> {
    return this.postModel.findOne({ _id: id });
  }

  public async createPost(dto: CreatePostDto): Promise<Posts> {
    const user = await this.userService.getUserByEmail(dto.authorEmail);
    const newPost = await this.postModel.create({
      ...dto,
      createdDate: new Date(),
      updatedDate: new Date(),
    });
    user['posts'].push(newPost['_id']);

    await this.userService.addPostToUser(user['_id'], user['posts']);
    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    const post = await this.postModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    const user = await this.userService.getUserByEmail(post.authorEmail);

    if (!user['roles'].includes('admin')) {
      user['posts'].map((post) => {
        if (post === new mongoose.Types.ObjectId(id)) {
          return this.postModel.remove({
            _id: new mongoose.Types.ObjectId(id),
          });
        }
      });
    }

    return this.postModel.remove({ _id: new mongoose.Types.ObjectId(id) });
  }

  public async updatePostById(
    id: string,
    dto: UpdatePostBodyDto,
  ): Promise<any> {
    const post = await this.postModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    const user = await this.userService.getUserByEmail(post.authorEmail);
    const postToUpdate = {
      ...dto,
      updatedDate: new Date(),
    };

    if (
      user['roles'].includes('admin') ||
      user['email'] === post['authorEmail']
    ) {
      return this.postModel.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        postToUpdate,
      );
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
