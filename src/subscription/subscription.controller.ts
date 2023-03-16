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
import { SubscriptionCreateInputData } from './interfaces/create';
import { SubscriptionFilterProcessor, SubscriptionInputFilter } from './interfaces/filter';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private service: SubscriptionService) {}

  @Get()
  async filter(@Query() params: SubscriptionInputFilter): Promise<Subscription[]> {
    const proccessor = new SubscriptionFilterProcessor();
    return this.service.filter(proccessor.toQueryFilter(params));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Subscription | null> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.findOne(parsed);
  }

  @Post()
  async create(@Body() body: SubscriptionCreateInputData): Promise<Subscription> {
    return this.service.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.remove(parsed);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: SubscriptionCreateInputData): Promise<Subscription | null> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.update(parsed, body);
  }
}
