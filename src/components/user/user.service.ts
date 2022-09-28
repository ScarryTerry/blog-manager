import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import {
  CreateUserBodyDto,
  UpdateUserBodyDto,
  UserDto,
} from '../../dtos/user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private roleService: RolesService,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();

    if (users.length < 1) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  public async getUserByEmail(email: string): Promise<UserDto> {
    return this.userModel.findOne({ email });
  }

  public async getUserById(id: string): Promise<UserDto> {
    return this.userModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
  }

  public async createUser(dto: CreateUserBodyDto): Promise<User> {
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(dto.password, salt);
    const role: string = await this.roleService.getRoleByValue('user');

    const newUser = await this.userModel.create({
      ...dto,
      hash: hash,
      salt: salt,
      createdDate: new Date(),
      roles: [role],
    });

    await this.roleService.addUserToRole(role, newUser['_id']);

    return newUser;
  }

  public async updateUserByEmail(dto: UpdateUserBodyDto): Promise<any> {
    const userToUpdate = {
      ...dto,
      updatedDate: new Date(),
    };
    return this.userModel.updateOne({ email: dto['email'] }, userToUpdate);
  }

  public async updateUserById(
    id: string,
    dto: UpdateUserBodyDto,
  ): Promise<any> {
    const userToUpdate = {
      ...dto,
      updatedDate: new Date(),
    };

    return this.userModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      userToUpdate,
    );
  }

  public async removeUserById(id: string): Promise<any> {
    return this.userModel.remove({ _id: new mongoose.Types.ObjectId(id) });
  }

  public async addPostToUser(
    id: mongoose.Types.ObjectId,
    posts: mongoose.Types.ObjectId[],
  ): Promise<any> {
    return this.userModel.updateOne({ _id: id }, { posts });
  }
}
