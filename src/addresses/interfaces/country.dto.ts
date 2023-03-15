import { ApiProperty } from '@nestjs/swagger';

export class CountryCreateData {
  @ApiProperty()
  name: string;

  @ApiProperty()
  states: number[];

  @ApiProperty()
  addresses: number[];

  data() {
    return {
      name: this.name,
      states: {
        connect: this.states.map((state) => {
          return { id: state };
        }),
      },
      addresses: {
        connect: this.addresses.map((address) => {
          return { id: address };
        }),
      },
    };
  }
}
