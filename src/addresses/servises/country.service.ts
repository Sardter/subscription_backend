import { Injectable } from '@nestjs/common';
import { Country } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CountryCreateData } from '../interfaces/create';
import { CountryFilter } from '../interfaces/filter';

@Injectable()
export class CountriesService {
  constructor(private readonly repo: PrismaService) {}

  async findOne(id: number): Promise<Country | null> {
    return await this.repo.country.findFirst({
      where: {
        id: id,
      },
    });
  }

  filter(filter: CountryFilter): Promise<Country[]> {
    return this.repo.country.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.country.delete({
      where: {
        id: id,
      },
    });
  }

  create(country: CountryCreateData) {
    return this.repo.country.create(country);
  }

  update(id: number, country: CountryCreateData) {
    return this.repo.country.update({
      where: {
        id: id,
      },
      data: country.data,
    });
  }
}