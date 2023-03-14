import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { assert } from 'console';
import { DataSource, Repository } from 'typeorm';
import { UserCreateData } from './interfaces/create';
import { UserFilter } from './interfaces/filter';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  findOne(id: number | null, username: string | null): Promise<User> {
    assert(id != null || username != null, "Both id and username cannot be null");
    return this.repo.findOneBy({ id, username });
  }

  filter(filter: UserFilter): Promise<User[]> {
    return this.repo.findBy(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  create(user: UserCreateData) {
    return this.repo.create(user);
  }

  update(id: number, user: UserCreateData) {
    return this.repo.update(id, user);
  }
}
