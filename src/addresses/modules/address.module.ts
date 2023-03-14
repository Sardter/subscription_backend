import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  exports: [TypeOrmModule],
})

export class AddressModule {}