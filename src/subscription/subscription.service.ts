import { Injectable } from '@nestjs/common';
import { Subscription } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { StripService } from 'src/stripe.service';
import {
  SubscriptionCreateDataProcessor,
  SubscriptionCreateInputData,
} from './interfaces/create';
import { SubscriptionFilter } from './interfaces/filter';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly repo: PrismaService,
    private readonly stripe: StripService,
  ) {}

  async findOne(id: number | null): Promise<Subscription | null> {
    return await this.repo.subscription.findFirst({
      where: {
        id: id,
      },
      include: {
        users: true,
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
    // Get subscriptions that have date smaller than the date and which addresses are not empty
    // include the addresses that are selected: since only one address can be selected, len will be 1
    const subscriptions = await this.repo.subscription.findMany({
      where: {
        date: {
          lte: date,
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

    // create order and initiate payment for each user
    subscriptions.forEach((subscription) => {
      subscription.users.forEach(async (user) => {
        if (user.addresses.length > 0) {
          const oreder = await this.repo.order.create({
            data: {
              date: date,
              addressId: user.addresses[0].id, // length garanteed to be 1
              userId: user.id,
            },
          });
          const payment = await this.stripe.proccessPayment(
            oreder.cost,
            oreder.currency,
          );
          console.log('Payment:', payment);
        }
      });
    });

    // update the dates of the subscriptions to the next date
    await this.repo.subscription.updateMany({
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
