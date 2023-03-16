import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StateController } from '../controllers/state.controller';
import { StatesService } from '../servises/state.service';

@Module({
  providers: [StatesService, PrismaService],
  controllers: [StateController],
  exports: [StatesService],
})
export class StateModule {}
