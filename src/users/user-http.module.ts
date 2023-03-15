import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UserHttpModule {}
