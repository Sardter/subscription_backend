import { Injectable } from '@nestjs/common';
import { Address } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AddressCreateData } from '../interfaces/create';
import { AddressFilter } from '../interfaces/filter';

@Injectable()
export class AddressesService {
  constructor(private readonly repo: PrismaService) {}

  async findOne(id: number): Promise<Address | null> {
    return await this.repo.address.findFirst({
      where: {
        id: id,
      },
    });
  }

  filter(filter: AddressFilter): Promise<Address[]> {
    return this.repo.address.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.address.delete({
      where: {
        id: id,
      },
    });
  }

  create(address: AddressCreateData) {
    return this.repo.address.create(address);
  }

  update(id: number, address: AddressCreateData) {
    return this.repo.address.update({
      where: {
        id: id,
      },
      data: address.data,
    });
  }
}