import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
export class CreateUserBodyDto {
  @ApiProperty({ example: 'your.email@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'dFI587fsA', description: 'Password' })
  readonly password: string;

  @ApiProperty({ example: 'Larry', description: 'User name' })
  readonly name: string;

  @ApiProperty({ example: 'Lori', description: 'User last name' })
  readonly lastname: string;

  @ApiProperty({ example: 42, description: 'User Age' })
  readonly age: number;
}

export class UpdateUserBodyDto {
  @ApiProperty({ example: 'your.email@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'Larry', description: 'User name' })
  readonly name: string;

  @ApiProperty({ example: 'Lori', description: 'User last name' })
  readonly lastname: string;

  @ApiProperty({ example: 42, description: 'User Age' })
  readonly age: number;
}

export class LoginUserDto {
  @ApiProperty({ example: 'your.email@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'dFI587fsA', description: 'Password' })
  readonly password: string;
}

export class UserDto {
  readonly email: string;
  readonly hash: string;
  readonly salt: string;
  readonly name: string;
  readonly lastname: string;
  readonly age: number;
  readonly createdDate: Date;
  readonly roles: string[];
  readonly posts: mongoose.Types.ObjectId[];
}

export interface UpdateUserDto extends CreateUserBodyDto {
  readonly updatedDate: Date;
}
