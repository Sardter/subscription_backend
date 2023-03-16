import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StripService } from 'src/stripe.service';
import { OrderController } from './order.controller';
import { OrdersService } from './order.service';

@Module({
  providers: [OrdersService, PrismaService, StripService],
  controllers: [OrderController],
  exports: [OrdersService],
})
export class OrderModule {}
