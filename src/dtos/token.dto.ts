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
    example: 'DATE',
    description: 'creation date',
  })
  readonly createdDate: Date;
}
