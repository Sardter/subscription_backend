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
import { Order } from '@prisma/client';
import { FilterProcessor, idParser, InputFilter } from 'src/interfaces/filter';
import { OrderCreateInputData } from './interfaces/create';
import { OrdersService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private service: OrdersService) {}
  @Get()
  async filter(@Query() params: InputFilter): Promise<Order[]> {
    const proccessor = new FilterProcessor();
    return this.service.filter(proccessor.toQueryFilter(params));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order | null> {
    return this.service.findOne(idParser(id));
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: OrderCreateInputData): Promise<Order> {
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
    @Body() body: OrderCreateInputData,
  ): Promise<Order> {
    return this.service.update(idParser(id), body);
  }
}
