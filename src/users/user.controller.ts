import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { User } from '@prisma/client';
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
  async findOneById(
    @Param('id') id: string,
  ): Promise<User | null> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.findOne(parsed);
  }

  @Get('u/:username')
  async findOneByUsername(
    @Param('username') username: string,
  ): Promise<User | null> {
    return this.service.findOneByUsername(username);
  }

  @Post()
  async create(@Body() body: UserCreateInputData): Promise<User> {
    return this.service.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.remove(parsed);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UserCreateInputData): Promise<User | null> {
    const parsed = parseInt(id);
    if (!parsed) return null;
    return this.service.update(parsed, body);
  }
}
