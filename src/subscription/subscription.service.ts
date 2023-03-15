import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from 'src/orders/order.service';
import { Repository } from 'typeorm';
import { SubscriptionCreateData } from './interfaces/create';
import { SubscriptionFilter } from './interfaces/filter';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private repo: Repository<Subscription>,
  ) {}

  findAll(): Promise<Subscription[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Subscription> {
    return this.repo.findOneBy({ id });
  }

  filter(filter: SubscriptionFilter): Promise<Subscription[]> {
    return this.repo.findBy(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  create(subscription: SubscriptionCreateData) {
    return this.repo.create(subscription);
  }

  update(id: number, subscription: SubscriptionCreateData) {
    return this.repo.update(id, subscription);
  }

  async createOrderOnDate(
    subscription: Subscription,
    date: Date,
    nextDate: Date | null,
    orderService: OrderService,
  ): Promise<boolean> {
    if (subscription.nextOrderDate > date) return false;
    subscription.users.forEach((user) => {
      if (user.selectedAddress)
        orderService.create({
          date: date,
          user: user,
          address: user.addresses[user.selectedAddress],
        });
    });
    subscription.nextOrderDate = nextDate;
    this.update(subscription.id, subscription);
    return true;
  }
}
