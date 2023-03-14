import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { AddressCreateData } from '../interfaces/create';
import { AddressFilter } from '../interfaces/filter';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressService)
    private repo: Repository<Address>
  ) {}

  findAll(): Promise<Address[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Address> {
    return this.repo.findOneBy({ id });
  }

  filter(filter: AddressFilter): Promise<Address[]> {
    return this.repo.findBy(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  create(order: AddressCreateData) {
    return this.repo.create(order);
  }

  update(id: number, order: AddressCreateData) {
    return this.repo.update(id, order);
  }
}