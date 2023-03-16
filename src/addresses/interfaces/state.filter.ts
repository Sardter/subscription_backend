import { ApiProperty } from '@nestjs/swagger';
import { Filter, FilterProcessor, InputFilter } from 'src/interfaces/filter';

export class StateInputFilter extends InputFilter {
  @ApiProperty()
  showAddresses: boolean;
}

export class StateFilterProcessor extends FilterProcessor {
  toQueryFilter(inputFilter: StateInputFilter): StateFilter {
    return {
      take: super.getValue(inputFilter.take),
      skip: super.getValue(inputFilter.skip),
      include: {
        addresses: (inputFilter.showAddresses as unknown as String) === 'true',
      },
    };
  }
}

export interface StateFilter extends Filter {
  include: {
    addresses: boolean | undefined;
  };
}