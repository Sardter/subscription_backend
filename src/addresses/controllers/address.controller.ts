import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AddressesService } from '../servises/address.service';
import { Address } from '@prisma/client';
import { AddressCreateDataInput } from '../interfaces/address.dto';
import { FilterProcessor, InputFilter } from 'src/interfaces/filter';

@Controller('addresses')
export class AddressController {
  constructor(private service: AddressesService) {}

  @Get()
  async filter(@Query() params: InputFilter): Promise<Address[]> {
    const proccessor = new FilterProcessor();
    return this.service.filter(proccessor.toQueryFilter(params));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Address | null> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.findOne(parsed);
  }

  @Post()
  async create(@Body() body: AddressCreateDataInput): Promise<Address> {
    return this.service.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.remove(parsed);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: AddressCreateDataInput,
  ): Promise<Address> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.update(parsed, body);
  }
}
