import { Module } from '@nestjs/common';
import { CountryController } from '../controllers/country.controller';
import { CountriesService } from '../servises/country.service';

@Module({
  providers: [CountriesService],
  controllers: [CountryController]
})
export class UserHttpModule {}