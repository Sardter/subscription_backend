import { ApiProperty } from '@nestjs/swagger';

export class UserFilter {
  @ApiProperty()
  take?: number;

  @ApiProperty()
  skip?: number;
}
