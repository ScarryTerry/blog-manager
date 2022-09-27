import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PostsDocument = Posts & Document;

@Schema()
export class Posts {
  @ApiProperty({ example: 'Why I wake up so early', description: 'Post title' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: 'Some text...', description: 'Post body' })
  @Prop({ required: true })
  text: string;

  @ApiProperty({ example: 'your@email.com', description: 'Author email' })
  @Prop({ required: true })
  authorEmail: string;

  @ApiProperty({
    example: '2022-09-27T11:55:53.130+00:00',
    description: 'Createing date',
  })
  @Prop({ required: true })
  createdDate: Date;

  @ApiProperty({
    example: '2022-09-27T11:55:53.130+00:00',
    description: 'Updating date',
  })
  @Prop({ required: true })
  updatedDate: Date;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
