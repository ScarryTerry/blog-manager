import { ApiProperty } from '@nestjs/swagger';

export class CreateuserTokenDto {
  @ApiProperty({ example: 'admin@admin.com', description: 'user email' })
  readonly email: string;

  @ApiProperty({
    example: 'jwtToken',
    description: 'jwt Token',
  })
  readonly token: string;

  @ApiProperty({
    example: '2022-09-27T11:55:53.130+00:00',
    description: 'creation date',
  })
  readonly createdDate: Date;
}
