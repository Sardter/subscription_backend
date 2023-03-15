import { Module } from '@nestjs/common';
import { SubscriptionModule } from './subscription.module';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TasksService } from './subscription.tasks';

@Module({
  imports: [SubscriptionModule],
  providers: [SubscriptionService, TasksService],
  controllers: [SubscriptionController]
})
export class UserHttpModule {}