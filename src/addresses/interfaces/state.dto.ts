import { ApiProperty } from '@nestjs/swagger';

export class StateCreateInputData {
  @ApiProperty()
  name: string;

  @ApiProperty()
  country: number;

  @ApiProperty()
  addresses: number[];
}


export class StateCreateDataProcessor {
  process(data: StateCreateInputData) {
    return {
      name: data.name,
      country: {
        connect: {
          id: data.country,
        },
      },
      addresses: !data.addresses ? {} : {
        connect: data.addresses.map((address) => {
          return { id: address };
        }),
      },
    };
  }
}