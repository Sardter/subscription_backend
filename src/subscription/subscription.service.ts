import { Injectable } from '@nestjs/common';
import { Subscription } from '@prisma/client';
import { Filter } from 'src/interfaces/filter';
import { PrismaService } from 'src/prisma.service';
import {
  SubscriptionCreateDataProcessor,
  SubscriptionCreateInputData,
} from './interfaces/create';

@Injectable()
export class SubscriptionService {
  constructor(private readonly repo: PrismaService) {}

  async findOne(id: number | null): Promise<Subscription | null> {
    return await this.repo.subscription.findFirst({
      where: {
        id: id,
      },
    });
  }

  filter(filter: Filter): Promise<Subscription[]> {
    return this.repo.subscription.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.subscription.delete({
      where: {
        id: id,
      },
    });
  }

  create(subscription: SubscriptionCreateInputData) {
    const proccessor = new SubscriptionCreateDataProcessor();
    return this.repo.subscription.create({
      data: proccessor.process(subscription),
    });
  }

  update(id: number, subscription: SubscriptionCreateInputData) {
    const proccessor = new SubscriptionCreateDataProcessor();
    return this.repo.subscription.update({
      where: {
        id: id,
      },
      data: proccessor.process(subscription),
    });
  }

  async createOrderOnDate(date: Date, nextDate: Date | null): Promise<boolean> {
    const subscriptions = await this.repo.subscription.findMany({
      where: {
        date: {
          lte: nextDate,
        },
      },
      include: {
        users: {
          where: {
            NOT: [{ addresses: { none: {} } }],
          },
          include: {
            addresses: {
              where: {
                selected: true,
              },
            },
          },
        },
      },
    });
    subscriptions.forEach((subscription) => {
      subscription.users.forEach(user => {
        if (user.addresses.length > 0)
          this.repo.order.create({
            data: {
              date: date,
              addressId: user.addresses[0].id,
              userId: user.id,
            },
          });
      });
    });

    this.repo.subscription.updateMany({
      where: {
        id: {
          in: subscriptions.map((e) => e.id),
        },
      },
      data: {
        date: nextDate,
      },
    });
    return true;
  }
}
