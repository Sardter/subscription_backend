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
import { State } from '@prisma/client';
import { FilterProcessor, InputFilter } from 'src/interfaces/filter';
import { StateCreateInputData } from '../interfaces/state.dto';
import { StatesService } from '../servises/state.service';

@Controller('states')
export class StateController {
  constructor(private service: StatesService) {}

  @Get()
  async filter(@Query() params: InputFilter): Promise<State[]> {
    const proccessor = new FilterProcessor();
    return this.service.filter(proccessor.toQueryFilter(params));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<State | null> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.findOne(parsed);
  }

  @Post()
  async create(@Body() body: StateCreateInputData): Promise<State> {
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
    @Body() body: StateCreateInputData,
  ): Promise<State> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.update(parsed, body);
  }
}
