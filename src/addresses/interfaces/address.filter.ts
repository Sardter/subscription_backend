import { ApiProperty } from '@nestjs/swagger';
import { Filter, FilterProcessor, InputFilter } from 'src/interfaces/filter';

export class AddressInputFilter extends InputFilter {
  @ApiProperty()
  showOrders: boolean;
}

export class AddressFilterProcessor extends FilterProcessor {
  toQueryFilter(inputFilter: AddressInputFilter): AddressFilter {
    return {
      take: super.getValue(inputFilter.take),
      skip: super.getValue(inputFilter.skip),
      include: {
        orders: (inputFilter.showOrders as unknown as String) === 'true',
      },
    };
  }
}

export interface AddressFilter extends Filter {
  include: {
    orders: boolean | undefined;
  };
}