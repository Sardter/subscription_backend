import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from '../entities/state.entity';
import { CountryCreateData, StateCreateData } from '../interfaces/create';
import { CountryFilter, StateFilter } from '../interfaces/filter';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateService)
    private repo: Repository<State>
  ) {}

  findAll(): Promise<State[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<State> {
    return this.repo.findOneBy({ id });
  }

  filter(filter: StateFilter): Promise<State[]> {
    return this.repo.findBy(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  create(order: StateCreateData) {
    return this.repo.create(order);
  }

  update(id: number, order: StateCreateData) {
    return this.repo.update(id, order);
  }
}