import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionCreateData {
  @ApiProperty()
  date?: Date;

  @ApiProperty()
  users: number[];

  data() {
    return {
      date: this.date,
      users: {
        connect: this.users.map((user) => {
          return { id: user };
        }),
      },
    };
  }
}
