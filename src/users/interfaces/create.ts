import { ApiProperty } from '@nestjs/swagger';

export class UserCreateData {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  isActive?: boolean;

  @ApiProperty()
  isStaff?: boolean;

  @ApiProperty()
  addresses?: number[];

  @ApiProperty()
  orders?: number[];

  @ApiProperty()
  subscriptions?: number[];

  data() {
    return {
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      isActive: this.isActive,
      isStaff: this.isStaff,
      addresses: {
        connect: this.addresses.map((address) => {
          return { id: address };
        }),
      },
      orders: {
        connect: this.orders.map((order) => {
          return { id: order };
        }),
      },
      subscriptions: {
        connect: this.subscriptions.map((subscription) => {
          return { id: subscription };
        }),
      },
    };
  }
}