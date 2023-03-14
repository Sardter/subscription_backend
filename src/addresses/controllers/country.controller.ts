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
import { Country } from '../entities/country.entity';
import { CountryCreateData } from '../interfaces/create';
import { CountryFilter } from '../interfaces/filter';
import { CountryService } from '../servises/country.service';

@Controller('countries')
export class CountryController {
  constructor(private service: CountryService) {}

  @Get()
  async findAll(): Promise<Country[]> {
    return this.service.findAll();
  }

  @Get()
  async filter(@Query() params: CountryFilter): Promise<Country[]> {
    return this.service.filter(params);
  }

  @Get()
  async findOne(@Param('id') id: number): Promise<Country | null> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() body: CountryCreateData): Promise<Country> {
    return this.service.create(body);
  }

  @Delete()
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }

  @Patch()
  async update(
    @Param('id') id: number,
    @Body() body: CountryCreateData,
  ): Promise<Country> {
    this.service.update(id, body);
    return this.service.findOne(id);
  }
}
