import { ApiProperty } from '@nestjs/swagger';

export class OrderCreateData {
  @ApiProperty()
  user: number;

  @ApiProperty()
  address: number;

  @ApiProperty()
  date: Date;

  data() {
    return {
      user: {
        connect: { id: this.user },
      },
      address: {
        connect: { id: this.address },
      },
      date: this.date,
    };
  }
}
