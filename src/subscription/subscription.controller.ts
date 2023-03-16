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
import { Subscription } from '@prisma/client';
import { idParser } from 'src/interfaces/filter';
import { SubscriptionCreateInputData } from './interfaces/create';
import {
  SubscriptionFilterProcessor,
  SubscriptionInputFilter,
} from './interfaces/filter';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private service: SubscriptionService) {}

  @Get()
  async filter(
    @Query() params: SubscriptionInputFilter,
  ): Promise<Subscription[]> {
    const proccessor = new SubscriptionFilterProcessor();
    return this.service.filter(proccessor.toQueryFilter(params));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Subscription | null> {
    return this.service.findOne(idParser(id));
  }

  @Post()
  @HttpCode(201)
  async create(
    @Body() body: SubscriptionCreateInputData,
  ): Promise<Subscription> {
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
    @Body() body: SubscriptionCreateInputData,
  ): Promise<Subscription | null> {
    return this.service.update(idParser(id), body);
  }
}
