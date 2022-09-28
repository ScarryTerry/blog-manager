import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from './roles.schema';
import { Posts } from './post.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: 'your@email.com', description: 'User Email' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: '$2b$10$l0WqpbijokkbAgHPGCER9OXuOvGeVGr6x1MaIYPbPx0wjjw2Y0F5S',
    description: 'Hashed password',
  })
  @Prop({ required: true })
  hash: string;

  @ApiProperty({
    example: '$2b$10$l0WqpbijokkbAgHPGCER9O',
    description: 'salt',
  })
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
    example: ['user'],
    description: 'User roles',
  })
  @Prop()
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: Roles;
    },
  ];

  @ApiProperty({
    example: ['asdjasoig87548a9s7d89'],
    description: 'User posts Ids',
  })
  @Prop()
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: Posts;
    },
  ];
}

export const UserSchema = SchemaFactory.createForClass(User);
