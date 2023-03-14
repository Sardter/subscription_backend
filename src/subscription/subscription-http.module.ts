import { Module } from '@nestjs/common';
import { SubscriptionModule } from './subscription.module';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [SubscriptionModule],
  providers: [SubscriptionService],
  controllers: [SubscriptionController]
})
export class UserHttpModule {}