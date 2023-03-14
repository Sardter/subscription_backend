import { Module } from '@nestjs/common';
import { CountryController } from '../controllers/country.controller';
import { CountryModule } from '../modules/country.module';
import { CountryService } from '../servises/country.service';

@Module({
  imports: [CountryModule],
  providers: [CountryService],
  controllers: [CountryController]
})
export class UserHttpModule {}