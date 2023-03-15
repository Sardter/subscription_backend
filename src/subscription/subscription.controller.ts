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
import { Subscription } from '@prisma/client';
import { SubscriptionCreateData } from './interfaces/create';
import { SubscriptionFilter } from './interfaces/filter';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private service: SubscriptionService) {}

  @Get()
  async filter(@Query() params: SubscriptionFilter): Promise<Subscription[]> {
    return this.service.filter(params);
  }

  @Get()
  async findOne(@Param('id') id: number): Promise<Subscription | null> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() body: SubscriptionCreateData): Promise<Subscription> {
    return this.service.create(body);
  }

  @Delete()
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }

  @Patch()
  async update(@Param('id') id: number, @Body() body: SubscriptionCreateData): Promise<Subscription> {
    this.service.update(id, body);
    return this.service.findOne(id);
  }
}
