import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDTO {
  @ApiProperty({
    description: 'userEmail',
  })
  username: string;
}
