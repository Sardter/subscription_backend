import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class TasksService {
  constructor(
    private service: SubscriptionService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const date = new Date();
    const nextDate = new Date(
      date.getFullYear(),
      //date.getMonth() + 1,
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes() + 1,
    );
    this.service.createOrderOnDate(date, nextDate);  
  }
}
