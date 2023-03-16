import { ApiProperty } from '@nestjs/swagger';

export class AddressCreateDataInput {
  @ApiProperty()
  selected: boolean;

  @ApiProperty()
  country: number;

  @ApiProperty()
  state: number;

  @ApiProperty()
  city: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  user: number;

  @ApiProperty()
  orders: number[];
}

export class AddressCreateDataProcessor {
  process(data: AddressCreateDataInput) {
    return {
      selected: data.selected,
      country: !data.country ? undefined : {
        connect: {
          id: data.country,
        },
      },
      state: !data.state ? undefined : {
        connect: {
          id: data.state,
        },
      },
      city: data.city,
      phone: data.phone,
      user: !data.user ? undefined : {
        connect: {
          id: data.user,
        },
      },
      orders: !data.orders ? undefined : {
        connect: data.orders.map((order) => {
          return { id: order };
        }),
      },
    };
  }
}
