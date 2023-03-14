import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  exports: [TypeOrmModule],
})

export class CountryModule {}