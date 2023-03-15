import { Injectable } from '@nestjs/common';
import { Subscription, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { SubscriptionCreateData } from './interfaces/create';
import { SubscriptionFilter } from './interfaces/filter';

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

  filter(filter: SubscriptionFilter): Promise<Subscription[]> {
    return this.repo.subscription.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.subscription.delete({
      where: {
        id: id,
      },
    });
  }

  create(subscription: SubscriptionCreateData) {
    return this.repo.subscription.create({
      data: subscription.data(),
    });
  }

  update(id: number, subscription: SubscriptionCreateData) {
    return this.repo.subscription.update({
      where: {
        id: id,
      },
      data: subscription.data(),
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
      subscription.users.forEach((user) => {
        if (user.addresses.length > 0)
          this.repo.order.create({
            data: {
              date: date,
              address: {
                connect: user.addresses[0],
              },
              user: {
                connect: user,
              },
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
