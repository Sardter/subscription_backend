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
import { AddressFilter } from '../interfaces/filter';
import { Address } from '@prisma/client';
import { AddressCreateData } from '../interfaces/address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private service: AddressesService) {}

  @Get()
  async filter(@Query() params: AddressFilter): Promise<Address[]> {
    return this.service.filter(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Address | null> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() body: AddressCreateData): Promise<Address> {
    return this.service.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: AddressCreateData,
  ): Promise<Address> {
    this.service.update(id, body);
    return this.service.findOne(id);
  }
}
