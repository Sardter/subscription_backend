import { ApiProperty } from '@nestjs/swagger';

export class CountryCreateInputData {
  @ApiProperty()
  name: string;

  @ApiProperty()
  states: number[];

  @ApiProperty()
  addresses: number[];
}

export class CountryCreateDataProcessor {
  proccess(data: CountryCreateInputData) {
    return {
      name: data.name,
      states: {
        connect: data.states.map((state) => {
          return { id: state };
        }),
      },
      addresses: {
        connect: data.addresses.map((address) => {
          return { id: address };
        }),
      },
    }
  }
}