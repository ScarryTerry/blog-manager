import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, NewUserDto } from '../dtos/user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email });
  }

  createUser(dto: CreateUserDto): Promise<any> {
    const newUser: NewUserDto = {
      ...dto,
      createdDate: new Date(),
    };

    return this.userModel.create(newUser);
  }
}
