import { ApiProperty } from '@nestjs/swagger';
import { Filter, FilterProcessor, InputFilter } from 'src/interfaces/filter';

export class CountryInputFilter extends InputFilter {
  @ApiProperty()
  showAddresses: boolean;

  @ApiProperty()
  showStates: boolean;
}

export class CountryFilterProcessor extends FilterProcessor {
  toQueryFilter(inputFilter: CountryInputFilter): CountryFilter {
    return {
      take: super.getValue(inputFilter.take),
      skip: super.getValue(inputFilter.skip),
      include: {
        addresses: (inputFilter.showAddresses as unknown as string) === 'true',
        states: (inputFilter.showStates as unknown as string) === 'true',
      },
    };
  }
}

export interface CountryFilter extends Filter {
  include: {
    addresses: boolean | undefined;
    states: boolean | undefined;
  };
}
