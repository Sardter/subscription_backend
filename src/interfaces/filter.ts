import { ApiProperty } from '@nestjs/swagger';

export class InputFilter {
  @ApiProperty()
  take?: string;

  @ApiProperty()
  skip?: string;
}

export class FilterProcessor {
  protected getValue(value: string) {
    if (!value) return null;
    const result = parseInt(value);
    return !result ? undefined : result;
  }

  toQueryFilter(inputFilter: InputFilter): Filter {
    return {
      take: this.getValue(inputFilter.take),
      skip: this.getValue(inputFilter.skip),
    };
  }
}

export interface Filter {
  take?: number;
  skip?: number;
}


export function idParser(id: string): number | null {
  const parsed = parseInt(id);
  if (!parsed) return null;
  return parsed;
}