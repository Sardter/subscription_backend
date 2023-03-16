import { Injectable } from '@nestjs/common';
import { Address } from '@prisma/client';
import { Filter } from 'src/interfaces/filter';
import { PrismaService } from 'src/prisma.service';
import {
  AddressCreateDataInput,
  AddressCreateDataProcessor,
} from '../interfaces/address.dto';

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

  filter(filter: Filter): Promise<Address[]> {
    return this.repo.address.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.address.delete({
      where: {
        id: id,
      },
    });
  }

  create(address: AddressCreateDataInput) {
    const proccessor = new AddressCreateDataProcessor();
    return this.repo.address.create({
      data: proccessor.process(address),
    });
  }

  update(id: number, address: AddressCreateDataInput) {
    const proccessor = new AddressCreateDataProcessor();
    return this.repo.address.update({
      where: {
        id: id,
      },
      data: proccessor.process(address),
    });
  }
}
