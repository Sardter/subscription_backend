import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { OrderCreateData } from './interfaces/create';
import { OrderFilter } from './interfaces/filter';

@Injectable()
export class OrdersService {
  constructor(private readonly repo: PrismaService) {}

  async findOne(id: number): Promise<Order | null> {
    return await this.repo.order.findFirst({
      where: {
        id: id,
      },
    });
  }

  filter(filter: OrderFilter): Promise<Order[]> {
    return this.repo.order.findMany({
      skip: filter.skip,
      take: filter.take,
    });
  }

  async remove(id: number): Promise<void> {
    await this.repo.order.delete({
      where: {
        id: id,
      },
    });
  }

  create(order: OrderCreateData) {
    return this.repo.order.create({
      data: order.data()
    });
  }

  update(id: number, order: OrderCreateData) {
    return this.repo.order.update({
      where: {
        id: id,
      },
      data: order.data(),
    });
  }
}
