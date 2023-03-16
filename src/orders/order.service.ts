import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { Filter } from 'src/interfaces/filter';
import { PrismaService } from 'src/prisma.service';
import { StripService } from 'src/stripe.service';
import { OrderCreateDataProcessor, OrderCreateInputData } from './interfaces/create';

@Injectable()
export class OrdersService {
  constructor(private readonly repo: PrismaService, private readonly stripe: StripService) {}

  
  async findOne(id: number): Promise<Order | null> {
    return await this.repo.order.findFirst({
      where: {
        id: id,
      },
    });
  }

  filter(filter: Filter): Promise<Order[]> {
    return this.repo.order.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.order.delete({
      where: {
        id: id,
      },
    });
  }

  async create(order: OrderCreateInputData) {
    const proccessor = new OrderCreateDataProcessor();
    
    const created = await this.repo.order.create({
      data: proccessor.process(order)
    });

    await this.stripe.proccessPayment(created.cost, created.currency);

    return created;
  }

  update(id: number, order: OrderCreateInputData) {
    const proccessor = new OrderCreateDataProcessor();
    return this.repo.order.update({
      where: {
        id: id,
      },
      data: proccessor.process(order),
    });
  }
}
