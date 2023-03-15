import { ApiProperty } from '@nestjs/swagger';

export class AddressCreateData {
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

  data() {
    return {
      selected: this.selected,
      country: {
        connect: {
            id: this.country
        }
      },
      state: {
        connect: {
            id: this.state
        }
      },
      city: this.city,
      phone: this.phone,
      user: {
        connect: {
            id: this.user
        }
      },
      orders: {
        connect: this.orders.map((order) => {
          return { id: order };
        }),
      },
    };
  }
}