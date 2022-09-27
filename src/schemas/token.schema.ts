import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @ApiProperty({ example: 'Admin', description: 'User role' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'Has full access to the application',
    description: 'Description of the role',
  })
  @Prop({ required: true, unique: true })
  token: string;

  @ApiProperty({
    example: 'Has full access to the application',
    description: 'Description of the role',
  })
  @Prop({ required: true })
  createdDate: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
TokenSchema.index({ createdDate: 1 }, { expireAfterSeconds: 86400 });
