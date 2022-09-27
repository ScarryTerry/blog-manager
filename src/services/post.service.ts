import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Posts, PostsDocument } from 'src/schemas/post.schema';
import { CreatePostDto, PostDto } from 'src/dtos/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name)
    private postModel: Model<PostsDocument>,
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

  public async createUser(dto: CreatePostDto): Promise<PostDto> {
    return this.postModel.create({
      ...dto,
      createdDate: new Date(),
    });
  }
}
