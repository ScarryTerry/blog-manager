import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Why I wake up so early', description: 'Post title' })
  readonly title: string;
  @ApiProperty({ example: 'Some text...', description: 'Post body' })
  readonly text: string;
  @ApiProperty({ example: 'your@email.com', description: 'Author email' })
  readonly authorEmail: string;
}

export class PostDto extends CreatePostDto {
  @ApiProperty({
    example: '2022-09-27T11:55:53.130+00:00',
    description: 'Createing date',
  })
  readonly createdDate: Date;
  @ApiProperty({
    example: '2022-09-27T11:55:53.130+00:00',
    description: 'Updating date',
  })
  readonly updatedDate: Date;
}

export class UpdatePostBodyDto {
  @ApiProperty({ example: 'Why I wake up so early', description: 'Post title' })
  readonly title: string;
  @ApiProperty({ example: 'Some text...', description: 'Post body' })
  readonly text: string;
}
