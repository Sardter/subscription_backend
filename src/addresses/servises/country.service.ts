import { Injectable } from '@nestjs/common';
import { Country } from '@prisma/client';
import { Filter } from 'src/interfaces/filter';
import { PrismaService } from 'src/prisma.service';
import { CountryCreateDataProcessor, CountryCreateInputData } from '../interfaces/country.dto';

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

  filter(filter: Filter): Promise<Country[]> {
    return this.repo.country.findMany(filter);
  }

  async remove(id: number): Promise<void> {
    await this.repo.country.delete({
      where: {
        id: id,
      },
    });
  }

  create(country: CountryCreateInputData) {
    const processor = new CountryCreateDataProcessor();
    return this.repo.country.create({
      data: processor.proccess(country)
    });
  }

  update(id: number, country: CountryCreateInputData) {
    const processor = new CountryCreateDataProcessor();
    return this.repo.country.update({
      where: {
        id: id,
      },
      data: processor.proccess(country),
    });
  }
}