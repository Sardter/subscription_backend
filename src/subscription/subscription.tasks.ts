import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from 'src/orders/order.service';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class TasksService {
  constructor(
    private service: SubscriptionService,
    private orderService: OrderService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    const date = new Date();
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );
    const subscriptions = await this.service.findAll();
    subscriptions.forEach((subscription) =>
      this.service.createOrderOnDate(
        subscription,
        date,
        nextDate,
        this.orderService,
      ),
    );
  }
}
