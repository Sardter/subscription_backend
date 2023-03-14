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
import { Address } from '../entities/address.entity';
import { AddressService } from '../servises/address.service';
import { AddressCreateData } from '../interfaces/create';
import { AddressFilter } from '../interfaces/filter';

@Controller('addresses')
export class AddressController {
  constructor(private service: AddressService) {}

  @Get()
  async findAll(): Promise<Address[]> {
    return this.service.findAll();
  }

  @Get()
  async filter(@Query() params: AddressFilter): Promise<Address[]> {
    return this.service.filter(params);
  }

  @Get()
  async findOne(@Param('id') id: number): Promise<Address | null> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() body: AddressCreateData): Promise<Address> {
    return this.service.create(body);
  }

  @Delete()
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }

  @Patch()
  async update(
    @Param('id') id: number,
    @Body() body: AddressCreateData,
  ): Promise<Address> {
    this.service.update(id, body);
    return this.service.findOne(id);
  }
}
