import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrdersService } from './order.service';

@Module({
  providers: [OrdersService],
  controllers: [OrderController]
})
export class UserHttpModule {}