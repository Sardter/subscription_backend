import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { UserCreateData as UserCreateData } from './interfaces/create';
import { UserFilter as UserFilterData } from './interfaces/filter';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get()
  async filter(@Query() params: UserFilterData): Promise<User[]> {
    return this.service.filter(params);
  }

  @Get()
  async findOne(
    @Param('id') id: number | null,
    @Param('username') username: string | null,
  ): Promise<User | null> {
    return this.service.findOne(id, username);
  }

  @Post()
  async create(@Body() body: UserCreateData): Promise<User> {
    return this.service.create(body);
  }

  @Delete()
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }

  @Patch()
  async update(@Param('id') id: number, @Body() body: UserCreateData): Promise<User> {
    this.service.update(id, body);
    return this.service.findOne(id, null);
  }
}
