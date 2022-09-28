import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { User } from './user.schema';

export type RolesDocument = Roles & Document;

@Schema()
export class Roles {
  @ApiProperty({ example: 'Admin', description: 'User role' })
  @Prop({ required: true })
  role: string;

  @ApiProperty({
    example: 'Has full access to the application',
    description: 'Description of the role',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: ['kadospkdsap6848'],
    description: 'Users ids with current role',
  })
  @Prop({ required: true })
  usersWithRole: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: User;
    },
  ];
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
