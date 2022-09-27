import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from './roles.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: 'your@email.com', description: 'User Email' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'hash!!!!!!!!!!!!!!!!!',
    description: 'Hashed password',
  })
  @Prop({ required: true })
  hash: string;

  @ApiProperty({ example: 'salt!!!!!!!!!!!!!!!!!', description: 'salt' })
  @Prop()
  salt: string;

  @ApiProperty({ example: 'Erik', description: 'User name' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'Lensher', description: 'User lastname' })
  @Prop()
  lastname: string;

  @ApiProperty({ example: 42, description: 'User age' })
  @Prop()
  age: number;

  @ApiProperty({
    example: '2022-09-27T11:55:53.130+00:00',
    description: 'User created Date',
  })
  @Prop({ required: true })
  createdDate: Date;

  @ApiProperty({
    example: '2022-09-27T11:55:53.130+00:00',
    description: 'User updated Date',
  })
  @Prop()
  updatedDate: Date;

  @ApiProperty({
    example: ['asdjasoig87548a9s7d89'],
    description: 'User roles Ids',
  })
  @Prop()
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: Roles;
    },
  ];
}

export const UserSchema = SchemaFactory.createForClass(User);
