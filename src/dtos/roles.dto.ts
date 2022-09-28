import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'user role' })
  readonly role: string;

  @ApiProperty({
    example: 'Has full access to the application',
    description: 'Description of the role',
  })
  readonly description: string;
}
