import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class TasksService {
  constructor(
    private service: SubscriptionService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const date = new Date();
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth() + parseInt(process.env.NEXT_DATE_MONTH_INCREMENT),
      date.getDate() + parseInt(process.env.NEXT_DATE_DAY_INCREMENT),
      date.getHours() + parseInt(process.env.NEXT_DATE_HOUR_INCREMENT),
      date.getMinutes() + parseInt(process.env.NEXT_DATE_MINUTE_INCREMENT),
    );
    console.log(`Cron Job: creating order on date ${date}, next date: ${nextDate}`);
    this.service.createOrderOnDate(date, nextDate);  
  }
}
