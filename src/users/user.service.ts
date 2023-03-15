import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { assert } from 'console';
import { PrismaService } from 'src/prisma.service';
import { UserCreateData } from './interfaces/create';
import { UserFilter } from './interfaces/filter';

@Injectable()
export class UsersService {
  constructor(private readonly repo: PrismaService) {}

  async findOne(
    id: number | null,
    username: string | null,
  ): Promise<User | null> {
    assert(
      id != null || username != null,
      'Both id and username cannot be null',
    );
    return await this.repo.user.findFirst({
      where: {
        id: id,
        username: username,
      },
    });
  }

  filter(filter: UserFilter): Promise<User[]> {
    return this.repo.user.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.user.delete({
      where: {
        id: id,
      },
    });
  }

  create(user: UserCreateData) {
    return this.repo.user.create({
      data: user.data()
    });
  }

  update(id: number, user: UserCreateData) {
    return this.repo.user.update({
      where: {
        id: id,
      },
      data: user.data(),
    });
  }
}
