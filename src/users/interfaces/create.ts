import { ApiProperty } from '@nestjs/swagger';

export class UserCreateInputData {
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
}

export class UserCreateDataProcessor {
  process(data: UserCreateInputData) {
    return {
      email: data.email,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      isActive: data.isActive,
      isStaff: data.isStaff,
      addresses: !data.addresses
        ? undefined
        : {
            connect: data.addresses.map((address) => {
              return { id: address };
            }),
          },
      orders: !data.orders
        ? undefined
        : {
            connect: data.orders.map((order) => {
              return { id: order };
            }),
          },
      subscriptions: !data.subscriptions
        ? undefined
        : {
            connect: data.subscriptions.map((subscription) => {
              return { id: subscription };
            }),
          },
    };
  }
}
