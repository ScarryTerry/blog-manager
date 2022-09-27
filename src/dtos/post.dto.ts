export interface CreatePostDto {
  readonly title: string;
  readonly text: string;
  readonly authorEmail: string;
}

export interface PostDto extends CreatePostDto {
  readonly createdDate: Date;
}
