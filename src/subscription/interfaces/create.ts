import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionCreateInputData {
  @ApiProperty()
  date?: Date;

  @ApiProperty()
  users: number[];
}

export class SubscriptionCreateDataProcessor {
  process(data: SubscriptionCreateInputData) {
    return {
      date: data.date,
      users: !data.users ? undefined : {
        connect: data.users.map((order) => {
          return { id: order };
        }),
      },
    }
  }
}
