import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TasksService } from './subscription.tasks';

@Module({
  providers: [SubscriptionService, TasksService],
  controllers: [SubscriptionController]
})
export class UserHttpModule {}