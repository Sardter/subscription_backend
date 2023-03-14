import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from '../entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  exports: [TypeOrmModule],
})

export class StateModule {}