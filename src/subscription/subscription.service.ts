import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionCreateData } from './interfaces/create';
import { SubscriptionFilter } from './interfaces/filter';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private repo: Repository<Subscription>
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
}