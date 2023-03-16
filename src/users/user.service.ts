import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { assert } from 'console';
import { Filter } from 'src/interfaces/filter';
import { PrismaService } from 'src/prisma.service';
import { UserCreateDataProcessor, UserCreateInputData } from './interfaces/create';

@Injectable()
export class UsersService {
  constructor(private readonly repo: PrismaService) {}

  async findOne(
    id: number,
  ): Promise<User | null> {
    return await this.repo.user.findFirst({
      where: {
        id: id
      },
    });
  }

  async findOneByUsername(
    username: string,
  ): Promise<User | null> {
    return await this.repo.user.findFirst({
      where: {
        username: username
      },
    });
  }

  filter(filter: Filter): Promise<User[]> {
    return this.repo.user.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.user.delete({
      where: {
        id: id,
      },
    });
  }

  create(user: UserCreateInputData) {
    const proccessor = new UserCreateDataProcessor();
    return this.repo.user.create({
      data: proccessor.process(user),
    });
  }

  update(id: number, user: UserCreateInputData) {
    const proccessor = new UserCreateDataProcessor();
    return this.repo.user.update({
      where: {
        id: id,
      },
      data: proccessor.process(user),
    });
  }
}
