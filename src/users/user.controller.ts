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
import { User } from '@prisma/client';
import { idParser } from 'src/interfaces/filter';
import { UserCreateInputData } from './interfaces/create';
import { UserFilterProcessor, UserInputFilter } from './interfaces/filter';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async filter(@Query() params: UserInputFilter): Promise<User[]> {
    const proccessor = new UserFilterProcessor();
    return this.service.filter(proccessor.toQueryFilter(params));
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User | null> {
    return this.service.findOne(idParser(id));
  }

  @Get('u/:username')
  async findOneByUsername(
    @Param('username') username: string,
  ): Promise<User | null> {
    return this.service.findOneByUsername(username);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: UserCreateInputData): Promise<User> {
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
    @Body() body: UserCreateInputData,
  ): Promise<User | null> {
    return this.service.update(idParser(id), body);
  }
}
