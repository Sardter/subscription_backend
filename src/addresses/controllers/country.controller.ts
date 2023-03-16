import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Country } from '@prisma/client';
import { idParser } from 'src/interfaces/filter';
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
    return this.service.findOne(idParser(id));
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: CountryCreateInputData): Promise<Country> {
    return this.service.create(body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(idParser(id));
  }

  @Patch(':id')
  @HttpCode(206)
  async update(
    @Param('id') id: string,
    @Body() body: CountryCreateInputData,
  ): Promise<Country> {
    return this.service.update(idParser(id), body);
  }
}
