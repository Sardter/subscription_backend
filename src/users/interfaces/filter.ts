import { ApiProperty } from '@nestjs/swagger';
import { Filter, FilterProcessor, InputFilter } from 'src/interfaces/filter';

export class UserInputFilter extends InputFilter {
  @ApiProperty()
  showSubscriptions: boolean;

  @ApiProperty()
  showOrders: boolean;

  @ApiProperty()
  showAddresses: boolean;
}

export class UserFilterProcessor extends FilterProcessor {
  toQueryFilter(inputFilter: UserInputFilter): UserFilter {
    return {
      take: super.getValue(inputFilter.take),
      skip: super.getValue(inputFilter.skip),
      include: {
        subscriptions:
          (inputFilter.showSubscriptions as unknown as string) === 'true',
        orders: (inputFilter.showOrders as unknown as string) === 'true',
        addresses: (inputFilter.showAddresses as unknown as string) === 'true',
      },
    };
  }
}

export interface UserFilter extends Filter {
  include: {
    subscriptions: boolean | undefined;
    orders: boolean | undefined;
    addresses: boolean | undefined;
  };
}
