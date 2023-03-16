import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CountryController } from '../controllers/country.controller';
import { CountriesService } from '../servises/country.service';

@Module({
  providers: [CountriesService, PrismaService],
  controllers: [CountryController],
  exports: [CountriesService],
})
export class CountryModule {}
