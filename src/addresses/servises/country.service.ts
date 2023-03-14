import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';
import { CountryCreateData } from '../interfaces/create';
import { CountryFilter } from '../interfaces/filter';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryService)
    private repo: Repository<Country>
  ) {}

  findAll(): Promise<Country[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Country> {
    return this.repo.findOneBy({ id });
  }

  filter(filter: CountryFilter): Promise<Country[]> {
    return this.repo.findBy(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  create(order: CountryCreateData) {
    return this.repo.create(order);
  }

  update(id: number, order: CountryCreateData) {
    return this.repo.update(id, order);
  }
}