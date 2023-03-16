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
import { State } from '@prisma/client';
import { idParser } from 'src/interfaces/filter';
import { StateCreateInputData } from '../interfaces/state.dto';
import {
  StateFilterProcessor,
  StateInputFilter,
} from '../interfaces/state.filter';
import { StatesService } from '../servises/state.service';

@Controller('states')
export class StateController {
  constructor(private service: StatesService) {}

  @Get()
  async filter(@Query() params: StateInputFilter): Promise<State[]> {
    const proccessor = new StateFilterProcessor();
    return this.service.filter(proccessor.toQueryFilter(params));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<State | null> {
    return this.service.findOne(idParser(id));
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: StateCreateInputData): Promise<State> {
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
    @Body() body: StateCreateInputData,
  ): Promise<State> {
    return this.service.update(idParser(id), body);
  }
}
