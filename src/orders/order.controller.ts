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
import { Order } from '@prisma/client';
import { OrderCreateData } from './interfaces/create';
import { OrderFilter } from './interfaces/filter';
import { OrdersService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private service: OrdersService) {}

  @Get()
  async filter(@Query() params: OrderFilter): Promise<Order[]> {
    return this.service.filter(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order | null> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() body: OrderCreateData): Promise<Order> {
    return this.service.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: OrderCreateData,
  ): Promise<Order> {
    this.service.update(id, body);
    return this.service.findOne(id);
  }
}
