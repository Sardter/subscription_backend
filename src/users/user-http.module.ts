import { Module } from '@nestjs/common';
import { UsersModule } from './user.module';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  imports: [UsersModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UserHttpModule {}
