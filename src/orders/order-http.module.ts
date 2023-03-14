import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderModule } from './order.module';
import { OrderService } from './order.service';

@Module({
  imports: [OrderModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class UserHttpModule {}