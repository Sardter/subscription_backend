import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderCreateData } from './interfaces/create';
import { OrderFilter } from './interfaces/filter';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderService)
    private repo: Repository<Order>
  ) {}

  findAll(): Promise<Order[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Order> {
    return this.repo.findOneBy({ id });
  }

  filter(filter: OrderFilter): Promise<Order[]> {
    return this.repo.findBy(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  create(order: OrderCreateData) {
    return this.repo.create(order);
  }

  update(id: number, order: OrderCreateData) {
    return this.repo.update(id, order);
  }
}