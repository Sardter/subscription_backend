import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddressController } from '../controllers/address.controller';
import { AddressesService } from '../servises/address.service';

@Module({
  providers: [AddressesService, PrismaService],
  controllers: [AddressController],
  exports: [AddressesService],
})
export class AddressModule {}
