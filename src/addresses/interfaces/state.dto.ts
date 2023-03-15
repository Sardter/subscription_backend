import { ApiProperty } from '@nestjs/swagger';

export class StateCreateData {
  @ApiProperty()
  name: string;

  @ApiProperty()
  country: number;

  @ApiProperty()
  addresses: number[];

  data() {
    return {
      name: this.name,
      country: {
        connect: {
          id: this.country,
        },
      },
      addresses: {
        connect: this.addresses.map((address) => {
          return { id: address };
        }),
      },
    };
  }
}
