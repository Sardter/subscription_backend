import { ApiProperty } from '@nestjs/swagger';
import { Filter, FilterProcessor, InputFilter } from 'src/interfaces/filter';

export class SubscriptionInputFilter extends InputFilter {
  @ApiProperty()
  showUsers: boolean;
}

export class SubscriptionFilterProcessor extends FilterProcessor {
  toQueryFilter(inputFilter: SubscriptionInputFilter): SubscriptionFilter {
    return {
      take: super.getValue(inputFilter.take),
      skip: super.getValue(inputFilter.skip),
      include: {
        users: (inputFilter.showUsers as unknown as string) === 'true',
      },
    };
  }
}

export interface SubscriptionFilter extends Filter {
  include: {
    users: boolean | undefined;
  };
}
