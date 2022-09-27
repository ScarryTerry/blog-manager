export interface CreateUserDto {
  readonly email: string;
  readonly hash: string;
  readonly salt: string;
  readonly name: string;
  readonly lastname: string;
  readonly age: number;
}

export interface NewUserDto extends CreateUserDto {
  readonly createdDate: Date;
}