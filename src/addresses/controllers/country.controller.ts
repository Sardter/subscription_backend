import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Country } from '@prisma/client';
import { CountryCreateInputData } from '../interfaces/country.dto';
import {
  CountryFilterProcessor,
  CountryInputFilter,
} from '../interfaces/country.filter';
import { CountriesService } from '../servises/country.service';

@Controller('countries')
export class CountryController {
  constructor(private service: CountriesService) {}

  @Get()
  async filter(@Query() params: CountryInputFilter): Promise<Country[]> {
    const proccessor = new CountryFilterProcessor();
    return this.service.filter(proccessor.toQueryFilter(params));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Country | null> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.findOne(parsed);
  }

  @Post()
  async create(@Body() body: CountryCreateInputData): Promise<Country> {
    return this.service.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.remove(parsed);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: CountryCreateInputData,
  ): Promise<Country> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.update(parsed, body);
  }
}
