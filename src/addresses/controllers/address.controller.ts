import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AddressesService } from '../servises/address.service';
import { Address } from '@prisma/client';
import { AddressCreateDataInput } from '../interfaces/address.dto';
import {
  AddressFilterProcessor,
  AddressInputFilter,
} from '../interfaces/address.filter';
import { idParser } from 'src/interfaces/filter';

@Controller('addresses')
export class AddressController {
  constructor(private service: AddressesService) {}

  @Get()
  async filter(@Query() params: AddressInputFilter): Promise<Address[]> {
    const proccessor = new AddressFilterProcessor();
    return this.service.filter(proccessor.toQueryFilter(params));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Address | null> {
    return this.service.findOne(idParser(id));
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: AddressCreateDataInput): Promise<Address> {
    return this.service.create(body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(idParser(id));
  }

  @Patch(':id')
  @HttpCode(206)
  async update(
    @Param('id') id: string,
    @Body() body: AddressCreateDataInput,
  ): Promise<Address> {
    return this.service.update(idParser(id), body);
  }
}
