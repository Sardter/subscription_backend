import { ApiProperty } from '@nestjs/swagger';

export class OrderCreateInputData {
  @ApiProperty()
  user: number;

  @ApiProperty()
  address: number;

  @ApiProperty()
  date: Date;
}

export class OrderCreateDataProcessor {
  process(data: OrderCreateInputData) {
    return {
      user: {
        connect: !data.user ? undefined : { id: data.user },
      },
      address: !data.address ? undefined : {
        connect: { id: data.address },
      },
      date: data.date,
    };
  }
}
