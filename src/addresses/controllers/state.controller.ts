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
import { State } from '../entities/state.entity';
import { StateCreateData } from '../interfaces/create';
import { StateFilter } from '../interfaces/filter';
import { StateService } from '../servises/state.service';

@Controller('states')
export class StateController {
  constructor(private service: StateService) {}

  @Get()
  async findAll(): Promise<State[]> {
    return this.service.findAll();
  }

  @Get()
  async filter(@Query() params: StateFilter): Promise<State[]> {
    return this.service.filter(params);
  }

  @Get()
  async findOne(@Param('id') id: number): Promise<State | null> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() body: StateCreateData): Promise<State> {
    return this.service.create(body);
  }

  @Delete()
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }

  @Patch()
  async update(
    @Param('id') id: number,
    @Body() body: StateCreateData,
  ): Promise<State> {
    this.service.update(id, body);
    return this.service.findOne(id);
  }
}
