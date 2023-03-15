import { Module } from '@nestjs/common';
import { AddressController } from '../controllers/address.controller';
import { AddressesService } from '../servises/address.service';

@Module({
  providers: [AddressesService],
  controllers: [AddressController]
})
export class UserHttpModule {}