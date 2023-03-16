import { Injectable } from '@nestjs/common';
import { Address } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import {
  AddressCreateDataInput,
  AddressCreateDataProcessor,
} from '../interfaces/address.dto';
import { AddressFilter } from '../interfaces/address.filter';

@Injectable()
export class AddressesService {
  constructor(private readonly repo: PrismaService) {}

  private async onAddressCreatedAndUpdated(address: Address | null) {
    if (address && address.selected) {
      await this.repo.address.updateMany({
        where: {
          user: {
            id: address.userId
          }
        }, data: {
          selected: false
        }
      });
      await this.repo.address.update({
        where: {
          id: address.id
        },
        data: {
          selected: true
        }
      })
    }
  }

  async findOne(id: number): Promise<Address | null> {
    return await this.repo.address.findFirst({
      where: {
        id: id,
      },
      include: {
        orders: true,

      }
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

  async create(address: AddressCreateDataInput) {
    const proccessor = new AddressCreateDataProcessor();
    const created = await this.repo.address.create({
      data: proccessor.process(address),
    });
    await this.onAddressCreatedAndUpdated(created);
    return created;
  }

  async update(id: number, address: AddressCreateDataInput) {
    const proccessor = new AddressCreateDataProcessor();
    const updated = await this.repo.address.update({
      where: {
        id: id,
      },
      data: proccessor.process(address),
    });
    await this.onAddressCreatedAndUpdated(updated);
    return updated;
  }
}
