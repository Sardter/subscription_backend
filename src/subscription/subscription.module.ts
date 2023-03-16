import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TasksService } from './subscription.tasks';
import { PrismaService } from 'src/prisma.service';
import { StripService } from 'src/stripe.service';

@Module({
  providers: [SubscriptionService, TasksService, PrismaService, StripService],
  controllers: [SubscriptionController],
  exports: [SubscriptionService, TasksService],
})
export class SubscriptionModule {}
