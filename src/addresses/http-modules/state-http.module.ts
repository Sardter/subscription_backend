import { Module } from '@nestjs/common';
import { StateController } from '../controllers/state.controller';
import { StatesService } from '../servises/state.service';

@Module({
  providers: [StatesService],
  controllers: [StateController],
})
export class UserHttpModule {}
